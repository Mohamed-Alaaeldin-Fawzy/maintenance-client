import React, { useState } from "react";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  LoginOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  useTheme,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handelClick = (e) => setAnchorEl(e.currentTarget);

  const handelClose = (e) => {
    dispatch(setLogout());
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>
        <FlexBetween gap="1.5rem">
          <FlexBetween>
            {user._id ? (
              <>
                <Button
                  onClick={handelClick}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "none",
                    gap: "1rem",
                  }}
                >
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.7rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      fontSize="0.6rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      {user.job}
                    </Typography>
                  </Box>
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px",
                    }}
                  />{" "}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handelClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <MenuItem onClick={handelClose}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
