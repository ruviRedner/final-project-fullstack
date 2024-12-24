import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { socket } from "../../../App";
import { TerrorResponce } from "../../../types/responce";
import "../graph.css";
import { Get1Type } from "../../../types/typeFor1";

const GraphByAttack: React.FC = () => {
  const [data, setData] = useState<Get1Type[]>([]);
  const [isData, setIsData] = useState(true);
  const [dataChanged, setDataChanged] = useState<boolean>(false)
  useEffect(() => {
    socket.on("change-data", (data: { action: string; data: any }) => {
        if (data.action === "create") {
          setDataChanged(true)
        } else if (data.action === "update") {
          setDataChanged(true)
        } else if (data.action === "delete") {
          setDataChanged(true)
        }
    });

    return () => {
      socket.off("change-data");
    };
  }, []);
  useEffect(() => {
    socket.emit("get1", (res: TerrorResponce) => {
      if (res.data.length <= 0) {
        setIsData(false);
        return;
      }
      setIsData(true);
      setData(res.data);
    });
  }, [dataChanged]);

  const xAxisData = data?.map((item) => item.attackType);
  const seriesData = [{ data: data?.map((item) => item.totalCasualties) }];

  return (
    <div className="container">
      {!isData && <h3>אין נתונים להצגה</h3>}
      <h2>מידע על כמות נפגעים לפי תקיפות</h2>
      <div className="animation">
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
    </div>
  );
};

export default GraphByAttack;
