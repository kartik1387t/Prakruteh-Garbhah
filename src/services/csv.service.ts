import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=0&single=true&output=csv";

export const fetchMirrorData = async () => {
  const response = await fetch(CSV_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch Mirror CSV");
  }

  const text = await response.text();

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
};
