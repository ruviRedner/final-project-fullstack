import { model, Schema } from "mongoose";
export interface Terror{
  iyear: number;
  imonth: number;
  region_txt: string;
  latitude: number;
  longitude: number;
  attacktype1_txt: string;
  gname: string;
  nkill: number;
  nwound: number;
  city:string;
  country_txt: string;

}
const terrorSchema = new Schema({
  iyear: {
    type: Number,
    
  },
  imonth: {
    type: Number,
    
  },
  region_txt: {
    type: String,
    
  },
  latitude: {
    type: Number,
  
  },
  longitude: {
    type: Number,
    
  },
  attacktype1_txt: {
    type: String,
    
  },
  gname: {
    type: String,
    
  },
  nkill: {
    type: Number,
    
  },
  nwound: {
    type: Number,
    
  },
  city:{
    type: String,
  },
  country_txt:{ 
    type: String,
  }
});


export const terrorModel = model("terror",terrorSchema)

