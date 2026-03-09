const SEO_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=1104622968&single=true&output=csv";

let seoCache: any[] | null = null;

export const fetchSEOKeywords = async () => {

  if (seoCache) return seoCache;

  const response = await fetch(SEO_CSV_URL);
  const text = await response.text();

  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows[0].map(h => h.trim());

  const data = rows.slice(1).map(row => {
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h] = row[i];
    });
    return obj;
  });

  seoCache = data;

  return data;

};
