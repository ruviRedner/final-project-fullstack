import { Router } from "express";
import {
  fetchIncidentOfAllOrg,
  fetchIncidentOfTheMostDhed,
  fetchIncidentTop5,
  getOrganizationsOrIncidents,
} from "../controllers/terror.controller";

const orgRouter = Router();

orgRouter.get("top-groups5/:region", fetchIncidentTop5);
orgRouter.get("top-groups/:region", fetchIncidentOfAllOrg);
orgRouter.get(
  "deadliest-regions/:organizationName",
  fetchIncidentOfTheMostDhed
);
orgRouter.get(
  "groups-by-year/:year/:organizationName",
  getOrganizationsOrIncidents
);

export default orgRouter;
