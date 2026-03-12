import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=0&single=true&output=csv";

let mirrorCache: any[] | null = null;

export const fetchMirrorData = async () => {

  if (mirrorCache) return mirrorCache;

  const response = await fetch(CSV_URL);
  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  });

  mirrorCache = parsed.data;

  return parsed.data;

};
