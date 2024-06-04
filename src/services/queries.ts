import { useQuery } from "@tanstack/react-query";
import {
  getBrandsByCategoryId,
  getCartByUserEmail,
  getCartDetail,
  getCategoryVms,
  getProductCardVmsByCategoryId,
  getProductDetailVm,
  getProductGalleryInCart,
  getProductGalleryVmByProductId,
  getRatingAverage,
  getRatingFromUser,
} from "./api";
import { QUERY_KEYS } from "@/shared";

export function useGetCategoryVms() {
  return useQuery({
    queryKey: [QUERY_KEYS.getCategoryVms],
    queryFn: getCategoryVms,
  });
}

export function useGetProductDetail(productId: number | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProductDetail, productId],
    queryFn: () => getProductDetailVm(productId),
    enabled: !!productId,
  });
}

export function useGetProductGalleryVmByProductId(
  productId: string | undefined
) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProductGalleryVm, productId],
    queryFn: () => getProductGalleryVmByProductId(productId),
  });
}

export function useGetProductCardVmsByCategoryId(
  categoryId: string | undefined,
  field: string,
  dir: string,
  brandId: string,
  page: string,
  size: string
) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.getProductCardVms,
      { field, dir, brandId, page, size },
    ],
    queryFn: () =>
      getProductCardVmsByCategoryId(
        categoryId,
        field,
        dir,
        brandId,
        page,
        size
      ),
  });
}

export function useGetBrandsByCategoryId(categoryId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.getBrandsByCategoryId, categoryId],
    queryFn: () => getBrandsByCategoryId(categoryId),
  });
}

export function useGetCartDetailByCartId(email: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.useGetCartDetailByCartId, email],
    queryFn: () => getCartDetail({ email }),
    enabled: !!email,
  });
}

export function useGetCartByUserEmail(email: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.useGetCartByUserEmail, email],
    queryFn: () => getCartByUserEmail(email),
  });
}

export function useGetProductGalleryInCart(productId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProductGalleryInCart, productId],
    queryFn: () => getProductGalleryInCart({ productId }),
    enabled: !!productId,
  });
}

export function useGetRatingFromUser(productId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.useGetRatingFromUser, productId],
    queryFn: () => getRatingFromUser(productId),
    enabled: !!productId,
  });
}

export function useGetAverageRating(productId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.useGetAverageRating, productId],
    queryFn: () => getRatingAverage(productId),
    enabled: !!productId,
  });
}
