import { http, HttpResponse, bypass, delay } from 'msw';
import { PixabayHDModel } from './pixabay.model';

const STORAGE_PREFIX = 'msw-pixabay-cache-v21'; // Versioning prefix
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours (URLs usually expire in 24h)
const memoryCache = new Map<string, { data: PixabayHDModel; expiresAt: number }>();

interface CachedPayload {
  data: PixabayHDModel;
  expiresAt: number;
}

function getCacheKey(q: string): string {
  return `${STORAGE_PREFIX}:${q}`;
}

function readCache(q: string): PixabayHDModel | null {
  try {
    const raw = localStorage.getItem(getCacheKey(q));
    if (!raw) return null;

    const { data, expiresAt }: CachedPayload = JSON.parse(raw);

    // Check if current time has passed the expiration timestamp
    if (Date.now() > expiresAt) {
      localStorage.removeItem(getCacheKey(q));
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function writeCache(q: string, data: PixabayHDModel): void {
  try {
    const expiresAt = Date.now() + CACHE_TTL_MS;
    const payload: CachedPayload = { data, expiresAt };

    // Update Memory
    memoryCache.set(q, payload);
    // Update Disk
    localStorage.setItem(getCacheKey(q), JSON.stringify(payload));
  } catch {
    // ignore quota errors
  }
}

export const pixabayHandler = http.get(
  'https://pixabay.com/api/',
  async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') ?? 'default';

    // 1) Memory cache check
    const memEntry = memoryCache.get(q);
    if (memEntry && Date.now() < memEntry.expiresAt) {
      console.log(`%c 🧠 [MSW Memory] Fresh hit: ${q}`, 'color: #a855f7; font-weight: bold;');
      return HttpResponse.json(memEntry.data);
    }

    // 2) LocalStorage cache check (with TTL logic inside readCache)
    const cachedData = readCache(q);
    if (cachedData) {
      console.log(`%c 💾 [MSW Disk] Fresh hit: ${q}`, 'color: #3b82f6; font-weight: bold;');
      // Sync back to memory for speed
      memoryCache.set(q, { data: cachedData, expiresAt: Date.now() + CACHE_TTL_MS });
      return HttpResponse.json(cachedData);
    }

    // 3) Real API call using bypass
    try {
      console.log(`%c 🌐 [MSW Network] Fetching fresh: ${q}`, 'color: #f59e0b; font-weight: bold;');

      const response = await fetch(bypass(request));
      if (!response.ok) throw new Error('Pixabay API Error');

      const data: PixabayHDModel = await response.json();
      writeCache(q, data);

      return HttpResponse.json(data);
    } catch (error) {
      console.error(`%c ❌ [MSW Error] API failed, using fallback: ${q}`, 'color: #ef4444;', error);

      await delay(500);
      return HttpResponse.json({
        hits: Array.from({ length: 18 }).map((_, i) => ({
          largeImageURL: `https://picsum.photos/1200/800?random=${i}`,
          webformatURL: `https://picsum.photos/400/300?random=${i}`,
          previewURL: `https://picsum.photos/100/75?random=${i}`,
        })),
      });
    }
  }
);
