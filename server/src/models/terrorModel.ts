import { model, Schema } from "mongoose";

const terrorSchema = new Schema({
  iyear: {
    type: Number,
    required: true,
  },
  imonth: {
    type: Number,
    required: true,
  },
  region_txt: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  attacktype1_txt: {
    type: String,
    required: true,
  },
  gname: {
    type: String,
    required: true,
  },
  nkill: {
    type: Number,
    required: true,
  },
  nwound: {
    type: Number,
    required: true,
  },
});


export const terrorModel = model("terror",terrorSchema)

