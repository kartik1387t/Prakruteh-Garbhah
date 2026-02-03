import { fetchCSV } from "../utils/csvFetcher";

// 🔁 Replace this URL with YOUR published Bharat Mirror CSV link
const BHARAT_MIRROR_CSV_URL =
  "https://opensheet.elk.sh/2PACX-1vS7BOsfu5CDJunvbj_NTPaZOFT23j4SREv1fxHWgcT4Y0Z0ifElDCHwQbt7LN8Xd2jfW14KAt4GtCyT/Bharat%20mirror";

export async function getBharatMirrorData() {
  return await fetchCSV(BHARAT_MIRROR_CSV_URL);
}
