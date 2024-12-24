import { Request, Response } from "express";
import {
  getDeadliestRegionsWithOrWithoutCoordinates,
  getIncidentsInYearRange,
  getListAttackTypeByTheMostCasualties,
  getOganizationsWithTheMostIncidentByRegion,
  getRecentYearsData,
  getRegionWithTheHighestAverageCasualties,
  getTop5OrganizationsWithTheMostIncidentByRegion,
  getUniceIncidentInEveryMonthInYear,
} from "../service/terror.service";

export const fetchByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getListAttackTypeByTheMostCasualties();

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchCasultysByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getRegionWithTheHighestAverageCasualties(
      req.params.region
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchCasultysByYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getUniceIncidentInEveryMonthInYear(req.params.year);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const fetchCasultysByRangeYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getIncidentsInYearRange(
      req.params.startYear,
      req.params.endYear
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
export const fetchCasultysByRecentYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getRecentYearsData(req.params.range);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchIncidentTop5 = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getTop5OrganizationsWithTheMostIncidentByRegion(
      req.params.region
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchIncidentOfAllOrg = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getOganizationsWithTheMostIncidentByRegion(
      req.params.region
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const fetchIncidentOfTheMostDhed = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getDeadliestRegionsWithOrWithoutCoordinates(
      req.params.organizationName
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
