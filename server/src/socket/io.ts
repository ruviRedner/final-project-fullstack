import { Socket } from "socket.io";
import { Terror } from "../models/terrorModel";
import {
  createNewEvent,
  deleteEvent,
  searchInText,
  updataEvent,
} from "../service/create.service";
import {
  getDeadliestRegionsWithOrWithoutCoordinates,
  getIncidentsByOrganization,
  getIncidentsInYearRange,
  getListAttackTypeByTheMostCasualties,
  getOganizationsWithTheMostIncidentByRegion,
  getRecentYearsData,
  getRegionWithTheHighestAverageCasualties,
  getTop5OrganizationsPerRegion,
  getTop5OrganizationsWithTheMostIncidentByRegion,
  getTopOrganizationsByYear,
  getUniceIncidentInEveryMonthInYear,
} from "../service/terror.service";

export const handelShackConnection = (client: Socket) => {
  console.log(`[socket.io]New Connection ${client.id} `);
  client.on("disconnect", () => {
    console.log("Bay Bay user");
  });
  client.on("newTeror", async (data: Terror, callback) => {
    try {
      const newTerror = await createNewEvent(data);
      console.log(newTerror);

      callback({
        success: true,
        message: "Event created successfully",
        result: newTerror,
      });
    } catch (error) {
      callback({ success: false, error: (error as Error).message });
    }
  });
  client.on("delete", async (data: string, callback) => {
    try {
      const del = await deleteEvent(data);
      callback({ success: true, message: del });
    } catch (error) {
      callback({ success: false, message: "event deleted went wrong" });
    }
  });
  client.on(
    "update",
    async (data: { id: string; update: Terror }, callback) => {
      try {
        const updated = await updataEvent(data.id, data.update);
        callback({ success: true, message: updated });
      } catch (error) {
        callback({ success: false, message: "event updated went wrong" });
      }
    }
  );
  client.on("get1", async (callback) => {
    try {
      const result = await getListAttackTypeByTheMostCasualties();
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get2", async (year: string, callback) => {
    try {
      const result = await getUniceIncidentInEveryMonthInYear(year);

      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on(
    "get3",
    async (data: { startYear: string; endYear: string }, callback) => {
      try {
        const result = await getIncidentsInYearRange(
          data.startYear,
          data.endYear
        );

        callback({ success: true, data: result });
      } catch (error) {
        callback({ success: false, message: (error as Error).message });
      }
    }
  );
  client.on("get4", async (num: string, callback) => {
    try {
      const result = await getRecentYearsData(num);

      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get5", async (region: string, callback) => {
    try {
      console.log(region);

      const result = await getTop5OrganizationsWithTheMostIncidentByRegion(
        region
      );

      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get6", async (region: string, callback) => {
    try {
      const result = await getOganizationsWithTheMostIncidentByRegion(region);
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get7", async (year: string, callback) => {
    try {
      const result = await getTopOrganizationsByYear(year);
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get8", async (orgName: string, callback) => {
    try {
      const result = await getIncidentsByOrganization(orgName);
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get1Map", async (callback) => {
    try {
      const result = await getRegionWithTheHighestAverageCasualties();
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get1MapByRegion", async (region: string, callback) => {
    try {
      const result = await getRegionWithTheHighestAverageCasualties(region);
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get5TopForAllRegion", async (callback) => {
    try {
      const result = await getTop5OrganizationsPerRegion();
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("get1MapByOrgName", async (orgName: string, callback) => {
    try {
      const result = await getDeadliestRegionsWithOrWithoutCoordinates(orgName);
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("searchText", async (searchText: string, callback) => {
    try {
      const result = await searchInText(searchText);
      callback({ success: true, data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
};
