interface GalleryItemModel {
  src?: string;
  thumb?: string;
  alt?: string;
}

export type GalleryItemData<T = unknown> = GalleryItemModel & T;
