import path from "path";
import fs, { promises as fsp } from "fs";
import getEntries from "./getEntries";
import { sleep } from "./sleep";
import filterInterestingEntries from "./filterInterestingEntries";
import notifyEntries from "./notify";
import config from "./config";
import { Entry } from "./Entry";

const ALREADY_NOTIFIED_PATH =
  process.env.CONFIG_PATH ||
  path.resolve(__dirname, "..", "already_notified.json");

const check = async () => {
  const titles = await getEntries(config.url);
  const interestingTitles = filterInterestingEntries(titles, {
    string: config.filtering.stringKeywords,
    regex: config.filtering.regexKeywords,
  });

  let alreadyNotified = {} as { [title: string]: Entry[] };
  try {
    alreadyNotified = JSON.parse(
      await fsp.readFile(ALREADY_NOTIFIED_PATH, { encoding: "utf8" })
    );
  } catch (e) {}

  const notNotifiedEntries = interestingTitles.filter(
    (entry) =>
      !alreadyNotified[entry.title] ||
      alreadyNotified[entry.title].filter(
        (x) =>
          x.number === entry.number &&
          x.hour === entry.hour &&
          x.title === entry.title
      ).length === 0
  );

  for (const entry of notNotifiedEntries) {
    if (!alreadyNotified[entry.title]) alreadyNotified[entry.title] = [];
    alreadyNotified[entry.title].push(entry);
  }

  if (notNotifiedEntries.length > 0) {
    await notifyEntries(config.mailReceiver, ...notNotifiedEntries);
  }

  await fsp.writeFile(
    ALREADY_NOTIFIED_PATH,
    JSON.stringify(alreadyNotified, null, 2)
  );
};

(async () => {
  while (true) {
    await check();
    await sleep(config.interval);
  }
})();
