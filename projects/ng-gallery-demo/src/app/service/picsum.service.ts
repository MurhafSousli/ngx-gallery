import { Injectable } from '@angular/core';
import { HttpResourceRef, httpResource } from '@angular/common/http';
import { GalleryItemData } from 'ng-gallery';

export type PicsumImageMode = 'original' | 'fixed';

interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
}

const LIST_PAGE_COUNT = 10;

@Injectable({
  providedIn: 'root'
})
export class Picsum {

  getImages(
    seed: string,
    count = 18,
    mode: PicsumImageMode = 'original'
  ): HttpResourceRef<GalleryItemData[]> {
    const page = getListPage(seed);
    const fixedImages = mode === 'fixed'
      ? Array.from({ length: count }, (_, index) => {
          const imageSeed = `${seed}-${index + 1}`;

          return {
            src: `https://picsum.photos/seed/${imageSeed}/1200/900`,
            thumb: `https://picsum.photos/seed/${imageSeed}/480/320`,
            alt: `Photo ${index + 1}`
          };
        })
      : [];

    return httpResource<GalleryItemData[]>(() => mode === 'fixed'
      ? undefined
      : { url: `https://picsum.photos/v2/list?page=${page}&limit=${count}` }, {
      defaultValue: fixedImages,
      parse: (photos: PicsumPhoto[]) => photos.map((photo, index) => {
        const thumbWidth = 480;

        return {
          src: `https://picsum.photos/id/${photo.id}/1200/${getHeight(photo, 1200)}`,
          thumb: `https://picsum.photos/id/${photo.id}/${thumbWidth}/${getHeight(photo, thumbWidth)}`,
          alt: `${photo.author} photo ${index + 1}`
        };
      })
    });
  }
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
