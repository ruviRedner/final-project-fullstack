import React, { useState } from "react";
import "../graph.css";
import { socket } from "../../../App";
import { TerrorResponce } from "../../../types/responce";
import { Get2Type } from "../../../types/typeFor2";
import { BarChart } from "@mui/x-charts";
import { Button, TextField } from "@mui/material";

const GraphByYearAndManth: React.FC = () => {
  const [year, setYear] = useState<string>("");
  const [data, setData] = useState<Get2Type[]>([]);

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handelYear = async () => {
    socket.emit("get2", year, (res: TerrorResponce) => {
      if (res && Array.isArray(res.data)) {
        setData(res.data);
      } else {
        console.error("Invalid response data:", res);
        setData([]);
      }
    });
  };

  const xAxisData = Array.isArray(data) ? data.map((item) => item.month) : [];
  const seriesData = Array.isArray(data) ? [{ data: data.map((item) => item.incident) }] : [];

  return (
    <div className="container">
      {data.length > 0 ? (
        <div>
          <h2>מידע על כמות תקיפות לפי חודשים</h2>
          <BarChart
            width={800}
            height={300}
            xAxis={[
              {
                scaleType: "band",
                data: xAxisData,
              },
            ]}
            series={seriesData}
          />
        </div>
      ) : (
        <div className="text">
          <h5>אנא בחר שנה</h5>
          <TextField onChange={handelChange} id="standard-basic" label="Year" variant="standard" />
          <Button onClick={handelYear}>חפש</Button>
        </div>
      )}
    </div>
  );
};

export default GraphByYearAndManth;
