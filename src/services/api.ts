import { getDownloadURL, ref } from "firebase/storage";
import { autoFetch } from ".";
import notFoundImage from "@/assets/images/notFoundImg.jpg";
import { storage } from "../configuration";
import { BrandVm, ProductCardInterface } from "@/shared";

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
  return response.data;
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

export {
  getProductCardVmsByCategoryId,
  getCategoryVms,
  getImageFromFireBase,
  getProductDetailVm,
  getProductGalleryVmByProductId,
  getBrandsByCategoryId,
};
