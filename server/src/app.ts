import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import cors from "cors";
import http from "http";

import "dotenv/config";
import { getDeadliestRegionsByOrganization, getIncidentsInYearRange, getListAttackTypeByTheMostCasualties, getOganizationsWithTheMostIncidentByRegion, getRecentYearsData, getRegionWithTheHighestAverageCasualties, getTerroristGroupWithTheMostCasualties, getTop5OrganizationsWithTheMostIncidentByRegion, getUniceIncidentInEveryMonthInYear, seed } from "./service/terror.service";

const PORT = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});
// seed() 
// getListAttackTypeByTheMostCasualties() 
// getRegionWithTheHighestAverageCasualties()
// getTerroristGroupWithTheMostCasualties(")
// getUniceIncidentInEveryMonthInYear(1970)
// getIncidentsInYearRange(2010,2020)
// getRecentYearsData(10)
// getTop5OrganizationsWithTheMostIncidentByRegion("East Asia")
// getOganizationsWithTheMostIncidentByRegion("East Asia")
// getDeadliestRegionsByOrganization("Unknown")
server.listen(PORT, () =>
  console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`)
);


