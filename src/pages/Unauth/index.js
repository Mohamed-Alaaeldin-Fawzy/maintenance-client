import React from "react";
import img from "assets/auth.svg";
import Header from "components/Header";
import { Box } from "@mui/material";
const Unauth = () => {
  return (
    <Box
      sx={{
        height: "85vh",
        width: "90%",
        margin: "1rem auto",
        background: ` url(${img}) no-repeat right bottom /contain;`,
      }}
    >
      <Header
        title="UnAuthorized"
        subtitle="Who are you?! you are not suppose to be here"
      ></Header>
    </Box>
  );
};

export default Unauth;
