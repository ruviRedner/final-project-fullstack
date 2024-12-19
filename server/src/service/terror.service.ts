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
    ]);
    console.log(data);

    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getRegionWithTheHighestAverageCasualties = async (region = "all") => {
  try {
    const pipeline:PipelineStage[] = [];

    if (region !== "all") {
      pipeline.push({ $match: { region_txt: region } }); 
    }

    pipeline.push(
      {
        $group: {
          _id: { region: "$region_txt", lat: "$latitude", lng: "$longitude" },
          averageCasualties: {
            $avg: {
              $add: [
                { $ifNull: ["$nwound", 0] }, 
                { $ifNull: ["$nkill", 0] },
              ],
            },
          },
        },
      },
      {
        $sort: { averageCasualties: -1 }, 
      },
      {
        $project: {
          _id: 0, 
          region: "$_id.region", 
          latitude: "$_id.lat", 
          longitude: "$_id.lng", 
          averageCasualties: 1, 
        },
      }
    );

    const data = await terrorModel.aggregate(pipeline);

    const result = {
      queryRegion: region,
      totalRegions: data.length,
      highestAverageCasualties: data.length > 0 ? data[0] : null, 
      allRegions: data, 
    };

    console.log(result);

    return result;
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
    console.log(data);
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
            $count:{},
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    console.log(data);
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
          _id: { month: "$imonth", year: "$iyear" },
          incident: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    console.log(data);
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
          _id: { month: "$imonth", year: "$iyear" },
          incident: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    console.log(data);
    return data;
  } catch (err) {
    return handleBadRequest("Bad request", err);
  }
};
export const getTop5OrganizationsWithTheMostIncidentByRegion = async (
  region: string
) => {
  try {
    const data = await terrorModel.aggregate([
      {
        $match: { region_txt: region },
      },
      {
        $group: {
          _id: {name:"$gname", lat: "$latitude", lng: "$longitude"},
          incident: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { incident: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    console.log(data);
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
          _id: {name:"$gname", lat: "$latitude", lng: "$longitude"},
          incident: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { incident: -1 },
      },
      { $project: { orgName: "$_id", incident: 1, _id: 0 } },
    ]);
    console.log(data);
    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};
export const getDeadliestRegionsByOrganization = async (
  organizationName: string
) => {
  try {
    const data = await terrorModel.aggregate([
      {
        $group: {
          _id: {
            region: "$region_txt",
            orgName: "$gname",
            lat: "$latitude",
            lng: "$longitude",
          },
          totalFatalities: {
            $sum: {
              $add: [
                { $ifNull: ["$nwound", 0] },
                { $ifNull: ["$nkill", 0] },
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.region": 1,
          totalFatalities: -1,
        },
      },
      {
        $group: {
          _id: "$_id.region",
          topOrganization: { $first: "$_id.orgName" },
          maxFatalities: { $first: "$totalFatalities" },
          latitude: { $first: "$_id.lat" }, 
          longitude: { $first: "$_id.lng" }, 
        },
      },
      {
        $match: { topOrganization: organizationName },
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          maxFatalities: 1,
          latitude: 1,
          longitude: 1,
        },
      },
    ]);

    console.log(data);
    return data;
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};

export const getOrganizationsOrIncidentsByYear = async (
  year: number,
  organizationName?: string 
) => {
  try {
    if (organizationName) {
      
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

      console.log(data);
      return {
        mode: "organization",
        organization: organizationName,
        data,
      };
    } else {
      
      const data = await terrorModel.aggregate([
        {
          $match: { iyear: year }, 
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
        {
          $limit: 5, 
        },
        {
          $project: {
            _id: 0,
            organization: "$_id", 
            totalIncidents: 1, 
          },
        },
      ]);

      console.log(data);
      return {
        mode: "year",
        year,
        data,
      };
    }
  } catch (error) {
    return handleBadRequest("Bad request", error);
  }
};



