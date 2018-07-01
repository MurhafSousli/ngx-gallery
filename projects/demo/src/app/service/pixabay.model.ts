export interface PixabayModel {
  total: number;
  totalHits: number;
  hits: Hit[];
}

export interface Hit {
  id: number;
  pageURL: string;
  type: string;
  tags: string[];
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  favorites: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
export interface PixabayHDModel {
  total: number;
  totalHits: number;
  hits: Hit2[];
}

export interface Hit2 {
  id_hash: string;
  type: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  imageURL: string;
  user_id: number;
  user: string;
  userImageURL: string;
}
