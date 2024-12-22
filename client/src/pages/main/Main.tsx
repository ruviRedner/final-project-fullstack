import React from "react";
import Button from '@mui/material/Button';

import "./main.css";
import GraphAnimation from "../../components/graphs/GraphAnimation";
import { useNavigate } from "react-router-dom";


const Main: React.FC = () => {
  const navigate= useNavigate()
  const handelGraph = () => {
      navigate("/graph-manege")
  }
  return (
    <>
      <div className="main">
        <h1>ברוכים הבאים לאתר ניהול אירועי טרור עולמיים על ידי מפות וגרפים</h1>
        <GraphAnimation />
        <div className="btn">
        <Button variant="contained">הצג מפה </Button>
        <Button onClick={handelGraph} variant="contained">הצג גרף</Button>
        </div>
      </div>
    </>
  );
};

export default Main;
