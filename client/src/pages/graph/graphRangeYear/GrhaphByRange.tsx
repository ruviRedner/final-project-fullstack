import React, { useState } from "react";
import { Get3Type } from "../../../types/typeFor3";
import { TerrorResponce } from "../../../types/responce";
import { socket } from "../../../App";
import { Button, TextField } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const GrhaphByRange: React.FC = () => {
const [endYear,setEndYear] = useState("")
const [startYear,setStartYear] = useState("")

  const [data, setData] = useState<Get3Type[]>([]);

  const handelYearRange = async () => {
      socket.emit("get3", {startYear,endYear}, (res: TerrorResponce) => {
        if (res && Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Invalid response data:", res);
          setData([]);
        }
      });
    };
    const xAxisData = Array.isArray(data) ? data.map((item) => item.year) : [];
  const seriesData = Array.isArray(data) ? [{ data: data.map((item) => item.incident) }] : [];

  return <div>
    <div className="container">
      {data.length > 0 ? (
        <div>
          <h2>מידע על תקיפות לפי טווח שנים</h2>
          <BarChart
            width={1000}
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
          <h5>אנא בחר שנים</h5>
          <TextField onChange={(e) => setStartYear(e.target.value)} id="standard-basic" label="Year" variant="standard" />
          <TextField onChange={(e) => setEndYear(e.target.value)} id="standard-basic" label="Year" variant="standard" />
          <Button onClick={handelYearRange}>חפש</Button>
        </div>
      )}
    </div>

  </div>;
};

export default GrhaphByRange;
