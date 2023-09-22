import React from "react";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { useGetCMsQuery } from "state/api";
import {
  Box,
  useMediaQuery,
  Card,
  useTheme,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const ClosedCMs = () => {
  const isNoneMobile = useMediaQuery("(min-width:1400px)");
  const { data, isLoading } = useGetCMsQuery();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" gap="1.5rem" m="0 3.5rem">
        <IconButton onClick={() => navigate(-1)} sx={{ width: "4rem" }}>
          <ChevronLeft sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        {console.log(data)}
        <Header
          title="Completed CMs"
          subtitle="Here is a list of all completed CMs"
        />
      </Box>
      {data || !isLoading ? (
        <Card
          sx={{
            margin: "2rem auto",
            width: "90%",
            background: "none",
            backgroundColor: theme.palette.primary[700],
            borderTop: "0.6rem solid #28A745",
            borderRadius: "0.55rem",
          }}
        >
          {data &&
            data.CMs.filter((cm) => cm.isClosed).map((cm) => (
              <Card
                sx={{
                  background: "none",
                  backgroundColor: theme.palette.primary[500],
                  borderLeft: `2rem solid #28A745`,
                  borderRadius: "0.55rem",
                  margin: "1rem",
                }}
                key={cm._id}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                    color="#e8ffec"
                    gutterBottom
                  >
                    {cm.department}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    m="0.8rem 0"
                    color="#e8ffec"
                  >
                    {cm.name}
                  </Typography>
                  <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
                    {cm.description}
                  </Typography>
                  {cm.responsible && (
                    <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
                      Responsible: {cm.responsible}
                    </Typography>
                  )}
                  {cm.accountable && (
                    <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
                      Accountable : {cm.accountable}
                    </Typography>
                  )}
                  {cm.technicalDescription && (
                    <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
                      Technical Description: {cm.technicalDescription}
                    </Typography>
                  )}
                  {cm.sparePartsUsed && (
                    <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
                      Spare Parts: {cm.sparePartsUsed}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
        </Card>
      ) : (
        <>Loading ...</>
      )}{" "}
    </Box>
  );
};

export default ClosedCMs;
