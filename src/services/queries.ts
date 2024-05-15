import { useQuery } from '@tanstack/react-query';
import {
  getBrandsByCategoryId,
  getCategoryVms,
  getProductCardVmsByCategoryId,
  getProductDetailVm,
  getProductGalleryVmByProductId,
} from './api';

export function useGetCategoryVms() {
  return useQuery({
    queryKey: ['getCategoryVms'],
    queryFn: getCategoryVms,
  });
}

export function useGetProductDetail(productId: string | undefined) {
  return useQuery({
    queryKey: ['getProductDetail'],
    queryFn: () => getProductDetailVm(productId),
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
) {
  console.log('useGetProductCardVmsByCategoryId');
  return useQuery({
    queryKey: ['getProductCardVms', { field, dir, brandId }],
    queryFn: () => getProductCardVmsByCategoryId(categoryId, field, dir, brandId),
  });
}

export function useGetBrandsByCategoryId(categoryId: string | undefined) {
  return useQuery({
    queryKey: ['getBrandsByCategoryId'],
    queryFn: () => getBrandsByCategoryId(categoryId),
  });
}
