import React, { useState } from "react";
import "../graph.css";
import { socket } from "../../../App";
import { TerrorResponce } from "../../../types/responce";
import { Get2Type } from "../../../types/typeFor2";
import { BarChart } from "@mui/x-charts";
import { Button, TextField } from "@mui/material";
import { Get7Type } from "../../../types/typeFor7";

const GraphByYearAndManth: React.FC = () => {
  const [year, setYear] = useState<string>("");
  const [data, setData] = useState<Get2Type[]>([]);
  const [result, setResult] = useState<Get7Type[]>([]);
  const [toggle, setToggle] = useState<boolean | null>(null);
  const [isData, setIsData] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleYear = async () => {
    setData([]);
  setResult([]);
    setToggle(false);
    socket.emit("get2", year, (res: TerrorResponce) => {
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }
      if (res && Array.isArray(res.data)) {
        setIsData(true);
        setData(res.data);
      } else {
        console.error("Invalid response data:", res);
        setData([]);
        setIsData(false);
      }
    });
  };

  const handleOrg = async () => {
    setToggle(true);
    socket.emit("get7", year, (res: TerrorResponce) => {
      console.log(res.data);
      
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }
      if (res && Array.isArray(res.data)) {
        setIsData(true);
        setResult(res.data);
      } else {
        console.error("Invalid response data:", res);
        setResult([]);
        setIsData(false);
      }
    });
  };

  const xAxisData =
    toggle === false
      ? data.map((item) => item.month)
      : toggle === true
      ? result.map((item) => item.organization)
      : [];
  const seriesData =
    toggle === false
      ? [{ data: data.map((item) => item.incident) }]
      : toggle === true
      ? [{ data: result.map((item) => item.totalIncidents) }]
      : [];

  return (
    <div className="container">
      {!isData && <h3>אין נתונים להצגה</h3>}
      {toggle !== null && (data.length > 0 || result.length > 0) ? (
        <div>
          <h2>
            {toggle === false
              ? "מידע על כמות תקיפות לפי חודשים"
              : "מידע על כמות תקיפות של ארגון"}
          </h2>
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
          <TextField
            onChange={handleChange}
            id="standard-basic"
            label="Year"
            variant="standard"
            value={year}
          />
          <Button onClick={handleYear}>חפש</Button>
          <Button onClick={handleOrg}>הצג תקיפות של ארגון</Button>
        </div>
      )}
    </div>
  );
};

export default GraphByYearAndManth;
