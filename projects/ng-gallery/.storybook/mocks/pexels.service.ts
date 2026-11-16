import type { Photo, PhotosWithTotalResults } from 'pexels';
import { GalleryItemData } from 'ng-gallery';

const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY';

export function getPexelsImages(query: string = 'nature'): Promise<GalleryItemData[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=18`;

  return fetch(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  })
    .then((r: Response) => {
      if (!r.ok) throw new Error(`Pexels API HTTP ${r.status}`);
      return r.json() as Promise<PhotosWithTotalResults>;
    })
    .then((data: PhotosWithTotalResults) => {
      return data.photos.map((item: Photo, i: number) => ({
        src: item.src.large2x,
        thumb: item.src.medium,
        placeholder: item.src.tiny,
        alt: item.alt || `pexels-photo-${i}`,
      }));
    });
}
