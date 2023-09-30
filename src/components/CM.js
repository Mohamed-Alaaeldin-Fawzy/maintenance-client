import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import EmojiFlagsOutlinedIcon from "@mui/icons-material/EmojiFlagsOutlined";
import { useCompleteCMMutation } from "state/api";
import { options, formatDate } from "utils/dateHelpers";
const CM = ({
  name,
  description,
  department,
  id,
  createdAt,
  isClosed,
  isPendingPo,
  closedAt,
  requestForPoCompleted,
  requestForClose,
}) => {
  const [completeCM] = useCompleteCMMutation();

  const handelCompleteCM = () => {
    completeCM(id);
  };

  return (
    <Card
      sx={{
        background: "none",
        backgroundColor: isPendingPo
          ? "#FFBA1F"
          : isClosed
          ? "#28A745"
          : "#ea000f",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <FlexBetween>
          <Typography
            sx={{ fontSize: 14, fontWeight: "bold" }}
            color={isPendingPo ? "#000" : isClosed ? "#e8ffec" : "#ffdbde"}
            gutterBottom
          >
            {department}
          </Typography>
          {(requestForClose || requestForPoCompleted) && (
            <EmojiFlagsOutlinedIcon sx={{ fontSize: "40px", color: "#000" }} />
          )}
        </FlexBetween>
        <Typography
          variant="h5"
          component="div"
          m="0.8rem 0"
          color={isPendingPo ? "#000" : isClosed ? "e8ffec" : "#ffdbde"}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          m="0.8rem 0"
          color={isPendingPo ? "#000" : isClosed ? "e8ffec" : "#ffdbde"}
        >
          {description}
        </Typography>

        <Typography
          m="0.8rem 0"
          color={isPendingPo ? "#000" : isClosed ? "e8ffec" : "#ffdbde"}
        >
          Issued At : {formatDate(createdAt, options)}
        </Typography>
        {!isClosed ? (
          <FlexBetween>
            <Button
              onClick={handelCompleteCM}
              variant="outlined"
              sx={{
                color: "e8ffec",
                background: "#D1E7DD",
                margin: "0.5rem",
              }}
            >
              Mark as Completed
            </Button>
          </FlexBetween>
        ) : (
          <Typography m="0.8rem 0" color={isClosed ? "#333" : "#ffdbde"}>
            Closed At : {formatDate(closedAt, options)}
          </Typography>
        )}

        <Outlet />
      </CardContent>
    </Card>
  );
};

export default CM;
