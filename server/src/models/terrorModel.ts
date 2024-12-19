import { model, Schema } from "mongoose";

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

