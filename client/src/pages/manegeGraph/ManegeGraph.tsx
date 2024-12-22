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
  return (
    <div>
      <h1>ניהול גרפים</h1>
      <div className="btns">
        <Button variant="contained" onClick={handelToAttack}>
          כמות נפגעים לפי תקיפות
        </Button>
        <Button onClick={handelYear} variant="contained">כמות תקריות לפי שנים</Button>
        <Button onClick={handelRange} variant="contained">כמות תקריות בטווח שנים</Button>
        <Button variant="contained">כמות תקריות במספר שנים אחורה</Button>
        <Button variant="contained">
          כמות תקריות בחמשת ארגוני טרור הבולטים לפי אזור
        </Button>
        <Button variant="contained">כמות תקריות מהגדול לקטן לכל האזורים</Button>
        <Button variant="contained">
          כמות תקריות לפי שנים על ידי בחירת ארגון
        </Button>
        <Button variant="contained">
          כמות תקריות לפי ארגונים על ידי בחירת שנה
        </Button>
      </div>
    </div>
  );
};

export default ManegeGraph;
