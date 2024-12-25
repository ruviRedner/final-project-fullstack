import React, { useState } from "react";
import { GetType5, regions } from "../../../types/typeFor5";
import { TerrorResponce } from "../../../types/responce";
import { socket } from "../../../App";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

const GraphForIncidentByRegion: React.FC = () => {
  const [data, setData] = useState<GetType5[]>([]);
  const [isGraph, setIsGraph] = useState(true);
  const [region, setRegion] = useState("");
  const [isData, setIsData] = useState(true);

  const handelTop5 = async () => {
    setIsGraph(true);
    socket.emit("get5",  region, (res: TerrorResponce) => {
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
        setIsData(false)
      }
    });
  };

  const handelAll = async () => {
    socket.emit("get6", region, (res: TerrorResponce) => {
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

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  const xAxisData = Array.isArray(data) ? data.map((item) => item.orgName) : [];
  const seriesData = Array.isArray(data)
    ? [{ data: data.map((item) => item.incident) }]
    : [];

  return (
    <div>
      <div className="container">
      {!isData && <h3>אין נתונים להצגה</h3>}
        {data.length > 0 ? (
          <div>
            <h2>מידע על תקריות של ארגונים לפי אזור</h2>
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
            <h5>אנא בחר אזור</h5>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="region-select-label">אזור</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-select"
                value={region}
                onChange={handleChange}
                label="אזור"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {regions.map((region, index) => (
                  <MenuItem key={index} value={region.name}>
                    {region.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={handelTop5}>5 הבולטים</Button>
            <Button onClick={handelAll}>לכל הארגונים</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphForIncidentByRegion;
