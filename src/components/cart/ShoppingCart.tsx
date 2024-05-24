import { Box, Button, Grid, Typography } from "@mui/material";
import { DynamicLink, IconComponent } from "../partial";
import images from "@/assets/images";
import {
  useGetCartDetailByCartId,
  useGetProductDetail,
  useGetProductGalleryInCart,
} from "@/services";
import { CircularLoading } from "../loading";
import { formatPrice } from "@/utils";
import { useAuthen } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
const styles = {
  shoppingCartWrapper: {
    color: "#323232",
    margin: "auto",
    maxWidth: "37.5rem",
    padding: "0.625rem",
  },
  buyNowButton: {
    textAlign: "center",
    width: "100%",
    backgroundColor: "red",
    borderRadius: 1,
    color: "white",
    display: "flex",
    flexDirection: "column",
  },
  buyNowText: {
    fontSize: "1rem",
  },
  blockInfo: {
    borderRadius: "10px",
    margin: "auto auto 20px",
    maxWidth: "600px",
    padding: 0,
  },
  nothingInCart: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    padding: "100px 0",
    textAlign: "center",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e5e5",
    paddingBottom: "0.5rem",
  },
  priceText: {
    color: "#d70018",
    display: "inline-block",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: 1.1,
    marginTop: "1rem",
  },
  cart: {
    backgroundColor: "white",
    padding: 1,
    borderRadius: 1,
    marginTop: 2,
    border: "1px solid rgb(229,232,234)",
  },
};

const ShoppingCart = () => {
  const { authenFetch }: any = useAuthen();
  const [payment, setPayment] = useState(null);

  const handleCheckOut = async (data: any) => {
    const response = await authenFetch.post(`order`, data);
    const orderId = response.data;
    const vnPay = await authenFetch.get(`vnPay`, {
      params: { orderId },
    });
    setPayment(vnPay.data.url);
  };

  const mutationCheckout = useMutation({
    mutationFn: (data: any) => {
      return handleCheckOut(data);
    },
  });
  const { data: cartDetails, isLoading } = useGetCartDetailByCartId();
  const checkout = () => {
    const payload = {
      paymentMethod: "VN_PAY",
      orderDetailVms: [
        {
          productId: 1,
          amount: 4,
        },
        {
          productId: 2,
          amount: 3,
        },
      ],
    };
    mutationCheckout.mutate(payload);
  };
  if (isLoading) return <CircularLoading />;
  if (cartDetails)
    return (
      <Box sx={styles.shoppingCartWrapper}>
        <Box sx={styles.title}>
          <DynamicLink to={"/"}>
            <IconComponent iconName={"faArrowLeft"} />
          </DynamicLink>
          <Typography sx={{ fontWeight: "bold" }} component={"div"}>
            Giỏ hàng của bạn
          </Typography>
        </Box>
        {cartDetails && cartDetails.length > 0 ? (
          cartDetails.map((item: any) => (
            <ProductInCart key={item.id} cartDetail={item} />
          ))
        ) : (
          <NoProductInCart />
        )}
        <Button sx={{ marginTop: 1 }} onClick={() => checkout()}>
          CHECKOUT
        </Button>
        {payment ? <DynamicLink href={payment}>VNPAY</DynamicLink> : null}
      </Box>
    );
};

export default ShoppingCart;

const ProductInCart = ({ cartDetail }: any) => {
  const { data: productDetail } = useGetProductDetail(cartDetail.productId);
  const { data: productGallery } = useGetProductGalleryInCart(
    cartDetail.productId
  );

  if (productDetail && productGallery) {
    return (
      <Box sx={styles.cart}>
        <Box sx={{ padding: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <img src={productGallery.imagePath} alt="" width={"100%"} />
            </Grid>
            <Grid item xs={7}>
              <Box>
                <Typography component={"div"}>
                  {productDetail.productName}
                </Typography>
                <Typography sx={styles.priceText} component={"div"}>
                  {formatPrice({ price: productDetail.price })}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              {cartDetail.amount}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  paddingY: 2,
                }}
              >
                <IconComponent iconName={"faShieldHalved"} />
                <Typography sx={{ marginLeft: 1 }}>
                  Bảo vệ toàn diện với Bảo hành mở rộng{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
};

const NoProductInCart = () => {
  return (
    <>
      <Box sx={styles.nothingInCart}>
        <img src={images.cartLogo} />
        <Typography component={"span"} sx={{ marginY: 3 }}>
          Giỏ hàng của bạn đang trống. <br />
          Hãy chọn thêm sản phẩm để mua sắm nhé
        </Typography>
      </Box>
      <Box>
        <Button sx={styles.buyNowButton}>
          <Typography component={"strong"} sx={styles.buyNowText}>
            Mua ngay
          </Typography>
        </Button>
      </Box>
    </>
  );
};
