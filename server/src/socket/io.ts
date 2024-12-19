import { Socket } from "socket.io";
import { io } from "../app";
import { Terror } from "../models/terrorModel";
import { createNewEvent } from "../service/create.service";

export const handelShackConnection = (client: Socket) => {
  console.log(`[socket.io]New Connection ${client.id} `);
  client.on("disconnect", () => {
    console.log("Bay Bay user");
  });
  client.on("newTeror", async (data: Terror, callback) => {
    try {
      const newTerror = await createNewEvent(data);
      callback({ message: "Event created successfully", result: newTerror });
    } catch (error) {
      callback({ success: false, error: (error as Error).message });
    }
  });
};
