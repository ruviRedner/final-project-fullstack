import React from "react";
import { io } from "socket.io-client";
import Main from "./pages/main/Main";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router";
import GraphByAttack from "./pages/graph/graphByAttack/GraphByAttack";
import ManegeGraph from "./pages/manegeGraph/ManegeGraph";
import GraphByYear from "./pages/graph/GraphByYear/GraphByYearAndManth";
// import { TerrorResponce } from './types/responce';
// import { Terror } from './types/newTerror';
export const socket = io("http://localhost:9000");
const App: React.FC = () => {
  const terrorEvents = [
    {
      latitude: 31.7683,
      longitude: 35.2137,
      title: "אירוע טרור בירושלים",
      description: "פיגוע עם מספר נפגעים.",
    },
    {
      latitude: 40.7128,
      longitude: -74.006,
      title: "פיגוע בניו יורק",
      description: "אירוע דריסה גדול במרכז העיר.",
    },
    {
      latitude: 51.5074,
      longitude: -0.1278,
      title: "פיגוע בלונדון",
      description: "מתקפה על גשר לונדון.",
    },
    {
      latitude: 48.8566,
      longitude: 2.3522,
      title: "פיגוע בפריז",
      description: "תקיפת ירי במסעדה במרכז העיר.",
    },
    {
      latitude: 34.0522,
      longitude: -118.2437,
      title: "פיגוע בלוס אנג'לס",
      description: "מתקפת ירי במרכז מסחרי.",
    },
    {
      latitude: 19.076,
      longitude: 72.8777,
      title: "פיגוע במומבאי",
      description: "מתקפת טרור במלון יוקרה.",
    },
    {
      latitude: 35.6895,
      longitude: 139.6917,
      title: "פיגוע בטוקיו",
      description: "פיצוץ בתחנת רכבת מרכזית.",
    },
    {
      latitude: -33.8688,
      longitude: 151.2093,
      title: "פיגוע בסידני",
      description: "תקיפה חמושה בבית קפה.",
    },
    {
      latitude: -1.2921,
      longitude: 36.8219,
      title: "פיגוע בניירובי",
      description: "תקיפת ירי במרכז קניות.",
    },
    {
      latitude: -22.9068,
      longitude: -43.1729,
      title: "פיגוע בריו דה ז'ניירו",
      description: "פיצוץ בתחנת אוטובוס הומה אדם.",
    },
    {
      latitude: 37.7749,
      longitude: -122.4194,
      title: "פיגוע בסן פרנסיסקו",
      description: "תקיפת ירי במרכז כנסים.",
    },
    {
      latitude: 41.9028,
      longitude: 12.4964,
      title: "פיגוע ברומא",
      description: "פיצוץ באוטובוס תיירים ליד הקולוסיאום.",
    },
    {
      latitude: 55.7558,
      longitude: 37.6173,
      title: "פיגוע במוסקבה",
      description: "תקיפת ירי בתחנת מטרו עמוסה.",
    },
    {
      latitude: 39.9042,
      longitude: 116.4074,
      title: "פיגוע בבייג'ינג",
      description: "פיצוץ במתחם משרדים ממשלתי.",
    },
    {
      latitude: -26.2041,
      longitude: 28.0473,
      title: "פיגוע ביוהנסבורג",
      description: "פיצוץ במרכז מסחרי הומה אדם.",
    },
    {
      latitude: 25.276987,
      longitude: 55.296249,
      title: "פיגוע בדובאי",
      description: "תקיפה במלון יוקרה במרינה.",
    },
    {
      latitude: 21.0285,
      longitude: 105.8542,
      title: "פיגוע בהאנוי",
      description: "פיצוץ במתחם היסטורי בעיר העתיקה.",
    },
    {
      latitude: 41.0082,
      longitude: 28.9784,
      title: "פיגוע באיסטנבול",
      description: "פיצוץ ברחוב הקניות איסטיקלל.",
    },
    {
      latitude: -34.6037,
      longitude: -58.3816,
      title: "פיגוע בבואנוס איירס",
      description: "פיצוץ במרכז תרבות יהודי.",
    },
    {
      latitude: 59.3293,
      longitude: 18.0686,
      title: "פיגוע בסטוקהולם",
      description: "פיגוע דריסה באזור קניות מרכזי.",
    },
  ];

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
  // const id = "67641699ee80bd40a9d2c836"

  // const update= {
  //   imonth:7,
  //   iyear:2021,
  //   region_txt:"Middle East & North Africa",
  //   latitude:32.4279,
  //   longitude:53.6880,
  //   attacktype1_txt:"Bombing/Explosion",
  //   gname:"Hamas",
  //   nkill:100000,
  //   nwound:2,
  //   city:"Abu Dhabi",
  //   country_txt:"United Arab Emirates"
  // }
  // const data = {
  //   id,
  //   update,
  // }
  // socket.emit("update", data,(res:TerrorResponce)=> {
  //   console.log(res)
  // })
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/graph" element={<GraphByAttack />} />
          <Route path="/year" element={<GraphByYear />} />
          <Route path="/graph-manege" element={<ManegeGraph />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
