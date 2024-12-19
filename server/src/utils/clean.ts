export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
    const cleanedObj: Record<string, any> = {};
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && obj[key] !== 0) {
        cleanedObj[key] = obj[key];
      }
    }
    return cleanedObj;
  };