import React, { useState, useEffect } from "react";
import { ColumnChart } from "@opd/g2plot-react";

const GraphAnimation: React.FC = () => {
  const [data, setData] = useState([
    { type: "חיפה", value: 30 },
    { type: "תל אביב", value: 45 },
    { type: "ירושלים", value: 20 },
    { type: "אשדוד", value: 25 },
    { type: "גבעת שמואל", value: 15 },
    { type: "בני ברק", value: 35 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: Math.floor(Math.random() * 60),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const config = {
    height:300,
    xField: "type",
    yField: "value",
    columnWidthRatio: 0.6, 
    appendPadding: [20, 20, 20, 20],
    data,
  };

  return (
    <div className="container">
      <div className="animation">
      <ColumnChart {...config} />
      </div>
      
    </div>
  );
};

export default GraphAnimation;
