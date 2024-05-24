import {
  useGetProductDetail,
  useGetProductGalleryVmByProductId,
} from "@/services";
import { renderHtmlDescription } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { CircularLoading } from "../loading";
import { BoxWrapper } from "../common";
import { useState } from "react";
import { useClear } from "@/hook";
import { CarouselCustom, IconComponent } from "../partial";
import { ProductGalleryVm } from "@/shared";
import { ProductPrice } from "./ProductPrice";

const styles = {
  title: {
    fontSize: "1.125rem",
    fontWeight: 700,
    margin: "0 10px 0 0",
    color: "#0a263c",
  },
  divider: {
    margin: "10px 0 15px",
    backgroundColor: "#f5f5f5",
    height: "2px",
    border: "none",
  },
  descriptionBox: {
    position: "relative",
  },
  descriptionContent: {
    padding: 2,
  },
  seeMoreButton: {
    position: "absolute",
    bottom: -40,
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  specsBox: {
    padding: 1.5,
  },
  specsTitle: {
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    marginTop: "1rem",
    gap: 2,
  },
  imageContainer: {
    height: "20rem",
    display: "flex",
    justifyContent: "center",
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const { isLoading: loadingProduct, data: productDetail } =
    useGetProductDetail(id);
  const { isLoading: loadingImage, data: imageUrlList } =
    useGetProductGalleryVmByProductId(id);
  const [overflow, setOverFlow] = useState(true);
  const handleOverFlow = () => setOverFlow(!overflow);
  useClear(() => {
    setOverFlow(false);
  });

  if (loadingProduct && loadingImage) return <CircularLoading />;
  if (productDetail && imageUrlList) {
    return (
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography sx={styles.title}>{productDetail.productName}</Typography>
          <Rating />
        </Box>
        <hr style={productDetail.divider} />
        <Box sx={styles.gridContainer}>
          <CarouselForProductDetail imageUrlList={imageUrlList} />
          <ProductPrice price={productDetail.price} id={productDetail.id} />
          <Box sx={styles.descriptionBox}>
            <BoxWrapper>
              <Box sx={styles.specsBox}>
                <Typography
                  component={"h2"}
                  color={"danger"}
                  textAlign={"center"}
                >
                  ĐẶC ĐIỂM NỔI BẬT
                </Typography>
                <Box
                  sx={{
                    height: overflow ? 100 : "100%",
                    overflow: overflow ? "hidden" : "unset",
                  }}
                  dangerouslySetInnerHTML={renderHtmlDescription(
                    productDetail.description
                  )}
                />
              </Box>
            </BoxWrapper>
            <Button
              onClick={handleOverFlow}
              sx={styles.seeMoreButton}
              color="primary"
            >
              Xem Thêm
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
};
export default ProductDetail;

const Rating = () => {
  return (
    <Box>
      <IconComponent iconName={"faStar"} style={{ color: "orange" }} />
      <IconComponent iconName={"faStar"} style={{ color: "orange" }} />
      <IconComponent iconName={"faStar"} style={{ color: "orange" }} />
      <IconComponent iconName={"faStar"} style={{ color: "orange" }} />
      <IconComponent iconName={"faStar"} style={{ color: "orange" }} />
    </Box>
  );
};

const CarouselForProductDetail = ({
  imageUrlList,
}: {
  imageUrlList: ProductGalleryVm[];
}) => {
  return (
    <CarouselCustom>
      {imageUrlList.map((item: ProductGalleryVm) => (
        <Box key={item.id} sx={styles.imageContainer}>
          <img src={item.imagePath} />
        </Box>
      ))}
    </CarouselCustom>
  );
};
