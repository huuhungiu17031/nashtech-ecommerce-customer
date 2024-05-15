export interface ProductCardInterface {
  id: number;
  productName: string;
  productWeight: number;
  price: number;
  thumbnail: string | '';
}

export interface ProductGalleryVm {
  id: number;
  imagePath: string;
  thumbnail: boolean;
}
