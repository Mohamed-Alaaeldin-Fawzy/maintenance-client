import { Box, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";

const Layout = () => {
  const isNoneMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data, isLoading } = useGetUserQuery();
  const user = useSelector((state) => state.global.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data !== undefined) {
      dispatch(setUser({ user: data.user }));
    }
  }, [data]);
  return (
    <Box display={isNoneMobile ? "flex" : "block"} width="100%" height="100%">
      {!isLoading && (
        <>
          <Sidebar
            user={user}
            isNonMobile={isNoneMobile}
            drawerWidth="350px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Box flexGrow={1}>
            <Navbar
              user={user}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Layout;
