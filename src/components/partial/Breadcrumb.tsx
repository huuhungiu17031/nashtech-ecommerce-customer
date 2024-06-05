import { Typography, Breadcrumbs, Link, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const Breadcrumb = () => {
  return (
    <Box role="presentation" onClick={handleClick} className="container">
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 1 }}>
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </Box>
  );
};
