import { Entry } from "./Entry";

const filterInterestingEntries = (
  entries: Entry[],
  keywords: { regex: string[]; string: string[] }
) => {
  const interestingEntries = new Set<string>();

  for (const entry of entries) {
    for (const keyword of keywords.string.map((keyword) =>
      keyword.toLowerCase()
    )) {
      if (entry.title.toLowerCase().includes(keyword)) {
        interestingEntries.add(JSON.stringify(entry));
      }
    }

    for (const keyword of keywords.regex) {
      if (new RegExp(keyword, "i").test(entry.title.toLowerCase())) {
        interestingEntries.add(JSON.stringify(entry));
      }
    }
  }

  return [...interestingEntries].map((x) => JSON.parse(x));
};

export default filterInterestingEntries;
