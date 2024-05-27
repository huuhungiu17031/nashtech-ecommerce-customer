import { useQuery } from '@tanstack/react-query';
import {
  getBrandsByCategoryId,
  getCartByUserEmail,
  getCartDetail,
  getCategoryVms,
  getProductCardVmsByCategoryId,
  getProductDetailVm,
  getProductGalleryInCart,
  getProductGalleryVmByProductId,
  getRatingFromUser,
} from './api';

export function useGetCategoryVms() {
  return useQuery({
    queryKey: ['getCategoryVms'],
    queryFn: getCategoryVms,
  });
}

export function useGetProductDetail(productId: number | undefined) {
  return useQuery({
    queryKey: ['getProductDetail', productId],
    queryFn: () => getProductDetailVm(productId),
    enabled: !!productId,
  });
}

export function useGetProductGalleryVmByProductId(productId: string | undefined) {
  return useQuery({
    queryKey: ['getProductGalleryVm'],
    queryFn: () => getProductGalleryVmByProductId(productId),
  });
}

export function useGetProductCardVmsByCategoryId(
  categoryId: string | undefined,
  field: string,
  dir: string,
  brandId: string,
  page: string,
  size: string,
) {
  return useQuery({
    queryKey: ['getProductCardVms', { field, dir, brandId, page, size }],
    queryFn: () => getProductCardVmsByCategoryId(categoryId, field, dir, brandId, page, size),
  });
}

export function useGetBrandsByCategoryId(categoryId: string | undefined) {
  return useQuery({
    queryKey: ['getBrandsByCategoryId'],
    queryFn: () => getBrandsByCategoryId(categoryId),
  });
}

export function useGetCartDetailByCartId(email: string) {
  return useQuery({
    queryKey: ['useGetCartDetailByCartId', email],
    queryFn: () => getCartDetail({ email }),
    enabled: !!email,
  });
}

export function useGetCartByUserEmail(email: string) {
  return useQuery({
    queryKey: ['useGetCartByUserEmail', email],
    queryFn: () => getCartByUserEmail(email),
  });
}

export function useGetProductGalleryInCart(productId: number) {
  return useQuery({
    queryKey: ['getProductGalleryInCart', productId],
    queryFn: () => getProductGalleryInCart({ productId }),
    enabled: !!productId,
  });
}

export function useGetRatingFromUser(productId: number) {
  return useQuery({
    queryKey: ['useGetRatingFromUser', productId],
    queryFn: () => getRatingFromUser(productId),
    enabled: !!productId,
  });
}
