import { getDownloadURL, ref } from 'firebase/storage';
import { autoFetch } from '.';
import notFoundImage from '@/assets/images/notFoundImg.jpg';
import { storage } from '../configuration';

const getProductCardVmsByCategoryId = async (
  categoryId: string | undefined,
  field: string,
  dir: string,
  brandId: string,
) => {
  const response = await autoFetch.get(`product/${categoryId}`, {
    params: {
      field,
      dir,
      brandId,
    },
  });
  return response.data;
};

const getProductDetailVm = async (id: string | undefined) => {
  return (await autoFetch.get(`product/product-detail/${id}`)).data;
};

const getProductGalleryVmByProductId = async (id: string | undefined) => {
  const response = await autoFetch.get(`product-gallery/${id}`);
  return response.data;
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
  return response.data;
};

export {
  getProductCardVmsByCategoryId,
  getCategoryVms,
  getImageFromFireBase,
  getProductDetailVm,
  getProductGalleryVmByProductId,
  getBrandsByCategoryId,
};
