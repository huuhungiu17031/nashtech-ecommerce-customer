export * from './route.name';
export * from './constants';
export * from './api-prefix';
export interface BrandVm {
  id: number;
  name: string;
  imagePath: string | '';
}

export interface ProductCardInterface {
  id: number;
  productName: string;
  price: number;
  thumbnail: string | '';
}

export interface ProductGalleryVm {
  id: number;
  imagePath: string;
  thumbnail: boolean;
}

export interface CategoryInterface {
  id: number;
  categoryName: string;
  icon: string;
  categoryDescription: string;
}

export interface VnPayInterface {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
  vnp_BankTranNo?: string; // Optional parameter with default value
}

export interface CartDetail {
  amount: number;
  id: number;
  productId: number;
}

export interface CheckOutData {
  paymentMethod: string;
  orderDetailVms: OrderDetailVm[];
}

export interface OrderDetailVm {
  productId: number;
  amount: number;
}

export interface Product {
  id: number;
  productName: string;
  price: number;
  description: string;
  amount: number;
  cartId: number;
}
