import React from "react";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import {
  useGetCMsQuery,
  useRequirePoMutation,
  useRequestForCloseMutation,
} from "state/api";
import {
  Box,
  Card,
  useTheme,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import EmojiFlagsOutlinedIcon from "@mui/icons-material/EmojiFlagsOutlined";
import BreakDown from "components/BreakDown";
import LinearProgress from "@mui/material/LinearProgress";

const OpenCMs = () => {
  const isNoneMobile = useMediaQuery("(min-width:1450px)");
  const { data, isLoading } = useGetCMsQuery();
  const [requirePO] = useRequirePoMutation();
  const [requestForClose] = useRequestForCloseMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" gap="1.5rem" mt="2rem">
        <IconButton onClick={() => navigate(-1)} sx={{ width: "4rem" }}>
          <ChevronLeft sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        <Header title="Uncompleted CMs" subtitle="here we can handel the CM " />
      </Box>
      {data || !isLoading ? (
        <Box
          mt="2rem"
          display="grid"
          gridTemplateColumns="repeat(2,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": {
              gridColumn: isNoneMobile ? undefined : "span 4",
            },
          }}
        >
          {data &&
            data.CMs.filter((cm) => !cm.isClosed && !cm.isPendingPo).map(
              (cm) => (
                <Card
                  mt="2rem"
                  sx={{
                    backgroundColor: theme.palette.primary[500],
                    borderLeft: `5rem solid #EA000F`,
                    borderRadius: "0.55rem",
                    margin: "2rem",
                  }}
                  key={cm._id}
                >
                  {cm.requestForClose && (
                    <EmojiFlagsOutlinedIcon
                      sx={{ fontSize: "40px", color: "#000", float: "right" }}
                    />
                  )}
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
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: "#f1f1f1",
                      background: theme.palette.primary[500],
                      margin: "0.5rem",
                    }}
                    onClick={() => navigate(`/CMs/${cm._id}`)}
                  >
                    Update CM
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: "#f1f1f1",
                      background: theme.palette.warning[600],
                      margin: "0.5rem",
                    }}
                    onClick={() => {
                      requirePO({ id: cm._id, PO: true });
                    }}
                  >
                    Require PO
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: "#f1f1f1",
                      background: "#28A745",
                      margin: "0.5rem",
                    }}
                    onClick={() => {
                      requestForClose(cm._id);
                    }}
                  >
                    Request For Close
                  </Button>
                </Card>
              )
            )}
        </Box>
      ) : (
        <Box sx={{ width: "100%", margin: "3rem 0" }}>
          <LinearProgress />
        </Box>
      )}{" "}
    </Box>
  );
};

export default OpenCMs;
