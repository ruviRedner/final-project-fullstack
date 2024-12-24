import { Terror, terrorModel } from "../models/terrorModel";
import { handleBadRequest } from "../utils/ErrorHandle";

export const createNewEvent = async (newEvent: Terror) => {
  try {
    const {
      iyear,
      imonth,
      region_txt,
      country_txt,
      city,
      nwound,
      nkill,
      gname,
      attacktype1_txt,
      summary,
      longitude,
      latitube,
    } = newEvent;
    if (
      !summary ||
      !country_txt ||
      !city ||
      !nkill ||
      !gname ||
      !attacktype1_txt ||
      !longitude ||
      !latitube ||
      !region_txt ||
      !imonth ||
      !iyear ||
      !nwound
    ) {
      throw new Error("Invalid data format");
    }
    const data = await terrorModel.create(newEvent);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    if (!id) {
      throw new Error("ID is requierd");
    }
    const findId = await terrorModel.findByIdAndDelete(id);

    if (!findId) {
      throw new Error("id not found");
    }

    return { message: "Event deleted successfully" };
  } catch (error) {
    throw new Error((error as Error).message);
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
    throw new Error((error as Error).message);
  }
};

export const getOrgNames = async () => {
  try {
    const data = await terrorModel.distinct("gname");

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
