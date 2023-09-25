import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "pages/Layout";
import CMs from "pages/CMs";
import AddCm from "pages/AddCm";
import ManageCM from "pages/ManageCM";
import ClosedCMs from "pages/ClosedCMs";
import PendingPo from "pages/PendingPo";
import Breakdowns from "pages/Breakdowns";
import LoginPage from "pages/login";
import Unauth from "pages/Unauth";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.global.token);
  const role = useSelector((state) => state.global.user.role);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {console.log(role)}
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/CMs" replace />} />
            <Route path="/unauth" element={<Unauth />} />
            <Route
              path="/CMs"
              element={isAuth && role !== "maintenance" ? <CMs /> : <Unauth />}
            />
            <Route
              path="/add_order"
              element={
                isAuth && role !== "maintenance" ? <AddCm /> : <Unauth />
              }
            />
            <Route
              path="/completed"
              element={isAuth ? <ClosedCMs /> : <Unauth />}
            />
            <Route
              path="/pending_PO"
              element={
                isAuth && role !== "production" ? <PendingPo /> : <Unauth />
              }
            />
            <Route
              path="/open_CMs"
              element={isAuth ? <Breakdowns /> : <Unauth />}
            />
            <Route
              exact
              path="/CMs/:id"
              element={isAuth ? <ManageCM /> : <Unauth />}
            />
            <Route
              exact
              path="/login"
              element={
                !isAuth ? (
                  <LoginPage />
                ) : role === "maintenance" ? (
                  <Navigate to="/open_CMs" replace />
                ) : (
                  <Navigate to="/CMs" replace />
                )
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
