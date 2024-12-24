import { model, Schema } from "mongoose";
export interface Terror {
  iyear: number;
  imonth: number;
  region_txt: string;
  attacktype1_txt: string;
  gname: string;
  nkill: number;
  nwound: number;
  city: string;
  country_txt: string;
  summary: string;
  latitube: number;
  longitude: number;
}
const terrorSchema = new Schema({
  iyear: {
    type: Number,
    index: true,
  },
  imonth: {
    type: Number,
  },
  region_txt: {
    type: String,
    index: true,
  },

  attacktype1_txt: {
    type: String,
  },
  gname: {
    type: String,
    index: true,
  },
  nkill: {
    type: Number,
  },
  nwound: {
    type: Number,
  },
  city: {
    type: String,
    index: true,
  },
  country_txt: {
    type: String,
  },
  summary: {
    type: String,
    index: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

terrorSchema.index({ gname: 1 });

terrorSchema.index({ nkill: 1, nwound: 1 });
terrorSchema.index({ city: 1, gname: 1 });
export const terrorModel = model("terror", terrorSchema);
