import { terrorModel } from "../models/terrorModel";
import { handleBadRequest } from "../utils/ErrorHandle";
import { getFileData } from "../utils/functionToUse";
import { cleanObject } from "../utils/clean";
import { PipelineStage } from "mongoose";
export type EventData = {
  eventid: number;
  iyear: number;
  imonth: number;
  city?: string;
  region_txt?: string;
  country_txt?: string;
  latitude?: number | null;
  longitude?: number | null;
  attacktype1_txt?: string;
  nkill?: number | null;
  nwound?: number | null;
};
export const seed = async () => {
  try {
    const data: EventData[] = await getFileData("globalterrorismdb_0718dist");
    const cleanedData = data.map((event: Record<string, any>) =>
      cleanObject(event)
    );
    console.log("clening successfuly");

    await terrorModel.insertMany(cleanedData);

    console.log("Seeding complete");
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getListAttackTypeByTheMostCasualties = async () => {
  try {
    const data = await terrorModel.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          amount: {
            $sum: {
              $add: ["$nwound", "$nkill"],
            },
          },
        },
      },
      { $sort: { amount: -1 } },
      {
        $project: {
          _id: 0,
          attackType: "$_id",
          totalCasualties: "$amount",
        },
      },
    ]);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getRegionWithTheHighestAverageCasualties = async (
  region = "all"
) => {
  try {
    const pipeline: PipelineStage[] = [];

    if (region !== "all") {
      pipeline.push({ $match: { region_txt: region } });
    }

    pipeline.push(
      {
        $group: {
          _id: "$region_txt",
          averageCasualties: {
            $avg: {
              $add: [{ $ifNull: ["$nwound", 0] }, { $ifNull: ["$nkill", 0] }],
            },
          },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $sort: { averageCasualties: -1 },
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          averageCasualties: 1,
          latitude: 1,
          longitude: 1,
        },
      }
    );

    const data = await terrorModel.aggregate(pipeline);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getTerroristGroupWithTheMostCasualties = async () => {
  try {
    const data = await terrorModel.aggregate([
      {
        $group: {
          _id: "$gname",
          amount: {
            $sum: {
              $add: ["$nwound", "$nkill"],
            },
          },
        },
      },
      { $sort: { amount: -1 } },
    ]);
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getUniceIncidentInEveryMonthInYear = async (year: string) => {
  try {
    const yearNum = parseInt(year);
    const data = await terrorModel.aggregate([
      {
        $match: { iyear: yearNum, imonth: { $exists: true } },
      },
      {
        $group: {
          _id: { month: "$imonth", year: "$iyear", orgName: "$gname" },
          incident: {
            $count: {},
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,

          month: "$_id.month",
          incident: "$incident",
        },
      },
    ]);
    return data;
  } catch (err) {
    return handleBadRequest("Bad request", err);
  }
};
export const getIncidentsInYearRange = async (
  startYear: string,
  endYear: string
) => {
  try {
    const startYearNum = parseInt(startYear);
    const endYearNum = parseInt(endYear);
    const data = await terrorModel.aggregate([
      {
        $match: {
          iyear: { $gte: startYearNum, $lte: endYearNum },
          imonth: { $exists: true },
        },
      },
      {
        $group: {
          _id: { year: "$iyear" },
          incident: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          incident: "$incident",
        },
      },
    ]);
    return data;
  } catch (err) {
    return handleBadRequest("Bad request", err);
  }
};
export const getRecentYearsData = async (range: string) => {
  try {
    const rangeNum = parseInt(range);
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - rangeNum;

    const data = await terrorModel.aggregate([
      {
        $match: {
          iyear: { $gte: startYear, $lte: currentYear },
          imonth: { $exists: true },
        },
      },
      {
        $group: {
          _id: { year: "$iyear" },
          incident: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          incident: "$incident",
        },
      },
    ]);

    return data;
  } catch (err) {
    return handleBadRequest("Bad request", err);
  }
};
export const getTop5OrganizationsWithTheMostIncidentByRegion = async (
  region: string
) => {
  try {
    const pipeline: PipelineStage[] = [
      { $match: { region_txt: region } },
      { $match: { gname: { $ne: "Unknown" } } },
      {
        $group: {
          _id: {
            name: "$gname",
            latitube: "$latitude",
            longitube: "$longitude",
          },
          incident: { $sum: 1 },
        },
      },
      { $sort: { incident: -1 } },
      { $limit: 5 },
      {
        $project: {
          orgName: "$_id.name",
          incident: 1,
          latitube: "$_id.latitube",
          longitube: "$_id.longitube",
          _id: 0,
        },
      },
    ];

    const data = await terrorModel.aggregate(pipeline);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};
export const getTop5OrganizationsPerRegion = async () => {
  try {
    const pipeline: PipelineStage[] = [
      { $match: { gname: { $ne: "Unknown" } } },
      {
        $group: {
          _id: {
            region: "$region_txt",
            latitude: "$latitude",
            longitude: "$longitude",
          },
          incident: { $sum: 1 },
          organizations: { $addToSet: "$gname" },
        },
      },
      {
        $sort: { "_id.region": 1, incident: -1 },
      },
      {
        $group: {
          _id: "$_id.region",
          latitude: { $first: "$_id.latitude" },
          longitude: { $first: "$_id.longitude" },
          topOrganizations: { $first: "$organizations" },
        },
      },
      {
        $project: {
          region: "$_id",
          latitude: 1,
          longitude: 1,
          topOrganizations: { $slice: ["$topOrganizations", 5] },
          _id: 0,
        },
      },
    ];

    const data = await terrorModel.aggregate(pipeline);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getOganizationsWithTheMostIncidentByRegion = async (
  region: string
) => {
  try {
    const data = await terrorModel.aggregate([
      {
        $match: { region_txt: region },
      },
      {
        $group: {
          _id: { orgName: "$gname", lat: "$latitude", lng: "$longitude" },
          incident: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { incident: -1 },
      },
      { $limit: 20 },
      {
        $project: {
          orgName: "$_id.orgName",
          incident: 1,
          lat: "$_id.lat",
          lng: "$_id.lng",
          _id: 0,
        },
      },
    ]);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};
export const getDeadliestRegionsWithOrWithoutCoordinates = async (
  organizationName: string
) => {
  try {
    const data = await terrorModel.aggregate([
      { $match: { nwound: { $gt: 0 } } },
      { $match: { nkill: { $gt: 0 } } },
      {
        $group: {
          _id: { city: "$city", orgName: "$gname" },
          TotalCasualties: {
            $sum: {
              $add: ["$nwound", "$nkill"],
            },
          },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $group: {
          _id: "$_id.city",
          topOrganization: { $first: "$_id.orgName" },
          maxCasualties: { $max: "$TotalCasualties" },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
        },
      },
      {
        $match: {
          topOrganization: organizationName,
        },
      },
      {
        $sort: { maxCasualties: -1 },
      },
      { $limit: 30 },
      {
        $project: {
          _id: 0,
          city: "$_id",
          organization: "$topOrganization",
          TotalCasualties: "$maxCasualties",
          latitude: 1,
          longitude: 1,
        },
      },
    ]);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getIncidentsByOrganization = async (organizationName: string) => {
  try {
    const data = await terrorModel.aggregate([
      {
        $match: { gname: organizationName },
      },
      {
        $group: {
          _id: "$iyear",
          totalIncidents: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          year: "$_id",
          totalIncidents: 1,
        },
      },
    ]);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getTopOrganizationsByYear = async (year: string) => {
  try {
    const yearNum = parseInt(year);
    const data = await terrorModel.aggregate([
      {
        $match: { iyear: yearNum },
      },
      {
        $group: {
          _id: "$gname",
          totalIncidents: { $sum: 1 },
        },
      },
      {
        $sort: { totalIncidents: -1 },
      },
      { $limit: 20 },
      {
        $project: {
          _id: 0,
          organization: "$_id",
          totalIncidents: 1,
        },
      },
    ]);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};
