import { Socket } from "socket.io";
import { io } from "../app";
import { Terror } from "../models/terrorModel";
import { createNewEvent, deleteEvent } from "../service/create.service";

export const handelShackConnection = (client: Socket) => {
  console.log(`[socket.io]New Connection ${client.id} `);
  client.on("disconnect", () => {
    console.log("Bay Bay user");
  });
  client.on("newTeror", async (data: Terror, callback) => {
    try {
      const newTerror = await createNewEvent(data);
      console.log(newTerror);
      
      callback({ success: true, message: "Event created successfully", result: newTerror });
    } catch (error) {
      callback({ success: false, error: (error as Error).message });
    }
  });
  client.on("delete",async (data:string,callback) => {
    try {
      const del = await deleteEvent(data);
      callback({success:true, message:del})
      
    } catch (error) {
      callback({success:false, message:"event deleted went wrong"}) 
      
    }
   
  })
};
