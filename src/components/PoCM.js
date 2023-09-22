import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Button,
  TextField,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  useUpdateCMMutation,
  useIsPoCompletedMutation,
  useRequestForPoReceivedMutation,
} from "state/api";
import EmojiFlagsOutlinedIcon from "@mui/icons-material/EmojiFlagsOutlined";
import FlexBetween from "./FlexBetween";

const PoCM = ({
  name,
  department,
  description,
  sparePartsUsed,
  sparePartsRequired,
  issueDate,
  id,
  requestForPoCompleted,
}) => {
  const formatDate = (date, options) => {
    return new Date(date).toLocaleString(undefined, options);
  };
  const isNoneMobile = useMediaQuery("(min-width:1400px)");
  const theme = useTheme();
  const [requiredPO, setRequiredPO] = useState("");
  const handleChange = (e) => {
    setRequiredPO(e.target.value);
  };
  const [updateCM] = useUpdateCMMutation();
  const [isPoCompleted] = useIsPoCompletedMutation();
  const [requestForPoReceived] = useRequestForPoReceivedMutation();
  return (
    <Card
      sx={{
        background: "none",
        backgroundColor: theme.palette.primary[700],
        borderRadius: "0.55rem",
        margin: "1rem",
        textAlign: "center",
        borderTop: `1rem solid ${theme.palette.warning[500]}`,
      }}
    >
      <CardContent>
        <FlexBetween>
          <Typography
            sx={{ fontSize: 20, fontWeight: "bold" }}
            color={theme.palette.primary[100]}
            gutterBottom
          >
            {department}
          </Typography>
        </FlexBetween>
        <Typography
          component="h4"
          sx={{ fontSize: 18 }}
          m="0.8rem 0"
          color={theme.palette.primary[100]}
        >
          {name}
        </Typography>
        <Typography
          component="h4"
          m="0.8rem 0"
          color={theme.palette.primary[100]}
        >
          {description}
        </Typography>
        {sparePartsUsed && (
          <Typography
            component="h4"
            m="0.8rem 0"
            color={theme.palette.primary[100]}
          >
            Spare parts: {sparePartsUsed}
          </Typography>
        )}
      </CardContent>

      {!sparePartsRequired ? (
        <Box
          component="form"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={!isNoneMobile ? "100%" : "90%"}
          height="100%"
          flexDirection="column"
          sx={{
            padding: "2.5rem 2.5rem",
            margin: "1rem auto",
            width: "90%",
            background: theme.palette.primary[500],
            borderLeft: `2rem solid ${theme.palette.warning[500]}`,
            borderRadius: "0.55rem",
          }}
        >
          <Stack spacing={3} width="100%">
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={2}
              label="PO required"
              type="text"
              value={requiredPO}
              name="requiredPO"
              onChange={handleChange}
              variant="outlined"
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
              variant="contained"
              onClick={() => {
                updateCM({
                  id: id,
                  sparePartsRequired: requiredPO,
                });
              }}
              sx={{
                color: theme.palette.secondary[300],
                background: theme.palette.primary[600],
                marginTop: "1.5rem",
                padding: "1rem 3rem",
              }}
            >
              Require PO
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          component="div"
          textAlign="center"
          width={!isNoneMobile ? "100%" : "90%"}
          height="100%"
          flexDirection="column"
          sx={{
            padding: "2.5rem 2.5rem",
            margin: "1rem auto",
            width: "90%",
            background: theme.palette.primary[500],
            borderLeft: `2rem solid ${theme.palette.warning[500]}`,
            borderRadius: "0.55rem",
          }}
        >
          <FlexBetween>
            <Box component="h2" color={theme.palette.primary[100]}>
              PO Number : {sparePartsRequired}
            </Box>
            {requestForPoCompleted && (
              <EmojiFlagsOutlinedIcon
                sx={{ fontSize: "40px", color: "#fff" }}
              />
            )}
          </FlexBetween>
          <Box component="h4" color={theme.palette.primary[100]}>
            issued At :{" "}
            {formatDate(issueDate, {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            flexDirection={isNoneMobile ? "row" : "column"}
            width="100%"
          >
            <Button
              variant="contained"
              onClick={() => {
                isPoCompleted({ id, isPoFullFilled: true });
              }}
              sx={{
                color: theme.palette.secondary[300],
                background: theme.palette.primary[600],
                marginTop: "1.5rem",
                padding: "1rem 3rem",
              }}
            >
              PO received
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                requestForPoReceived(id);
              }}
              sx={{
                color: theme.palette.secondary[300],
                background: theme.palette.primary[600],
                marginTop: "1.5rem",
                padding: "1rem 3rem",
              }}
            >
              Request For Po Close
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default PoCM;
