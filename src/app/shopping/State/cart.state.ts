export const initialstate:cart = {
  products: [],
  checkOut: [],
};

export interface cart{
  products: cartInterface[],
  checkOut: cartInterface[],
}

export interface cartInterface {
  images: [{ url: string; public_id: string }];
  name: string;
  price: number;
  productId: string;
  qty: number;
  subTotal: number;
};
