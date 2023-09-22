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
  Typography,
  CardContent,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import EmojiFlagsOutlinedIcon from "@mui/icons-material/EmojiFlagsOutlined";

const OpenCMs = () => {
  const isNoneMobile = useMediaQuery("(min-width:1450px)");
  const extraSmallScreens = useMediaQuery("(min-width:550px)");
  const { data, isLoading } = useGetCMsQuery();
  const [requirePO] = useRequirePoMutation();
  const [requestForClose] = useRequestForCloseMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" gap="1.5rem" m="0 3.5rem">
        <IconButton onClick={() => navigate(-1)} sx={{ width: "4rem" }}>
          <ChevronLeft sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        {console.log(data)}
        <Header
          title="Uncompleted CMs "
          subtitle="here we can handel the CM "
        />
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
                  <CardContent>
                    <FlexBetween>
                      <Typography
                        sx={{ fontSize: 18, fontWeight: "bold" }}
                        color="#ffe8e9"
                        gutterBottom
                      >
                        {cm.department}
                      </Typography>
                      {cm.requestForClose && (
                        <EmojiFlagsOutlinedIcon
                          sx={{ fontSize: "40px", color: "#000" }}
                        />
                      )}
                    </FlexBetween>
                    <Typography
                      variant="h5"
                      component="div"
                      m="0.8rem 0"
                      color="#ffe8e9"
                    >
                      {cm.name}
                    </Typography>
                    <Typography variant="body2" m="0.8rem 0" color="#ffe8e9">
                      {cm.description}
                    </Typography>
                    {cm.responsible && (
                      <Typography variant="body2" m="0.8rem 0" color="#ffe8e9">
                        Responsible: {cm.responsible}
                      </Typography>
                    )}
                    {cm.accountable && (
                      <Typography variant="body2" m="0.8rem 0" color="#ffe8e9">
                        Accountable : {cm.accountable}
                      </Typography>
                    )}
                    {cm.technicalDescription && (
                      <Typography variant="body2" m="0.8rem 0" color="#ffe8e9">
                        Technical Description: {cm.technicalDescription}
                      </Typography>
                    )}
                    {cm.sparePartsUsed && (
                      <Typography variant="body2" m="0.8rem 0" color="#ffe8e9">
                        Spare Parts: {cm.sparePartsUsed}
                      </Typography>
                    )}

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
                  </CardContent>
                </Card>
              )
            )}
        </Box>
      ) : (
        <>Loading ...</>
      )}{" "}
    </Box>
  );
};

export default OpenCMs;