import { getDownloadURL, ref } from "firebase/storage";
import notFoundImage from "@/assets/images/notFoundImg.jpg";
import { storage } from "../configuration";
import { BrandVm, ProductCardInterface, ProductGalleryVm } from "@/shared";
import { autoFetch } from ".";
const getProductCardVmsByCategoryId = async (
  categoryId: string | undefined,
  field: string,
  dir: string,
  brandId: string
) => {
  const response = await autoFetch.get(`product/${categoryId}`, {
    params: {
      field,
      dir,
      brandId,
    },
  });
  const content = await Promise.all(
    response.data.content.map(async (product: ProductCardInterface) => {
      const thumbnail = await getImageFromFireBase(product.thumbnail);
      return {
        ...product,
        thumbnail,
      };
    })
  );
  return { ...response.data, content };
};

const getProductDetailVm = async (id: string | undefined) => {
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
    })
  );
  return data;
};

const getCategoryVms = async () => {
  return (await autoFetch.get("category")).data;
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
    })
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

const getCartDetail = async ({ cartId }: { cartId: number }) => {
  const response = await autoFetch(`cart-detail/1`);
  return response.data;
};

const getProductGalleryInCart = async ({
  productId,
}: {
  productId: number;
}) => {
  const response = await autoFetch(`product-gallery/${productId}/cartDetail`);
  const imagePath = await getImageFromFireBase(response.data.imagePath);
  return { ...response.data, imagePath };
};

// mutation
const addToCart = async ({
  cartId,
  id,
  amount,
}: {
  cartId: number;
  id: number;
  amount: number;
}) => {
  const payload = { id, amount };
  const response = await autoFetch.post(`cart-detail/${cartId}`, payload);
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
  addToCart,
};
