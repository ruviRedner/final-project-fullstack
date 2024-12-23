import React, { useEffect, useState } from "react";
import { socket } from "../../App";
import { TerrorResponce } from "../../types/responce";
import TerrorEventMap from "../../components/maps/Map";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { regions } from "../../types/typeFor5";
import {
  orgNames,
  TypeFor5InAllRegion,
  TypeFor5PerRegion,
  TypeForCasualtiesByOrgName,
  TypeForOrg,
} from "../../types/mapTypes";

const MapAve: React.FC = () => {
  const [events, setEvents] = useState<
    { latitude: number; longitude: number; popupContent: React.ReactNode }[]
  >([]);
  const [region, setRegion] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isData, setIsData] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };
  const handleChangeOrgName = (event: SelectChangeEvent) => {
    setOrgName(event.target.value);
  };
  const handelRegion = async () => {
    socket.emit("get1MapByRegion", region, (res: TerrorResponce) => {
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }
      if (res && Array.isArray(res.data)) {
        setIsData(true);
        const mappedEvents = res.data.map((event: any, index: number) => ({
          latitude: event.latitude || 0,
          longitude: event.longitude || 0,
          popupContent: (
            <div>
              <h4>{event.region || `Event #${index + 1}`}</h4>
              <p>ממוצע נפגעים: {event.averageCasualties || "Unknown"}</p>
            </div>
          ),
        }));
        setEvents(mappedEvents);
        setRegion("");
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  };
  const handelTop5ByRegion = async () => {
    socket.emit("get5", region, (res: TerrorResponce) => {
      console.log(region);
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }

      if (res && Array.isArray(res.data)) {
        setIsData(true);
        const mappedEvents = res.data.map((event: TypeFor5PerRegion) => ({
          latitude: event.latitube || 0,
          longitude: event.longitube || 0,
          popupContent: (
            <div>
              <h3>הארגונים המובילים {region}</h3>
              <ul>
                {res.data.map((org: TypeForOrg, index: number) => (
                  <li key={index}>
                    <h4>{org.orgName || `Organization #${index + 1}`}</h4>
                    <p>אירועים: {org.incident || "Unknown"}</p>
                  </li>
                ))}
              </ul>
            </div>
          ),
        }));

        setEvents(mappedEvents);
        setRegion("");
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  };
  const handelTop5ForAllRegion = async () => {
    socket.emit("get5TopForAllRegion", (res: TerrorResponce) => {
      console.log(res.data);
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }

      if (res && Array.isArray(res.data)) {
        setIsData(true);
        const mappedEvents = res.data.map(
          (regionData: TypeFor5InAllRegion) => ({
            latitude: regionData.latitude || 0,
            longitude: regionData.longitude || 0,
            popupContent: (
              <div>
                <h3>{regionData.region}</h3>
                <h4>ה5 ארגונים המובילים:</h4>
                <ul>
                  {regionData.topOrganizations.map(
                    (org: string, index: number) => (
                      <li key={index}>{org}</li>
                    )
                  )}
                </ul>
              </div>
            ),
          })
        );

        setEvents(mappedEvents);
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  };
  const handelOrgName = async () => {
    socket.emit("get1MapByOrgName", orgName, (res: TerrorResponce) => {
      console.log(res.data);
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }
      
      if (res && Array.isArray(res.data)) {
        setIsData(true);
        const mappedEvents = res.data.map((event:TypeForCasualtiesByOrgName, index: number) => ({
          latitude: event.latitude || 0,
          longitude: event.longitude || 0,
          popupContent: (
            <div>
              <h4>{event.city || `Event #${index + 1}`}</h4>
              <p>כמות נפגעים: {event.TotalCasualties || "Unknown"}</p>
            </div>
          ), 
        }));
        setEvents(mappedEvents);
        setRegion("");
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  }

  useEffect(() => {
    socket.emit("get1Map", (res: TerrorResponce) => {
      if(res.data.length <= 0) {
        setIsData(false);
        return;
      }
      if (res && Array.isArray(res.data)) {
        const mappedEvents = res.data.map((event: any, index: number) => ({
          latitude: event.latitude || 0,
          longitude: event.longitude || 0,
          popupContent: (
            <div>
              <h4>{event.region || `Event #${index + 1}`}</h4>
              <p>ממוצע נפגעים: {event.averageCasualties || "Unknown"}</p>
            </div>
          ),
        }));
        setEvents(mappedEvents);
        setRegion("");
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  }, []);


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          gap:"5px",
          flexDirection: "column",
          justifyContent: "flex-start",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h5>אנא בחר אזור</h5>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="region-select-label">אזור</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            value={region}
            onChange={handleChange}
            label="אזור"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {regions.map((region, index) => (
              <MenuItem key={index} value={region.name}>
                {region.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handelRegion} style={{ marginTop: "10px" }}>
          קבל ממוצע נפגעים
        </Button>
        <Button onClick={handelTop5ByRegion} style={{ marginTop: "10px" }}>
          קבל 5 ארגונים המובילים באזור
        </Button>
        <Button onClick={handelTop5ForAllRegion} style={{ marginTop: "10px" }}>
          קבל 5 ארגונים המובילים בכל האזורים
        </Button>

        <h5>הקלד שם ארגון</h5>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="region-select-label">ארגון</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            value={orgName}
            onChange={handleChangeOrgName}
            label="ארגון"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {orgNames.map((org, index) => (
              <MenuItem key={index} value={org.name}>
                {org.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handelOrgName}>חפש</Button>
      </div>

      <div style={{ flex: 3 }}>
      {!isData && <h3>אין נתונים להצגה</h3>}
        {events.length > 0 ? (
          <TerrorEventMap height={"600px"} events={events} />
        ) : (
          <p>Loading events...</p>
        )}
      </div>
    </div>
  );
};

export default MapAve;
