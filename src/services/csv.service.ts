const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=0&single=true&output=csv";

let mirrorCache: any[] | null = null;

export const fetchMirrorData = async () => {

  // Return cached data if available
  if (mirrorCache) {
    return mirrorCache;
  }

  const response = await fetch(CSV_URL);
  const text = await response.text();

  const rows = text.split("\n").map(row => row.split(","));

  const headers = rows[0].map(h => h.trim());

  const data = rows.slice(1).map(row => {
    const obj: any = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });

  mirrorCache = data;

  return data;

};
