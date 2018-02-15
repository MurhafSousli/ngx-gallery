import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Gallery, ImageItemComponent, ThumbnailItemComponent } from '@ngx-gallery/core';
import { Gallery, ImageItemComponent, ThumbnailItemComponent } from '../gallery/core';
import { ImageItemProComponent } from '../extra-templates/image-item-pro.component';
import { ThumbnailItemProComponent } from '../extra-templates/thumb-item-pro.component';

import { Hit, Hit2, PixabayHDModel, PixabayModel } from './pixabay.model';

import { map } from 'rxjs/operators/map';
import { publishReplay } from 'rxjs/operators/publishReplay';
import { refCount } from 'rxjs/operators/refCount';

@Injectable()
export class SharedService {

  private readonly API_KEY = '560162-704dd2880c027f22c62ab7941';

  constructor(private gallery: Gallery, private http: HttpClient) {
  }

  getImages(key: string, pro?: boolean) {
    const URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${encodeURIComponent(key)}&editors_choice=true&per_page=18`;
    return this.http.get(URL).pipe(
      map((res: PixabayModel) => {
        return res.hits.map((item: Hit) => {
          return {
            component: pro ? ImageItemProComponent : ImageItemComponent,
            thumbComponent: pro ? ThumbnailItemProComponent : ThumbnailItemComponent,
            data: {
              favorites: item.favorites,
              likes: item.likes,
              views: item.views,
              username: item.user,
              userImage: item.userImageURL,
              src: item.webformatURL.replace('640', '960'),
              thumbSrc: item.previewURL
            }
          };
        });
      }),
      publishReplay(1),
      refCount()
    );
  }

  getHDImages(key: string) {
    const URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${encodeURIComponent(key)}&response_group=high_resolution&editors_choice=true&per_page=18`;
    return this.http.get(URL).pipe(
      map((res: PixabayHDModel) => {
        return res.hits.map((item: Hit2) => {
          return {
            component: ImageItemComponent,
            thumbComponent: ThumbnailItemComponent,
            data: {
              username: item.user,
              userImage: item.userImageURL,
              src: item.largeImageURL,
              thumbSrc: item.previewURL
            }
          };
        });
      }),
      publishReplay(1),
      refCount()
    );
  }
}
