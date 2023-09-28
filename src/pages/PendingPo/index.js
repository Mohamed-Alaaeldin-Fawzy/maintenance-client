import React from "react";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import { useGetCMsQuery } from "state/api";
import { Box, IconButton } from "@mui/material";

import { ChevronLeft } from "@mui/icons-material";
import PoCM from "components/PoCM";

const PendingPo = () => {
  const { data, isLoading } = useGetCMsQuery();
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" gap="1.5rem" m="2rem 0">
        <IconButton onClick={() => navigate(-1)} sx={{ width: "4rem" }}>
          <ChevronLeft sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        <Header
          title="CMs waiting for POs "
          subtitle="Omar Mostafa Stop Slaking"
        />
      </Box>
      {data || !isLoading ? (
        <>
          {data &&
            data.CMs.filter((cm) => cm.isPendingPo).map((cm) => (
              <PoCM
                name={cm.name}
                description={cm.description}
                department={cm.department}
                id={cm._id}
                sparePartsRequired={cm.sparePartsRequired}
                sparePartsUsed={cm.sparePartsUsed}
                issueDate={cm.updatedAt}
                key={cm._id}
                requestForPoCompleted={cm.requestForPoReceived}
              />
            ))}
        </>
      ) : (
        // </Card>
        <>Loading ...</>
      )}{" "}
    </Box>
  );
};

export default PendingPo;
