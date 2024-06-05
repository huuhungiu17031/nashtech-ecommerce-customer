import { checkout } from "@/services";
import { CheckOutData, OrderInformation } from "@/shared";
import { Card, Grid, Link, Paper, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export const OrderCard = ({
  orderInformation,
  handleClose,
  handleClickOpen,
}: {
  orderInformation: OrderInformation;
  handleClickOpen?: (id: number) => void;
  handleClose?: () => void;
}) => {
  const { paymentMethod, status, totalMoney, updatedAt, id } =
    orderInformation.order;

  const mutationCheckout = useMutation({
    mutationFn: (data: CheckOutData) => checkout(data),
    onSuccess: (data: any) => {
      // @ts-ignore
      window.location.href = data.url;
    },
  });

  const handleOnClick = () => {
    if (status === "PENDING") {
      const checkOutData = {
        id,
        paymentMethod,
        orderDetailVms: orderInformation.orderDetailVm,
      };
      mutationCheckout.mutate(checkOutData);
    }
  };

  return (
    <Paper elevation={status === "PENDING" ? 3 : 0}>
      <Card
        onClick={handleOnClick}
        variant="outlined"
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Payment Method: </strong>
              {paymentMethod}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Status:</strong> {status}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Total Money:</strong> {totalMoney.toLocaleString()} VND
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Updated At:</strong>
              {updatedAt && new Date(updatedAt).toLocaleString()}
            </Typography>
          </Grid>
          {status === "COMPLETED" && (
            <Grid item xs={12} sm={6}>
              <Link onClick={() => handleClickOpen(id)}>Xem hóa đơn</Link>
            </Grid>
          )}
        </Grid>
      </Card>
    </Paper>
  );
};
