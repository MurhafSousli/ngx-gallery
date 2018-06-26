import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { ImageItem, GalleryItem } from '@ngx-gallery/core';

import { ImageProItem } from '../extra-templates/extra-templates';
import { Hit, Hit2, PixabayHDModel, PixabayModel } from './pixabay.model';

@Injectable()
export class Pixabay {

  private readonly API_KEY = '560162-704dd2880c027f22c62ab7941';

  constructor(private _http: HttpClient) {
  }

  getImages(key: string, pro?: boolean): Observable<GalleryItem[]> {
    const URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${encodeURIComponent(key)}&editors_choice=true&per_page=18`;
    return this._http.get(URL).pipe(
      map((res: PixabayModel) => {
        return res.hits.map((item: Hit) => {
          const src = item.webformatURL.replace('640', '960');
          const thumb = item.previewURL;
          if (pro) {
            const extraData = {
              favorites: item.favorites,
              likes: item.likes,
              views: item.views,
              username: item.user,
              userImage: item.userImageURL
            };
            return new ImageProItem(src, thumb, extraData);
          }
          return new ImageItem(src, thumb);
        });
      }),
      publishReplay(1),
      refCount()
    );
  }

  getHDImages(key: string): Observable<GalleryItem[]> {
    const URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${encodeURIComponent(key)}&response_group=high_resolution&editors_choice=true&per_page=18`;
    return this._http.get(URL).pipe(
      map((res: PixabayHDModel) => {
        return res.hits.map((item: Hit2) => new ImageItem(item.largeImageURL, item.previewURL));
      }),
      publishReplay(1),
      refCount()
    );
  }
}
