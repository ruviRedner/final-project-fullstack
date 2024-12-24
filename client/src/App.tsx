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
export const socket = io("https://final-project-fullstack-1-7k5w.onrender.com");
const App: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default App;
