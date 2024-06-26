import { Box, Typography } from "@mui/material";
import { DynamicLink, IconComponent } from "../partial";
import { formatPrice } from "@/utils";
import { ProductCardInterface } from "@/shared";

const styles = {
  productCardWrapper: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    textAlign: "start",
    padding: "10px",
    boxShadow:
      "0 1px 2px 0 rgba(60, 64, 67, 0.1), 0 2px 6px 2px rgba(60, 64, 67, 0.15)",
  },
  imageBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
    minHeight: "",
  },
  productImage: {
    paddingTop: "0.625rem",
    width: "100%",
    height: "10rem",
  },
  productTitleBox: {
    position: "relative",
    zIndex: 10,
    height: "4rem",
    overflow: "hidden",
  },
  productTitle: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#444",
  },
  priceBox: {
    alignItems: "flex-end",
    color: "#444",
    display: "flex",
    fontFamily: 700,
    lineHeight: 1.4,
    marginBottom: "5px",
    marginTop: 2,
  },
  priceText: {
    color: "#d70018",
    display: "inline-block",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: 1.1,
  },
};

const ProductCard = ({ data }: { data: ProductCardInterface }) => {
  const { productName, price, id, thumbnail, isFeatured } = data;
  return (
    <DynamicLink to={`/product/${id}`} style={{ width: "100%" }}>
      <Box sx={styles.productCardWrapper}>
        <Box sx={{ position: "absolute" }}>
          {isFeatured && (
            <IconComponent
              iconName={"faFire"}
              style={{ color: "red", fontSize: 20, marginRight: 3 }}
            />
          )}
        </Box>
        <Box sx={styles.imageBox}>
          <Box
            component="img"
            src={thumbnail}
            alt="Product Thumbnail"
            sx={styles.productImage}
          />
        </Box>
        <Box sx={styles.productTitleBox}>
          <Typography component="h3" sx={styles.productTitle}>
            {productName}
          </Typography>
        </Box>
        <Box sx={styles.priceBox}>
          <Typography sx={styles.priceText}>
            {formatPrice({ price })}
          </Typography>
        </Box>
      </Box>
    </DynamicLink>
  );
};

export default ProductCard;
