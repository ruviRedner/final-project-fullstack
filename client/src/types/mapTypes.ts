export interface Ave {
  averageCasualties: number;
  region: string;
  latitude: number;
  longitude: number;
}
export interface Organization {
  name: string;
  incident: number;
}

export interface TypeFor5InAllRegion {
  latitude: number | null;
  longitude: number | null;
  region: string;
  topOrganizations: Organization[];
}
export interface TypeFor5PerRegion {
  latitube: number;
  longitube: number;
  incident: number;
  orgName: string;
}
export interface TypeForOrg {
  orgName: string;
  incident: number;
}
export interface TypeForCasualtiesByOrgName {
  TotalCasualties: number;
  city: string;
  organization: string;
  latitude: number;
  longitude: number;
}

export const orgNames = [
  { name: "Taliban" },
  { name: "Aceh Singkil Islamic Care Youth Students Association (PPI)" },
  { name: "Achik Matgrik Army (AMA)" },
  { name: "Achik National Cooperative Army (ANCA)" },
  { name: "Achik National Liberation Army (ANLA)" },
  { name: "Achik National Volunteer Council (ANVC)" },
  { name: "Achik National Volunteer Council-B (ANVC-B)" },
  { name: "Achik Songna An'pachakgipa Kotok (ASAK)" },
  { name: "Achik Tiger Force" },
  { name: "Achwan-I-Mushbani" },
  { name: "Actiefront Nationalistisch Nederland" },
  { name: "Action Directe" },
  { name: "Action Front Nationalist Librium" },
  { name: "Action Front for the Liberation of the Baltic Countries" },
  { name: "Action Group for Communism" },
  { name: "Action Group for the Destruction of the Police State" },
  { name: "Action Squad" },
  { name: "Action Struggle Against the World" },
  { name: "Active Espirit de Corps of the Argentina Army" },
  { name: "Activists" },
  { name: "Adan Abyan Islamic Army (AAIA)" },
  { name: "Adan-Abyan Province of the Islamic State" },
  { name: "Adivasi Cobra Militants of Assam (ACMA)" },
  { name: "Adivasi National Liberation Army (ANLA)" },
  { name: "Adivasi People's Army (APA)" },
  { name: "Afar Revolutionary Democratic Unity Front" },
  { name: "Afar Rebels" },
  { name: "Afghan Guerrillas" },
  { name: "Afghan Merceneries" },
  { name: "Afghan Mujahideen" },
  { name: "Afghan Rebels" },
  { name: "Afghan Revolutionary Front" },
  { name: "Afghan War Veterans" },
  { name: "Afghans" },
  { name: "Africa Marine Commando" },
  { name: "African National Congress (South Africa)" },
  { name: "African-American Extremists" },
  { name: "Afridi Tribe" },
  { name: "Afrikaner Resistance Movement (AWB)" },
  { name: 'Aghwar "Fire War" Group' },
  { name: "Agudat Israel Party" },
  { name: "Agwelek Forces" },
  { name: "Ahfad al-Sahaba-Aknaf Bayt al-Maqdis" },
  { name: "Ahle Sunnat Wal Jamaat (ASWJ-Pakistan)" },
  { name: "Ahlu-sunah Wal-jamea (Somalia)" },
  { name: "Ahmad Alawi al Muqbili" },
  { name: "Ahmad Jibril" },
  { name: "Ahmad Luebaesa Group" },
  { name: "Ahrar Al-Jalil (Free People of the Galilee)" },
  {
    name: "Black Nationalists",
  },
];
export interface TypeSearchText{
  _id: string,
  iyear: number,
  imonth: number,
  region_txt: string,
  latitude: number,
  longitude: number,
  attacktype1_txt:string,
  gname: string,
  city: string,
  country_txt: string,
  summary:string
  nwound?: number
  nkill?: number
}
