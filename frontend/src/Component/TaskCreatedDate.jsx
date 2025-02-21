import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Box, Stack, Typography } from "@mui/material";

const TaskCreatedDate = (props) => {
  
  const createdDate = props.createdAt;
  dayjs.extend(relativeTime);
  const latestDate = dayjs(createdDate).fromNow()
  const [updateDate, setUpdateDate] = useState(latestDate);

  // dayjs.extend(relativeTime);
  // newTime = dayjs(createdDate).fromNow();

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateDate(dayjs(createdDate).fromNow());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Box sx={{width:"100%",background:"",textAlign:"end",marginTop:"10px"}}>

      <Typography sx={{fontSize:"12px",color:"#676767"}}>{updateDate}</Typography>

      </Box>
    </>
  );
};

export default TaskCreatedDate;
