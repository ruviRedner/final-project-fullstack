import { Terror, terrorModel } from "../models/terrorModel";
import { handleBadRequest } from "../utils/ErrorHandle";

export const createNewEvent = async (newEvent: Terror) => {
  try {
    const {
      country_txt,
      city,
      nwound,
      nkill,
      gname,
      attacktype1_txt,
      longitude,
      latitude,
      region_txt,
      imonth,
      iyear,
    } = newEvent;
    if (
      !country_txt ||
      !city ||
      !nkill ||
      !gname ||
      !attacktype1_txt ||
      !longitude ||
      !latitude ||
      !region_txt ||
      !imonth ||
      !iyear ||
      !nwound
    ) {
      throw new Error("Invalid data");
    }
    const data = await terrorModel.create(newEvent)
    return data;
  } catch (error) {
    return handleBadRequest("Invalid data", error);
  }
};

export const deleteEvent = async (id: string)=> {
  try {
    if(!id) {
      throw new Error("ID is requierd");
    }
    const findId = terrorModel.findById(id);
    if(!findId) {
      throw new Error("ID not found");
    }
    await terrorModel.deleteOne(findId);
    return {message: "Event deleted successfully"};
    
  } catch (error) {
    return handleBadRequest("Failed to delete event", error);
    
  }
}
export const updataEvent= async (id:string,update:string) => {
  try {
   
    
  } catch (error) {
    return handleBadRequest("Bad Request",error)
    
  }
}
