import { getProductDetailVm, useGetOrder } from "@/services";
import { OrderInformation } from "@/shared";
import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { OrderCard } from "./OrderCard";
import { useState } from "react";
import { PaymentPdf } from "./Payment-pdf";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const ProfilePage = () => {
  const { data: orders, isLoading } = useGetOrder();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState({});
  const handleClickOpen = (id: number) => {
    setOpen(true);
    const invoices: OrderInformation[] = [...orders];
    const invoice = invoices.find((item) => item.order.id === id);
    setInvoice({ ...invoice });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (orders && orders.length >= 0) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography component={"h1"}>PAYMENT</Typography>
            <Box>
              <Typography component={"h2"}>
                {
                  orders.filter(
                    (item: OrderInformation) =>
                      item.order.status === "COMPLETED"
                  ).length
                }{" "}
                đơn hàng
              </Typography>
            </Box>
            <Box>
              <Typography component={"h2"}>
                {orders
                  .reduce(
                    (accumulator: number, currentValue: OrderInformation) => {
                      if (currentValue.order.status === "COMPLETED") {
                        return accumulator + currentValue.order.totalMoney;
                      }
                      return accumulator;
                    },
                    0
                  )
                  .toLocaleString()}{" "}
                Tổng tiền tích luỹ
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="COMPLETED" {...a11yProps(0)} />
              <Tab label="PENDING" {...a11yProps(1)} />
              <Tab label="CANCELLED" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {orders.map((item: OrderInformation) => {
              if (item.order.status === "COMPLETED") {
                return (
                  <OrderCard
                    key={item.order.id}
                    orderInformation={item}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                  />
                );
              }
            })}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {orders.map((item: OrderInformation) => {
              if (item.order.status === "PENDING") {
                return (
                  <OrderCard key={item.order.id} orderInformation={item} />
                );
              }
            })}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {orders.map((item: OrderInformation) => {
              if (item.order.status === "CANCELLED") {
                return (
                  <OrderCard key={item.order.id} orderInformation={item} />
                );
              }
            })}
          </CustomTabPanel>
        </Grid>
        {open && invoice && (
          <PaymentPdf handleClose={handleClose} open={open} invoice={invoice} />
        )}
      </Grid>
    );
  }
};
