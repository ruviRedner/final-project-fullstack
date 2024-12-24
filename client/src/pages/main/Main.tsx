import React from "react";
import Button from "@mui/material/Button";

import "./main.css";
import GraphAnimation from "../../components/graphs/GraphAnimation";
import { useNavigate } from "react-router-dom";
import MapsAnimation from "../../components/maps/MapsAnimation";
import Crud from "../../components/crud/Crud";
import { Box } from "@mui/material";

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6.5,
              maxWidth: "200px", 
              margin: "0 auto",
              marginTop: "20px",
              marginBottom: "20px"
            }}
          >
            
              <Button onClick={handelGraph} variant="contained" fullWidth>
                הצג גרף
              </Button>
              <Button onClick={handelMap} variant="contained"fullWidth>
                הצג מפה
              </Button>
              <Crud
                actionType="create"
                buttonLabel="יצירת אירוע"
                dialogTitle="יצירת אירוע חדש"
              />
              <Crud
                actionType="update"
                buttonLabel="עדכון אירוע"
                dialogTitle="עדכון אירוע"
              />
              <Crud
                actionType="delete"
                buttonLabel="מחיקת אירוע"
                dialogTitle="מחיקת אירוע"
              />
          </Box>
        </div>
      </div>
    </>
  );
};

export default Main;
