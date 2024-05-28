import { getDownloadURL, ref } from 'firebase/storage';
import notFoundImage from '@/assets/images/notFoundImg.jpg';
import { storage } from '../configuration';
import {
  BrandVm,
  CART,
  CART_DETAIL,
  CartDetail,
  ORDER,
  ProductCardInterface,
  ProductGalleryVm,
  VN_PAY,
} from '@/shared';
import { autoFetch } from '.';
import { RatingPayload } from '@/components/product/RatingProduct';

const getProductCardVmsByCategoryId = async (
  categoryId: string | undefined,
  field: string,
  dir: string,
  brandId: string,
  page: string,
  size: string,
) => {
  const response = await autoFetch.get(`product/${categoryId}`, {
    params: {
      field,
      dir,
      brandId,
      page,
      size,
    },
  });
  const content = await Promise.all(
    response.data.content.map(async (product: ProductCardInterface) => {
      const thumbnail = await getImageFromFireBase(product.thumbnail);
      return {
        ...product,
        thumbnail,
      };
    }),
  );
  return { ...response.data, content };
};

const getProductDetailVm = async (id: number | undefined) => {
  return (await autoFetch.get(`product/product-detail/${id}`)).data;
};

const getProductGalleryVmByProductId = async (id: string | undefined) => {
  const response = await autoFetch.get(`product-gallery/${id}`);
  const data = await Promise.all(
    response.data.map(async (image: ProductGalleryVm) => {
      const imagePath = await getImageFromFireBase(image.imagePath);
      return {
        ...image,
        imagePath,
      };
    }),
  );
  return data;
};

const getCategoryVms = async () => {
  return (await autoFetch.get('category')).data;
};

const getImageFromFireBase = async (path: string) => {
  try {
    const imageUrl = await getDownloadURL(ref(storage, path));
    return imageUrl;
  } catch (error) {
    return notFoundImage;
  }
};

const getBrandsByCategoryId = async (categoryId: string | undefined) => {
  const response = await autoFetch.get(`brand/category-id/${categoryId}`);
  const content = await Promise.all(
    response.data.map(async (brand: BrandVm) => {
      const imagePath = await getImageFromFireBase(brand.imagePath);
      return {
        ...brand,
        imagePath,
      };
    }),
  );
  return content;
};

const checkPaymentAndUpdateOrder = async ({
  vnPayParams,
  id,
}: {
  vnPayParams: any;
  id: string;
}) => {
  const response = await autoFetch.post(`vnPay/${id}`, null, {
    params: {
      ...vnPayParams,
    },
  });
  return response;
};

const getCartDetail = async ({ email }: { email: string }) => {
  const cart = await autoFetch(`cart/${email}`);
  const response = (await autoFetch(`cart-detail/${cart.data.id}`)).data;

  const newData = await Promise.all(
    [...response].map(async (item: CartDetail) => {
      const productDetail = await autoFetch.get(`product/product-detail/${item.productId}`);
      return { ...productDetail.data, amount: item.amount, cartId: item.id };
    }),
  );
  return newData;
};

const getProductGalleryInCart = async ({ productId }: { productId: number }) => {
  const response = await autoFetch(`product-gallery/${productId}/cartDetail`);
  const imagePath = await getImageFromFireBase(response.data.imagePath);
  return { ...response.data, imagePath };
};

const getCartByUserEmail = async (email: string) => {
  const response = await autoFetch(`cart/${email}`);
  return response.data;
};

const getRatingFromUser = async (productId: number) => {
  const response = await autoFetch(`rating/store-front/${productId}`);
  return response.data;
};

const getRatingAverage = async (productId: number) => {
  const response = await autoFetch(`rating/average/${productId}`);
  return response.data;
};

const createRatingAndComment = async (payload: RatingPayload) => {
  const response = await autoFetch.post(`rating`, payload);
  return response.data;
};

const checkout = async (data: any) => {
  const response = await autoFetch.post(ORDER, data);
  const orderId = response.data;
  const vnPay = await autoFetch.get(VN_PAY, {
    params: { orderId },
  });
  return vnPay.data;
};

const addToCart = async ({ productId, amount }: { productId: number; amount: number }) => {
  const payload = { productId, amount };
  const response = await autoFetch.post(CART, payload);
  return response.data;
};

const deleteCartDetailById = async (cartDetailId: number) => {
  const response = await autoFetch.delete(`${CART_DETAIL}/${cartDetailId}`);
  return response.data;
};

const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await autoFetch.post(`user/login`, { email, password });
  return response.data;
};

const register = async ({ email, password }: { email: string; password: string }) => {
  const response = await autoFetch.post(`user/register`, { email, password });
  return response.data;
};

export {
  getProductCardVmsByCategoryId,
  getCategoryVms,
  getImageFromFireBase,
  getProductDetailVm,
  getProductGalleryVmByProductId,
  getBrandsByCategoryId,
  getCartDetail,
  checkPaymentAndUpdateOrder,
  getProductGalleryInCart,
  getCartByUserEmail,
  getRatingFromUser,
  getRatingAverage,
  // mutation
  addToCart,
  checkout,
  deleteCartDetailById,
  login,
  register,
  createRatingAndComment,
};
