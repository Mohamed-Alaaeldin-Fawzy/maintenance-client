import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import {
  PieChartOutline,
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  ReceiptLongOutlined,
  CalendarMonthOutlined,
  AlarmAddOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNoneMobile,
  user,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const navItems = [
    {
      text: "Production Department",
      path: "production",
      icon: null,
    },
    {
      text: "Make Maintenance Request",
      path: "add_order",
      icon: <AlarmAddOutlined />,
    },
    {
      text: "All Maintenance Request",
      path: "CMs",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Maintenance Department",
      icon: null,
    },
    {
      text: "Open CMs",
      path: "open_CMs",
      icon: <SettingsOutlined />,
    },
    {
      text: "Completed",
      path: "completed",
      icon: <PieChartOutline />,
    },
    {
      text: "Purchasing Department",
      icon: null,
    },
    {
      text: "Pending POs",
      path: "pending_PO",
      icon: <CalendarMonthOutlined />,
    },
  ];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNoneMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    AUF
                  </Typography>
                </Box>
                {!isNoneMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, path }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${path}`);
                        setActive(path);
                        isNoneMobile
                          ? setIsSidebarOpen(true)
                          : setIsSidebarOpen(false);
                      }}
                      sx={{
                        backgroundColor:
                          active === path
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === path
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === path
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === path && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>
            <Divider />
            {user && (
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 1rem 3rem"
              >
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.7rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.job}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </FlexBetween>
            )}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
