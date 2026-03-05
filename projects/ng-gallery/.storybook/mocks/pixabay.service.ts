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


export function getSlides(): Promise<GalleryItemData[]> {
  const count = 18;
  const colors: string[] = [];

  // Use a golden ratio offset to ensure colors are visually distinct
  const goldenRatioConjugate = 0.618033988749895;
  let hue = Math.random();

  for (let i = 0; i < count; i++) {
    hue += goldenRatioConjugate;
    hue %= 1;

    const h = Math.floor(hue * 360);
    const s = 50 + Math.random() * 10; // Soft saturation
    const l = 80 + Math.random() * 5;  // High lightness for pastel feel

    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }

  // Shuffle the array to ensure random order on every call
  const shuffled = colors
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => ({ src: value }));

  return Promise.resolve(shuffled);
}

// export function getHDImagesForCustomTemplate(key: string): Promise<GalleryItem[]> {
//   const url: string = `https://pixabay.com/api/?key=${ API_KEY }&q=${ encodeURIComponent(key) }&response_group=high_resolution&editors_choice=true&per_page=18&image_type=photo`;
//
//   return fetch(url).then((r: Response) => r.json()).then((data: PixabayHDModel) => {
//     return data.hits.map((item: Hit2, i: number) => {
//       return {
//         type: 'custom',
//         data: {
//           src: item.largeImageURL,
//           thumb: item.previewURL, alt: `photo-${ i }`
//         }
//       }
//     });
//   })
// }
