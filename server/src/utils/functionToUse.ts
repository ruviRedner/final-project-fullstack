import fs from 'fs/promises';
export const getFileData = async  (resourse:string) => {
    try {
        const data:string = (await fs.readFile(`${__dirname}/../../../../data/${resourse}.json`, 'utf-8')).toString();
        const parsaData = JSON.parse(data);
        return parsaData;
    } catch (error) {
        console.log(error);
    }
}