import { Terror } from "../models/terrorModel"

export interface TerrorResponce{
    success:boolean
    message: string
    result:Terror
}