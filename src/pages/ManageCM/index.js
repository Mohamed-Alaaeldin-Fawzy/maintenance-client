import React, { useState } from "react";
import Header from "components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleCMQuery, useUpdateCMMutation } from "state/api";
import {
  Box,
  TextField,
  Button,
  Stack,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const ManageCM = () => {
  const isNoneMobile = useMediaQuery("(min-width:1400px)");
  const [responsible, setResponsible] = useState("");
  const [accountable, setAccountable] = useState("");
  const [technical, setTechnical] = useState("");
  const [spareParts, setSpareParts] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCMQuery(id);
  const [updateCM] = useUpdateCMMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  const handelCloseCM = (e) => {
    updateCM({
      responsible,
      accountable,
      technicalDescription: technical,
      sparePartsUsed: spareParts,
      id,
    });
    navigate(-1);
  };

  const handleChange = (e) => {
    e.target.name === "responsible" && setResponsible(e.target.value);
    e.target.name === "accountable" && setAccountable(e.target.value);
    e.target.name === "technical" && setTechnical(e.target.value);
    e.target.name === "spareParts" && setSpareParts(e.target.value);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" gap="1.5rem">
        <IconButton onClick={() => navigate(-1)} sx={{ width: "4rem" }}>
          <ChevronLeft sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        <Header
          title="Manage CM"
          subtitle="Maintenance Eng Can Manage CM here"
        />
      </Box>
      {data || !isLoading ? (
        <>
          <Card
            sx={{
              margin: "2rem auto",
              width: "80%",
              background: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 21, fontWeight: "bold" }}
                color={theme.palette.secondary[200]}
                gutterBottom
              >
                {data.cm.department}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                m="1rem 0"
                color={theme.palette.background.alt[100]}
              >
                {data.cm.name}
              </Typography>
              <Typography
                variant="body2"
                m="1rem 0"
                color={theme.palette.background.alt[100]}
              >
                {data.cm.description}
              </Typography>
            </CardContent>
          </Card>
          <Box
            component="form"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={!isNoneMobile ? "100%" : "60%"}
            height="100%"
            flexDirection="column"
            sx={{
              padding: "2.5rem 1.5rem",
              margin: "0 auto",
              width: "80%",
              background: "none",
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.grey[900],
              borderRadius: "0.55rem",
            }}
          >
            <Stack spacing={3} width="80%">
              <TextField
                required
                label="Responsible"
                type="text"
                value={responsible}
                name="responsible"
                onChange={handleChange}
              />
              <TextField
                required
                label="Accountable"
                type="text"
                value={accountable}
                name="accountable"
                onChange={handleChange}
              />

              <TextField
                id="outlined-multiline-static"
                label="Technical Description"
                multiline
                rows={2}
                name="technical"
                value={technical}
                onChange={handleChange}
              />
              <TextField
                id="outlined-multiline-static"
                label="Spare Parts Required"
                multiline
                rows={2}
                name="spareParts"
                value={spareParts}
                onChange={handleChange}
              />
            </Stack>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection={isNoneMobile ? "row" : "column"}
              width="100%"
            >
              <Button
                id="assign"
                onClick={handelCloseCM}
                variant="outlined"
                sx={{
                  color: "#454428",
                  background: "#D1E7DD",
                  marginTop: "1.5rem",
                  padding: "1rem 3rem",
                }}
              >
                Update CM
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>Loading ...</>
      )}{" "}
    </Box>
  );
};

export default ManageCM;
