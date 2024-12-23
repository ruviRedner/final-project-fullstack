import React, { useState } from "react";
import { Get8Type } from "../../../types/typeFor8";
import { TerrorResponce } from "../../../types/responce";
import { socket } from "../../../App";
import { BarChart } from "@mui/x-charts";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { orgNames } from "../../../types/mapTypes";

const GraphByOrg: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [data, setData] = useState<Get8Type[]>([]);
  const [isData, setIsData] = useState(true);
   const handleChange = (event: SelectChangeEvent) => {
      setOrgName(event.target.value);
    };
  const handelOrg = async () => {
    socket.emit("get8", orgName, (res: TerrorResponce) => {
      if (res && Array.isArray(res.data)) {
        setData(res.data);
        setIsData(res.data.length > 0); 
      } else {
        console.error("Invalid response data:", res);
        setData([]);
        setIsData(false); 
      }
    });
  };

  const xAxisData = data.map((item) => item.year);
  const seriesData = [{ data: data.map((item) => item.totalIncidents) }];

  return (
    <div>
      <div className="container">
        {data.length > 0 ? (
          <div>
            <h2>מידע על תקריות של ארגונים לפי שנים</h2>
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
          <div>
            {!isData && <h3>אין נתונים להצגה</h3>}
            <div className="text">
              <h5>הקלד שם ארגון</h5>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="region-select-label">ארגון</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-select"
                value={orgName}
                onChange={handleChange}
                label="ארגון"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {orgNames.map((org, index) => (
                  <MenuItem key={index} value={org.name}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              <Button onClick={handelOrg}>חפש</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphByOrg;
