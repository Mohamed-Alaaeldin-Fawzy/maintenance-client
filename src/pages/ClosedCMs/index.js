import React from "react";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { useGetCMsQuery } from "state/api";
import { Box, Card, useTheme, IconButton } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import BreakDown from "components/BreakDown";
import LinearProgress from "@mui/material/LinearProgress";

const ClosedCMs = () => {
  const { data, isLoading } = useGetCMsQuery();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" gap="1.5rem" m="2rem 0rem">
        <IconButton onClick={() => navigate(-1)} sx={{ width: "4rem" }}>
          <ChevronLeft sx={{ fontSize: "1.8rem" }} />
        </IconButton>
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
                <BreakDown
                  name={cm.name}
                  description={cm.description}
                  responsible={cm.responsible}
                  department={cm.department}
                  accountable={cm.accountable}
                  technicalDescription={cm.technicalDescription}
                  sparePartsUsed={cm.sparePartsUsed}
                  createdAt={cm.createdAt}
                  updatedAt={cm.updatedAt}
                />
              </Card>
            ))}
        </Card>
      ) : (
        <Box sx={{ width: "100%", margin: "3rem 0" }}>
          <LinearProgress />
        </Box>
      )}{" "}
    </Box>
  );
};

export default ClosedCMs;
