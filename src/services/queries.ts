import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getBrandsByCategoryId,
  getCartDetail,
  getCategoryVms,
  getProductCardVmsByCategoryId,
  getProductDetailVm,
  getProductGalleryInCart,
  getProductGalleryVmByProductId,
} from "./api";

export function useGetCategoryVms() {
  return useQuery({
    queryKey: ["getCategoryVms"],
    queryFn: getCategoryVms,
  });
}

export function useGetProductDetail(productId: string | undefined) {
  return useQuery({
    queryKey: ["getProductDetail", productId],
    queryFn: () => getProductDetailVm(productId),
  });
}

export function useGetProductGalleryVmByProductId(
  productId: string | undefined
) {
  return useQuery({
    queryKey: ["getProductGalleryVm"],
    queryFn: () => getProductGalleryVmByProductId(productId),
  });
}

export function useGetProductCardVmsByCategoryId(
  categoryId: string | undefined,
  field: string,
  dir: string,
  brandId: string
) {
  return useQuery({
    queryKey: ["getProductCardVms", { field, dir, brandId }],
    queryFn: () =>
      getProductCardVmsByCategoryId(categoryId, field, dir, brandId),
  });
}

export function useGetBrandsByCategoryId(categoryId: string | undefined) {
  return useQuery({
    queryKey: ["getBrandsByCategoryId"],
    queryFn: () => getBrandsByCategoryId(categoryId),
  });
}

export function useGetCartDetailByCartId(cartId = 1) {
  return useQuery({
    queryKey: ["getCartDetail", cartId],
    queryFn: () => getCartDetail({ cartId }),
  });
}

export function useGetProductGalleryInCart(productId: number) {
  return useQuery({
    queryKey: ["getProductGalleryInCart", productId],
    queryFn: () => getProductGalleryInCart({ productId }),
    enabled: !!productId,
  });
}
