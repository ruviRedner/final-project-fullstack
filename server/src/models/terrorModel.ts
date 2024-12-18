import { Schema } from "mongoose";

const terrorSchema = new Schema({
    iyear:{
        type:Number,
        required:true
    },
    imonth:{
        type:Number,
        required:true
    },
    region_txt:{
        type:String,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    


})