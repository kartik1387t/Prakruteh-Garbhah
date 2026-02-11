const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=0&single=true&output=csv";

export const fetchCSVData = async () => {
  const response = await fetch(CSV_URL);
  const csvText = await response.text();

  return parseCSV(csvText);
};

const parseCSV = (csvText: string) => {
  const rows = csvText.split("\n").map(row => row.split(","));

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows.map(row => {
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = row[index]?.trim();
    });
    return obj;
  });
};
