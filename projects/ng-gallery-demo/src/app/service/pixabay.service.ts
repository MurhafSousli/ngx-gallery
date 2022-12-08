import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageItem, GalleryItem } from 'ng-gallery';

import { Hit2, PixabayHDModel } from './pixabay.model';

@Injectable({
  providedIn: 'root'
})
export class Pixabay {

  private readonly API_KEY = '560162-704dd2880c027f22c62ab7941';

  constructor(private _http: HttpClient) {
  }

  getHDImages(key: string): Observable<GalleryItem[]> {
    const URL = `https://pixabay.com/api/?key=${ this.API_KEY }&q=${ encodeURIComponent(key) }&response_group=high_resolution&editors_choice=true&per_page=18&image_type=photo`;
    return this._http.get(URL).pipe(
      map((res: PixabayHDModel) => {
        return res.hits.map((item: Hit2, i: number) => new ImageItem({ src: item.largeImageURL, thumb: item.previewURL, alt: `photo-${ i }` }));
      }),
      shareReplay(1)
    );
  }
}
