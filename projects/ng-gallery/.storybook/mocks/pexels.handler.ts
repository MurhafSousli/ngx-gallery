import { http, HttpResponse, bypass, delay } from 'msw';
import type { Photo, PhotosWithTotalResults } from 'pexels';

const STORAGE_PREFIX = 'msw-pexels-cache-v1';
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const memoryCache = new Map<string, { data: PhotosWithTotalResults; expiresAt: number }>();

interface CachedPayload {
  data: PhotosWithTotalResults;
  expiresAt: number;
}

function getCacheKey(query: string): string {
  return `${STORAGE_PREFIX}:${query}`;
}

function readCache(query: string): PhotosWithTotalResults | null {
  try {
    const raw = localStorage.getItem(getCacheKey(query));
    if (!raw) return null;

    const { data, expiresAt }: CachedPayload = JSON.parse(raw);

    if (Date.now() > expiresAt) {
      localStorage.removeItem(getCacheKey(query));
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function writeCache(query: string, data: PhotosWithTotalResults): void {
  try {
    const expiresAt = Date.now() + CACHE_TTL_MS;
    const payload: CachedPayload = { data, expiresAt };

    memoryCache.set(query, payload);
    localStorage.setItem(getCacheKey(query), JSON.stringify(payload));
  } catch {
    // Ignore quota errors
  }
}

export const pexelsHandler = http.get(
  'https://api.pexels.com/v1/search',
  async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') ?? 'default';

    // 1) Memory cache check
    const memEntry = memoryCache.get(query);
    if (memEntry && Date.now() < memEntry.expiresAt) {
      console.log(`%c 🧠 [MSW Memory - Pexels] Fresh hit: ${query}`, 'color: #a855f7; font-weight: bold;');
      return HttpResponse.json(memEntry.data);
    }

    // 2) LocalStorage cache check
    const cachedData = readCache(query);
    if (cachedData) {
      console.log(`%c 💾 [MSW Disk - Pexels] Fresh hit: ${query}`, 'color: #3b82f6; font-weight: bold;');
      memoryCache.set(query, { data: cachedData, expiresAt: Date.now() + CACHE_TTL_MS });
      return HttpResponse.json(cachedData);
    }

    // 3) Real API call using bypass
    try {
      console.log(`%c 🌐 [MSW Network - Pexels] Fetching fresh: ${query}`, 'color: #f59e0b; font-weight: bold;');

      const response = await fetch(bypass(request));
      if (!response.ok) throw new Error('Pexels API Error');

      const data = (await response.json()) as PhotosWithTotalResults;
      writeCache(query, data);

      return HttpResponse.json(data);
    } catch (error) {
      console.error(`%c ❌ [MSW Error - Pexels] API failed, using fallback: ${query}`, 'color: #ef4444;', error);

      await delay(500);

      const fallbackData: PhotosWithTotalResults = {
        page: 1,
        per_page: 18,
        total_results: 18,
        photos: Array.from({ length: 18 }).map((_, i): Photo => ({
          id: i,
          width: 1200,
          height: 800,
          url: '',
          photographer: 'Fallback',
          photographer_url: '',
          photographer_id: 0,
          avg_color: '#ccc',
          alt: `Fallback image ${i}`,
          src: {
            original: `https://picsum.photos/1200/800?random=${i}`,
            large2x: `https://picsum.photos/1200/800?random=${i}`,
            large: `https://picsum.photos/800/600?random=${i}`,
            medium: `https://picsum.photos/400/300?random=${i}`,
            small: `https://picsum.photos/200/150?random=${i}`,
            portrait: `https://picsum.photos/600/800?random=${i}`,
            landscape: `https://picsum.photos/800/600?random=${i}`,
            tiny: `https://picsum.photos/100/75?random=${i}`,
          },
        })),
      };

      return HttpResponse.json(fallbackData);
    }
  }
);
