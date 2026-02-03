export async function fetchCSV(url: string) {
  const response = await fetch(url);
  const text = await response.text();

  const lines = text.split("\n").filter(Boolean);
  const headers = lines[0].split(",").map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });

    return obj;
  });
}
