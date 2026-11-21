import { GalleryItemData } from 'ng-gallery';

export type PicsumImageMode = 'original' | 'fixed';

interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
}

const LIST_PAGE_COUNT = 10;

export async function getHDImages(
  seed: string,
  count = 18,
  mode: PicsumImageMode = 'original'
): Promise<GalleryItemData[]> {
  if (mode === 'fixed') {
    return Array.from({ length: count }, (_, index) => {
      const imageSeed = `${seed}-${index + 1}`;

      return {
        src: `https://picsum.photos/seed/${imageSeed}/1200/900`,
        thumb: `https://picsum.photos/seed/${imageSeed}/480/320`,
        placeholder: `https://picsum.photos/seed/${imageSeed}/40/30`,
        alt: `Photo ${index + 1}`
      };
    });
  }

  const page = getListPage(seed);
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
  if (!response.ok) {
    throw new Error(`Picsum API returned HTTP ${response.status}`);
  }

  const photos: PicsumPhoto[] = await response.json();
  return photos.map((photo, index) => {
    const thumbWidth = 480;
    const placeholderWidth = 40;

    return {
      src: `https://picsum.photos/id/${photo.id}/1200/${getHeight(photo, 1200)}`,
      thumb: `https://picsum.photos/id/${photo.id}/${thumbWidth}/${getHeight(photo, thumbWidth)}`,
      placeholder: `https://picsum.photos/id/${photo.id}/${placeholderWidth}/${getHeight(photo, placeholderWidth)}`,
      alt: `${photo.author} photo ${index + 1}`
    };
  });
}

function getHeight(photo: PicsumPhoto, width: number): number {
  return Math.max(1, Math.round(width * photo.height / photo.width));
}

function getListPage(seed: string): number {
  let hash = 0;
  for (const character of seed) {
    hash = (Math.imul(hash, 31) + character.charCodeAt(0)) | 0;
  }

  return Math.abs(hash % LIST_PAGE_COUNT) + 1;
}
