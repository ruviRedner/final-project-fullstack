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
  TextField,
} from "@mui/material";
import { regions } from "../../types/typeFor5";
import {
  orgNames,
  TypeFor5InAllRegion,
  TypeFor5PerRegion,
  TypeForCasualtiesByOrgName,
  TypeForOrg,
  TypeSearchText,
} from "../../types/mapTypes";

const MapAve: React.FC = () => {
  const [events, setEvents] = useState<
    {
      id?: string;
      latitude: number;
      longitude: number;
      popupContent: React.ReactNode;
    }[]
  >([]);
  const [region, setRegion] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isData, setIsData] = useState(true);
  const [text, setText] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleChangeOrgName = (event: SelectChangeEvent) => {
    setOrgName(event.target.value);
  };
  const handelRegion = async () => {
    socket.emit("get1MapByRegion", region, (res: TerrorResponce) => {
      if (res.data.length <= 0) {
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
      if (res.data.length <= 0) {
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
  
      if (res.data.length <= 0) {
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
                <h4>ה-5 ארגונים המובילים:</h4>
                <ul>
                  {regionData.topOrganizations.map(
                    (org: { name: string; incident: number }, index: number) => (
                      <li key={index}>
                        {org.name} - {org.incident} אירועים
                      </li>
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
      if (res.data.length <= 0) {
        setIsData(false);
        return;
      }

      if (res && Array.isArray(res.data)) {
        setIsData(true);
        const mappedEvents = res.data.map(
          (event: TypeForCasualtiesByOrgName, index: number) => ({
            latitude: event.latitude || 0,
            longitude: event.longitude || 0,
            popupContent: (
              <div>
                <h4>{event.city || `Event #${index + 1}`}</h4>
                <p>כמות נפגעים: {event.TotalCasualties || "Unknown"}</p>
              </div>
            ),
          })
        );
        setEvents(mappedEvents);
        setRegion("");
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  };
  const handleText = async () => {
    socket.emit("searchText", text, (res: TerrorResponce) => {
      if (res.data.length <= 0) {
        setIsData(false);
        return;
      }
      if (res && Array.isArray(res.data)) {
        setIsData(true);
        const mappedEvents = res.data.map(
          (event: TypeSearchText, index: number) => ({
            latitude: event.latitude || 0,
            longitude: event.longitude || 0,
            popupContent: (
              <div>
                <h4>אזור:{event.region_txt || `Event #${index + 1}`}</h4>
                <p> עיר: {event.city || "Unknown"}</p>
                <p>מדינה: {event.country_txt || "Unknown"}</p>
                <p>שם הארגון:{event.gname || "Unknown"}</p>
                <p>סוג התקיפה:{event.attacktype1_txt || "Unknown"}</p>
                <p>בשנת:{event.iyear || "Unknown"}</p>
                <p>בחודש:{event.imonth || "Unknown"}</p>
              </div>
            ),
          })
        );
        setEvents(mappedEvents);
        setText("");
      } else {
        console.error("Invalid response data:", res);
        setEvents([]);
        setIsData(false);
      }
    });
  };

  useEffect(() => {
    socket.emit("get1Map", (res: TerrorResponce) => {
      if (res.data.length <= 0) {
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
  useEffect(() => {
    socket.on("change-data", (data: { action: string; data: any }) => {
      setEvents((prevEvents) => {
        if (data.action === "create") {
          return [
            ...prevEvents,
            {
              latitude: data.data.latitude || 0,
              longitude: data.data.longitude || 0,
              popupContent: (
                <div>
                  <h4>{data.data.region}</h4>
                  <p>ממוצע נפגעים: {data.data.averageCasualties}</p>
                </div>
              ),
            },
          ];
        } else if (data.action === "update") {
          return prevEvents.map((event) =>
            event.id === data.data.id
              ? {
                  ...event,
                  latitude: data.data.latitude || 0,
                  longitude: data.data.longitude || 0,
                  popupContent: (
                    <div>
                      <h4>{data.data.region}</h4>
                      <p>ממוצע נפגעים: {data.data.averageCasualties}</p>
                    </div>
                  ),
                }
              : event
          );
        } else if (data.action === "delete") {
          return prevEvents.filter((event) => event.id !== data.data.id);
        }
        return prevEvents;
      });
    });

    return () => {
      socket.off("change-data");
    };
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f9f9f9",
          display: "flex",
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

        <h5>אנא בחר ארגון</h5>
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
        <h5>הקלד טקסט...</h5>
        <TextField
          value={text}
          onChange={handleChangeInput}
          id="standard-basic"
          label="Year"
          variant="standard"
        />
        <Button onClick={handleText}>חפש</Button>
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
