import React, { FormEvent, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { InputList } from "../../types/ListInput";
import MapForCreateAndUpdate from "../maps/MapForCreateAndUpdate";
import { socket } from "../../App";
import { TerrorResponce } from "../../types/responce";
type State = {
  [key: string]: number | string;
};
type Terror = State & {
  latitube: number;
  longitude: number;
};
interface Props {
  actionType: "create" | "update" | "delete";
  buttonLabel: string;
  dialogTitle: string;
}

const Crud: React.FC<Props> = ({ actionType, buttonLabel, dialogTitle }) => {
  const [popupSeverity, setPopupSeverity] = useState<"success" | "error">(
    "success"
  );
  const [popupMessage, setPopupMessage] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [lat, setLatitude] = useState("");
  const [lonitude, setLongitude] = useState("");
  const [state, setState] = useState<{ [key: string]: number | string }>({});
  const [id, setId] = useState("");
  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const handleSunmit = (e: FormEvent) => {
    e.preventDefault();
    if (actionType === "create") {
      // create new event
      const longitude = Number(lonitude);
      const latitube = Number(lat);
      const data: Terror = {
        ...state,
        latitube,
        longitude,
      };
      socket.emit("newTeror", data, (res: TerrorResponce) => {
        if (res.success) {
          setPopupMessage(`${res.message}`);
          setPopupSeverity("success");
        } else {
          setPopupMessage(`${res.message}`);
          setPopupSeverity("error");
        }
        setPopupOpen(true);
      });
    } else if (actionType === "update") {
      // update existing event
      const longitude = Number(lonitude);
      const latitube = Number(lat);
      const update: Terror = {
        latitube,
        longitude,
        ...state,
      };
      socket.emit("update", id, update, (res: TerrorResponce) => {
        if (res.success) {
          setPopupMessage(`${res.message}`);
          setPopupSeverity("success");
        } else {
          setPopupMessage(`${res.message}`);
          setPopupSeverity("error");
        }
        setPopupOpen(true);
      });
    } else if (actionType === "delete") {
      // delete event
      socket.emit("delete", id, (res: TerrorResponce) => {
        if (res.success) {
          setPopupMessage(`${res.message}`);
          setPopupSeverity("success");
        } else {
          setPopupMessage(`${res.message}`);
          setPopupSeverity("error");
        }
        setPopupOpen(true);
      });
    }
    setOpen(false);
    setLatitude("");
    setLongitude("");
    setState({});
    setId("");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeState = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };
  const handleMapClick = (lat: number, lng: number) => {
    setLatitude(lat.toFixed(6));
    setLongitude(lng.toFixed(6));
  };

  return (
    <div style={{ zIndex: 1000 }}>
      <Button variant="contained" onClick={handleClickOpen} fullWidth>
        {buttonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSunmit}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            {(actionType === "update" || actionType === "delete") && (
              <TextField
                autoFocus
                margin="dense"
                id="id"
                name="id"
                label="ID"
                type="text"
                fullWidth
                variant="standard"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            )}
            {(actionType === "create" || actionType === "update") && (
              <>
                {InputList.map((inp) => (
                  <div
                    key={inp.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    {inp.id === "iyear" ||
                    inp.id === "imonth" ||
                    inp.id === "nwound" ||
                    inp.id === "nkill" ? (
                      <TextField
                        id="standard-basic"
                        label={inp.display}
                        variant="standard"
                        type="number"
                        value={state[inp.id]}
                        onChange={(e) =>
                          handleChangeState(inp.id, e.target.value)
                        }
                      />
                    ) : (
                      <TextField
                        onChange={(e) =>
                          handleChangeState(inp.id, e.target.value)
                        }
                        id="standard-basic"
                        label={inp.display}
                        variant="standard"
                        type="text"
                        value={state[inp.id]}
                      />
                    )}
                  </div>
                ))}

                <TextField
                  label="latitube"
                  type="text"
                  onChange={(e) => setLatitude(e.target.value)}
                  value={lat}
                />
                <TextField
                  label="lontitube"
                  type="text"
                  onChange={(e) => setLongitude(e.target.value)}
                  value={lonitude}
                />

                <MapForCreateAndUpdate onMapClick={handleMapClick} />
              </>
            )}
            {actionType === "delete" && <p>האם אתה בטוח שברצונך למחוק?</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              {actionType === "create" && "יצירה"}
              {actionType === "update" && "עדכון"}
              {actionType === "delete" && "מחיקה"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={popupOpen}
        autoHideDuration={3000}
        onClose={handleClosePopup}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClosePopup}
          sx={{ width: "100%" }}
          severity={popupSeverity}
        >
          {popupMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Crud;
