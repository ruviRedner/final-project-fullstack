import React, { useState } from "react";
import { Get8Type } from "../../../types/typeFor8";
import { TerrorResponce } from "../../../types/responce";
import { socket } from "../../../App";
import { BarChart } from "@mui/x-charts";
import { Button, TextField } from "@mui/material";

const GraphByOrg: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [data, setData] = useState<Get8Type[]>([]);
  const [isData, setIsData] = useState(true);

  const handelOrg = async () => {
    socket.emit("get8", orgName, (res: TerrorResponce) => {
      if (res && Array.isArray(res.data)) {
        setData(res.data);
        setIsData(res.data.length > 0); // עדכון אם יש נתונים
      } else {
        console.error("Invalid response data:", res);
        setData([]);
        setIsData(false); // אין נתונים להצגה
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
              <TextField
                onChange={(e) => setOrgName(e.target.value)}
                id="standard-basic"
                label="org-name"
                variant="standard"
              />
              <Button onClick={handelOrg}>חפש</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphByOrg;
