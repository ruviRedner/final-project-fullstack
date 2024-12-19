import React from 'react'
import { io } from 'socket.io-client';
// import { TerrorResponce } from './types/responce';
// import { Terror } from './types/newTerror';
export const socket = io("http://localhost:9000");
const App:React.FC = () => {
  // const data:Terror = {
  //   imonth:6,
  //   iyear:2021,
  //   region_txt:"Middle East & North Africa",
  //   latitude:32.4279,
  //   longitude:53.6880,
  //   attacktype1_txt:"Bombing/Explosion",
  //   gname:"Hamas",
  //   nkill:1,
  //   nwound:1,
  //   city:"Abu Dhabi",
  //   country_txt:"United Arab Emirates"
  // }
  // const id = "67641699ee80bd40a9d2c835"
  // socket.emit("newTeror",data,(res:TerrorResponce)=> {
  //   console.log(res)
  // })
  // socket.emit("delete",id,(res:TerrorResponce) => {
  //     console.log(res);
      
  // })
  return (
    <div>
      
    </div>
  )
}

export default App
