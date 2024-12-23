import React from "react";
import Button from "@mui/material/Button";

import "./main.css";
import GraphAnimation from "../../components/graphs/GraphAnimation";
import { useNavigate } from "react-router-dom";
import MapsAnimation from "../../components/maps/MapsAnimation";

const Main: React.FC = () => {
  const navigate = useNavigate();
  const handelGraph = () => {
    navigate("/graph-manege");
  };
  const handelMap = () => {
    navigate("/map-1");
  };
  return (
    <>
      <div className="main">
        <h1>ברוכים הבאים לאתר ניהול אירועי טרור עולמיים על ידי מפות וגרפים</h1>
        <div className="animation">
          <div className="gra">
            <GraphAnimation />
          </div>
          <div className="map">
            <MapsAnimation />
          </div>
          <div className="btn">
          <Button onClick={handelGraph} variant="contained">
            הצג גרף
          </Button>
          <Button onClick={handelMap} variant="contained">
            הצג מפה{" "}
          </Button>
        </div>
        </div>

        
      </div>
    </>
  );
};

export default Main;
