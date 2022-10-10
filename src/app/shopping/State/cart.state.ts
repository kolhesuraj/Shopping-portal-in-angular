export const initialstate:cart = {
  products:[],
};

export interface cart{
    products: cartInterface[],
}

export interface cartInterface {
      images: [{}];
      name: string;
      price: number;
      productId: string;
      qty: number;
      subTotal: number;
};
