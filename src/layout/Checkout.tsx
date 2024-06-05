import { CircularLoading, errorAlert, successfullAlert } from "@/components";
import { autoFetch } from "@/services";
import { CANCELLED, COMPLETED } from "@/shared";
import { useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const vnPayParams = Object.fromEntries(queryParams);
  const navigate = useNavigate();
  const checkout = async () => {
    const response = await autoFetch.put(`vnPay/${id}`, null, {
      params: {
        ...vnPayParams,
      },
    });
    if (response.data.status === COMPLETED) {
      successfullAlert("Pay successfully").then(() => {
        navigate(`/`, { replace: true });
      });
    } else if (response.data.status === CANCELLED) {
      errorAlert("Pay Failed", "Order was cancelled", true);
      navigate(`/`, { replace: true });
    }
  };

  useEffect(() => {
    if (queryParams.size > 0) checkout();
  }, []);

  return <CircularLoading />;
};

export default Checkout;
