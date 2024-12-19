import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import cors from "cors";
import http from "http";

import "dotenv/config";
import { getDeadliestRegionsByOrganization, getIncidentsInYearRange, getListAttackTypeByTheMostCasualties, getOganizationsWithTheMostIncidentByRegion, getRecentYearsData, getRegionWithTheHighestAverageCasualties, getTerroristGroupWithTheMostCasualties, getTop5OrganizationsWithTheMostIncidentByRegion, getUniceIncidentInEveryMonthInYear, seed } from "./service/terror.service";
import terrorRouter from "./routes/terror.router";
import orgRouter from "./routes/org.router";
import CreateRouter from "./routes/create.router";

const PORT = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());
app.use("/api/analysis/",terrorRouter)
app.use("api/relationships/",orgRouter)
app.use("/api/postTerror",CreateRouter)

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


