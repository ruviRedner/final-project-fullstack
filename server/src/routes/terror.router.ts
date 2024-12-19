import { Router } from "express";
import {
  fetchByType,
  fetchCasultysByRangeYear,
  fetchCasultysByRecentYear,
  fetchCasultysByType,
  fetchCasultysByYear,
} from "../controllers/terror.controller";

const terrorRouter = Router();

terrorRouter.get("deadliest-attack-types/", fetchByType);

terrorRouter.get("highest-casualty-regions/:region", fetchCasultysByType);

terrorRouter.get("incident-trends/:year", fetchCasultysByYear);
terrorRouter.get(
  "incident-trends/:startYear/:endYear",
  fetchCasultysByRangeYear
);
terrorRouter.get("incident-trends/:range", fetchCasultysByRecentYear);

export default terrorRouter;
