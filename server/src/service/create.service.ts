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
