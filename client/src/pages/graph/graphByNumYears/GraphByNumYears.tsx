import React, { useState } from 'react'
import { Get3Type } from '../../../types/typeFor3';
import { socket } from '../../../App';
import { TerrorResponce } from '../../../types/responce';
import { Button, TextField } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const GraphByNumYears:React.FC = () => {
     const [data, setData] = useState<Get3Type[]>([]);
     const [numYears,setNumYears] = useState("")
      const handelYearNum = async () => {
           socket.emit("get4", numYears, (res: TerrorResponce) => {
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
  return (
    <div>
        <div className="container">
      {data.length > 0 ? (
        <div>
          <h2>מידע על {numYears} שנים אחרונות</h2>
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
          <h5>אנא בחר מספר שנים</h5>
          <TextField onChange={(e) => setNumYears(e.target.value)} id="standard-basic" label="number" variant="standard" />
          <Button onClick={handelYearNum}>חפש</Button>
        </div>
      )}
    </div>
      
    </div>
  )
}

export default GraphByNumYears
