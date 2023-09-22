import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import { useGetCMsQuery } from "state/api";
import CM from "components/CM";

const CMs = () => {
  const isNoneMobile = useMediaQuery("(min-width:1450px)");
  const { data, isLoading } = useGetCMsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CMs" subtitle="list of all CMs" />
      {data || !isLoading ? (
        <>
          <Box
            mt="2rem"
            display="grid"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
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
              data.CMs.map((cm) => (
                <CM
                  key={cm._id}
                  name={cm.name}
                  department={cm.department}
                  description={cm.description}
                  stat={cm.stat}
                  id={cm._id}
                  createdAt={cm.createdAt}
                  closedAt={cm.updatedAt}
                  responsible={cm.responsible}
                  accountable={cm.accountable}
                  isClosed={cm.isClosed}
                  isPendingPo={cm.isPendingPo}
                  requestForPoCompleted={cm.requestForPoReceived}
                  requestForClose={cm.requestForClose}
                />
              ))}
            {console.log(data)}
          </Box>
        </>
      ) : (
        <>Loading</>
      )}
    </Box>
  );
};

export default CMs;