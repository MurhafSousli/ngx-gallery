import { GalleryItemData } from 'ng-gallery';
import { Hit2, PixabayHDModel } from './pixabay.model';

const API_KEY: string = '560162-704dd2880c027f22c62ab7941';

export function getHDImages(key: string): Promise<GalleryItemData[]> {
  const url: string = `https://pixabay.com/api/?key=${ API_KEY }&q=${ encodeURIComponent(key) }&response_group=high_resolution&editors_choice=true&per_page=18&image_type=photo`;

  return fetch(url).then((r: Response) => r.json()).then((data: PixabayHDModel) => {
    return data.hits.map((item: Hit2, i: number) => {
      return {
        src: item.largeImageURL,
        thumb: item.webformatURL,
        placeholder: item.previewURL,
        alt: `photo-${ i }`
      };
    });
  })
}
