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
    const data = await terrorModel.create(newEvent);
    return data;
  } catch (error) {
    return handleBadRequest("Invalid data", error);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ID is requierd");
    }
    const findId = terrorModel.findById(id);
    if (!findId) {
      throw new Error("ID not found");
    }
    await terrorModel.deleteOne(findId);
    return { message: "Event deleted successfully" };
  } catch (error) {
    return handleBadRequest("Failed to delete event", error);
  }
};
export const updataEvent = async (id: string, update: Terror) => {
  try {
    if (!id) {
      throw new Error("ID is required");
    }
    const findId = await terrorModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    if (!findId) {
      throw new Error("ID not found");
    }
    return findId;
  } catch (error) {
    return handleBadRequest("Bad Request", error);
  }
};

export const getOrgNames = async () => {
  try {
    const data = await terrorModel.distinct("gname");
    console.log(data);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};
export const searchInText = async (str: string) => { 
  try {
    const regex = new RegExp(str, "i");
    const result = await terrorModel.find({ summary: regex }).limit(30);

    return result;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};
