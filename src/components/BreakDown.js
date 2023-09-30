import React from "react";
import { Typography, CardContent } from "@mui/material";
import { calculateDifference } from "utils/dateHelpers";

const BreakDown = ({
  name,
  description,
  responsible,
  department,
  accountable,
  technicalDescription,
  sparePartsUsed,
  createdAt,
  updatedAt,
}) => {
  return (
    <CardContent>
      <Typography
        sx={{ fontSize: 14, fontWeight: "bold" }}
        color="#e8ffec"
        gutterBottom
      >
        {department}
      </Typography>
      <Typography variant="h5" component="div" m="0.8rem 0" color="#e8ffec">
        {name}
      </Typography>
      <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
        {description}
      </Typography>
      {responsible && (
        <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
          Responsible: {responsible}
        </Typography>
      )}
      {accountable && (
        <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
          Accountable : {accountable}
        </Typography>
      )}
      {technicalDescription && (
        <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
          Technical Description: {technicalDescription}
        </Typography>
      )}
      {sparePartsUsed && (
        <Typography variant="body2" m="0.8rem 0" color="#e8ffec">
          Spare Parts: {sparePartsUsed}
        </Typography>
      )}
      <Typography>
        time To repair : {calculateDifference(updatedAt, createdAt)} Hours
      </Typography>
    </CardContent>
  );
};

export default BreakDown;
