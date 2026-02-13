export const fetchCSVData = async () => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=0&single=true&output=csv"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch CSV");
  }

  const text = await response.text();
  return text;
};
