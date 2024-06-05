import { DynamicLink } from "@/components";
import images from "@/assets/images";
import { CART } from "@/shared";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useState } from "react";
import { autoFetch } from "@/services";
import { useAuthen } from "@/context";
const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();
  const { email } = useAuthen();
  const navigate = useNavigate();
  const openModalLogin = () => {
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const signOut = useSignOut();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      setAnchorEl(null);
      await autoFetch.post("user/logout");
      signOut();
      window.location.reload();
    } catch (error) {
      console.log("ERROR LOGOUT");
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "4rem",
        justifyContent: "space-between",
        margin: "0 auto",
        padding: 0,
        width: "100%",
        backgroundColor: "#d70018",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }} className="container">
        <DynamicLink to={"/"} logo style={{ display: "flex" }}>
          <img src={images.logo} alt="cellphones" />
        </DynamicLink>

        <DynamicLink icon={"faTableList"}>Danh mục</DynamicLink>

        <DynamicLink
          icon={"faLocationDot"}
          subIcon={"faChevronDown"}
          locationValue={"Ho Chi Minh"}
          width={24}
          height={24}
        >
          Xem giá tại
        </DynamicLink>

        {/* SEARCH BAR */}
        <div style={{ flexGrow: 1 }}></div>
        {/* SEARCH BAR */}

        <DynamicLink icon={"faPhone"} width={24} height={24} hover>
          Gọi mua hàng <br /> 1800.2097
        </DynamicLink>

        <DynamicLink icon={"faLocationDot"} width={25} height={25} hover>
          Cửa hàng <br /> gần bạn
        </DynamicLink>

        <DynamicLink icon={"faTruck"} width={41} height={24} flipIcon hover>
          Tra cứu <br /> đơn hàng
        </DynamicLink>

        <DynamicLink
          icon={"faBagShopping"}
          width={25}
          height={25}
          hover
          to={CART}
        >
          Giỏ <br /> hàng
        </DynamicLink>
        {isAuthenticated ? (
          <div>
            <Box
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar>{email[0]}</Avatar>
            </Box>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <DynamicLink icon={"faUser"} smember onClick={openModalLogin}>
            Smember
          </DynamicLink>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
