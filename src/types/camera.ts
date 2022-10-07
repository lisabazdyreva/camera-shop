export type Camera = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  category: string,
  description: string,
  level: string,
  rating: number,
  price: number,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string,
  reviewCount: number,
};

export type CameraFeatures = {
  vendorCode: string,
  category: string,
  type: string,
  level: string,
};

export type Cameras = Camera[];
