import fetch from "node-fetch";
import cheerio from "cheerio";
import { Entry } from "./Entry";

const getEntries = async (url): Promise<Entry[]> => {
  const response = await fetch(url);
  const text = await response.text();

  const root = cheerio.load(text);

  const entries = [] as Entry[];
  const dataTrs = root("table.espi tr")
    .toArray()
    .slice(1) // Remove headers
  // @ts-ignore
    .filter(({ children }) => children && children.length === 9); // Data rows always contain 9 children

  for (const tr of dataTrs) {
    // @ts-ignore
    const title = tr.children[7].children[1].children[0].data!.trim();
    // @ts-ignore
    const hour = tr.children[1].children[0].data!.trim();
    // @ts-ignore
    const number = tr.children[3].children[0].data!.trim();
    // @ts-ignore
    const company = tr.children[5].children[1].children[1].children[0].data!.trim();
    const timeFetched = Date.now();

    entries.push({
      title,
      hour,
      number,
      company,
      timeFetched,
    });
  }

  return entries;
};

export default getEntries;
