import Papa from 'papaparse';

// 1. Replace with your "Publish to Web" CSV link
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/pub?gid=0&single=true&output=csv";

export const fetchMirrorData = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,      // Tells PapaParse to fetch the URL for you
      header: true,        // Automatically uses the first row as keys
      skipEmptyLines: true, // Prevents errors from empty rows at the end
      complete: (results) => {
        // results.data will be an array of objects
        resolve(results.data);
      },
      error: (error) => {
        console.error("CSV Fetch Error:", error);
        reject(error);
      }
    });
  });
};
