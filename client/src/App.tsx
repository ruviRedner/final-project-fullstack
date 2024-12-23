import React from "react";
import { io } from "socket.io-client";
import Main from "./pages/main/Main";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router";
import GraphByAttack from "./pages/graph/graphByAttack/GraphByAttack";
import ManegeGraph from "./pages/manegeGraph/ManegeGraph";
import GraphByYear from "./pages/graph/GraphByYear/GraphByYearAndManth";
import GrhaphByRange from "./pages/graph/graphRangeYear/GrhaphByRange";
import GraphByNumYears from "./pages/graph/graphByNumYears/GraphByNumYears";
import GraphForIncidentByRegion from "./pages/graph/graphForIncidentByRegion/GraphForIncidentByRegion";
import GraphByOrg from "./pages/graph/graphByOrg/GraphByOrg";
import MapAve from "./pages/maps/MapAve";
// import { TerrorResponce } from './types/responce';
// import { Terror } from './types/newTerror';
export const socket = io("http://localhost:9000");
const App: React.FC = () => {


  // const data:Terror = {
  //   imonth:6,
  //   iyear:2021,
  //   region_txt:"Middle East & North Africa",
  //   latitude:32.4279,
  //   longitude:53.6880,
  //   attacktype1_txt:"Bombing/Explosion",
  //   gname:"Hamas",
  //   nkill:1,
  //   nwound:1,
  //   city:"Abu Dhabi",
  //   country_txt:"United Arab Emirates"
  // }
  // const id = "67641699ee80bd40a9d2c835"
  // socket.emit("newTeror",data,(res:TerrorResponce)=> {
  //   console.log(res)
  // })
  // socket.emit("delete",id,(res:TerrorResponce) => {
  //     console.log(res);

  // })
  // const id = "67641699ee80bd40a9d2c836"

  // const update= {
  //   imonth:7,
  //   iyear:2021,
  //   region_txt:"Middle East & North Africa",
  //   latitude:32.4279,
  //   longitude:53.6880,
  //   attacktype1_txt:"Bombing/Explosion",
  //   gname:"Hamas",
  //   nkill:100000,
  //   nwound:2,
  //   city:"Abu Dhabi",
  //   country_txt:"United Arab Emirates"
  // }
  // const data = {
  //   id,
  //   update,
  // }
  // socket.emit("update", data,(res:TerrorResponce)=> {
  //   console.log(res)
  // })
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/graph" element={<GraphByAttack />} />
          <Route path="/year" element={<GraphByYear />} />
          <Route path="/year-range" element={<GrhaphByRange />} />
          <Route path="/year-number" element={<GraphByNumYears />} />
          <Route path="/region-top" element={<GraphForIncidentByRegion />} />
          <Route path="/year-org" element={<GraphByOrg />} />
          <Route path="/map-1" element={<MapAve />} />
          <Route path="/graph-manege" element={<ManegeGraph />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
