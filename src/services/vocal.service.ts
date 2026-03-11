const VOCAL_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=923032846&single=true&output=csv";

let vocalCache: any[] | null = null;

export const fetchVocalData = async () => {

  if (vocalCache) return vocalCache;

  const res = await fetch(VOCAL_CSV_URL);
  const text = await res.text();

  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows[0].map(h => h.trim());

  const data = rows.slice(1).map(row => {
    const obj: any = {};

    headers.forEach((h, i) => {
      obj[h] = row[i];
    });

    // Auto slug if not provided
    obj.slug = obj.slug || obj.item_name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Fallback image
    if (!obj.image_link || obj.image_link.trim() === "") {
  obj.image_link =
    "https://images.pexels.com/photos/4207908/pexels-photo-4207908.jpeg";
    }

    return obj;
  });

  vocalCache = data;

  return data;

};
