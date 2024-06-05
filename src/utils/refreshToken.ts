import { autoFetch } from "@/services";
import createRefresh from "react-auth-kit/createRefresh";
export const refresh = createRefresh({
  interval: 48 * 60 * 60 * 1000,
  refreshApiCallback: async (param): Promise<any> => {
    try {
      const response = await autoFetch.post("/refresh", param, {
        headers: { Authorization: `Bearer ${param.authToken}` },
      });
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 48 * 60 * 60 * 1000,
        newRefreshTokenExpiresIn: 72 * 60 * 60 * 1000,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
