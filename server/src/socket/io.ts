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
import { io } from "../app";

export const handelShackConnection = (client: Socket) => {
  console.log(`[socket.io]New Connection ${client.id} `);
  client.on("disconnect", () => {
    console.log("Bay Bay user");
  });
  client.on("newTeror", async (data: Terror, callback) => {
    try {
      const newTerror = await createNewEvent(data);

      callback({
        success: true,
        message: "האירוע נוסף בהצלחה",
        result: newTerror,
      });
      io.emit("change-data", { action: "create", data: newTerror });
    } catch (error) {
      callback({ success: false, error: (error as Error).message });
    }
  });
  client.on("delete", async (id: string, callback) => {
    try {
      const result = await deleteEvent(id);
      callback({ success: true, message: "נמחק בהצלחה" });
      io.emit("change-data", { action: "delete", data: result });
    } catch (error) {
      callback({ success: false, message: (error as Error).message });
    }
  });
  client.on("update", async (id: string, update: Terror, callback) => {
    try {
      const result = await updataEvent(id, update);
      callback({ success: true, message: "העדכון הצליח" });
      io.emit("change-data", { action: "update", data: result });
    } catch (error) {
      callback({ success: false, message: "event updated went wrong" });
    }
  });
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
