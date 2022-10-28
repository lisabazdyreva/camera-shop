export type Order = Coupon & {
  camerasIds: number[];
};

export type Coupon = {
  coupon: null | string;
};
