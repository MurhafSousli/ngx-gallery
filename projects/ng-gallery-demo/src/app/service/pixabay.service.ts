import { Injectable } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';

import { GalleryItemData } from 'ng-gallery';

import { Hit2, PixabayHDModel } from './pixabay.model';

@Injectable({
  providedIn: 'root'
})
export class Pixabay {

  private readonly API_KEY: string = '560162-704dd2880c027f22c62ab7941';

  constructor(private _http: HttpClient) {
  }

  getImages(key: string, count = 18): HttpResourceRef<GalleryItemData[]> {
    return httpResource<GalleryItemData[]>(() => {
      const url: string = `https://pixabay.com/api/?key=${ this.API_KEY }&q=${ encodeURIComponent(key) }&response_group=high_resolution&editors_choice=true&per_page=${ count }&image_type=photo`;
      return { url }
    }, {
      parse: (res: PixabayHDModel) => {
        return res.hits.map((item: Hit2, i: number) => {
          return {
            src: item.largeImageURL,
            thumb: item.webformatURL,
            preview: item.previewURL,
            alt: `photo-${ i }`,
            caption: item.user
          };
        });
      }
    })
  }

  getHDImages(key: string): Observable<GalleryItemData[]> {
    const URL = `https://pixabay.com/api/?key=${ this.API_KEY }&q=${ encodeURIComponent(key) }&response_group=high_resolution&editors_choice=true&per_page=18&image_type=photo`;
    return this._http.get(URL).pipe(
      map((res: PixabayHDModel) => {
        return res.hits.map((item: Hit2, i: number) => {
          return {
            src: item.largeImageURL,
            thumb: item.webformatURL,
            alt: `photo-${ i }`
          };
        });
      }),
      shareReplay(1)
    );
  }
}
