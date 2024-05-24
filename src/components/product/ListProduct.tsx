import ProductCard from "./ProductCard";
import styles from "@/globalStyle/styles/list-product.module.scss";
import classNames from "classnames/bind";
import { Box, TablePagination } from "@mui/material";
import { ProductCardInterface } from "@/shared";
import { useGetProductCardVmsByCategoryId } from "@/services";
import { CircularLoading } from "../loading";
const cx = classNames.bind(styles);

const ListProduct = ({
  id,
  paramsObject,
  setSearchParams,
}: {
  id: string | undefined;
  paramsObject: any;
  setSearchParams: any;
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // setSearchParams({ ...paramsObject, page: newPage.toString() });
    // setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  const { isLoading, data } = useGetProductCardVmsByCategoryId(
    id,
    paramsObject.order || "",
    paramsObject.dir || "",
    paramsObject.brandId || ""
    // paramsObject.page
  );
  if (isLoading) return <CircularLoading />;
  const { content, totalElements, size, currentPage } = data;
  return (
    <>
      <Box className={cx("product-card-wrapper")}>
        {content.map((product: ProductCardInterface) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </Box>
      <TablePagination
        component="div"
        count={totalElements}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={size}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListProduct;
