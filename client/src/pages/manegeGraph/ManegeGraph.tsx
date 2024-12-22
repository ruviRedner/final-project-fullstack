import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import "./manegeGraph.css"

const ManegeGraph: React.FC = () => {
  const navigate = useNavigate();
  const handelToAttack = () => {
    navigate("/graph");
  };
  const handelYear = () => {
    navigate("/year");
  };
  const handelRange = () => {
    navigate("/year-range");
  };
  const handelYearNum = () => {
    navigate("/year-number");
  };
  const handeltheTop = () => {
    navigate("/region-top");
  };
  const handelOrg = () => {
    navigate("/year-org");
  };
  return (
    <div>
      <h1>ניהול גרפים</h1>
      <div className="btns">
        <Button variant="contained" onClick={handelToAttack}>
          כמות נפגעים לפי תקיפות
        </Button>
        <Button onClick={handelYear} variant="contained">כמות תקריות לפי שנים</Button>
        <Button onClick={handelRange} variant="contained">כמות תקריות בטווח שנים</Button>
        <Button onClick={handelYearNum} variant="contained">כמות תקריות במספר שנים אחורה</Button>
        
        <Button onClick={handeltheTop} variant="contained">הארגונים הכי בולטים לפי אזור</Button>
        <Button onClick={handelOrg} variant="contained">
          כמות תקריות לפי שנים על ידי בחירת ארגון
        </Button>
      </div>
    </div>
  );
};

export default ManegeGraph;
