import path from "path";
import fs from "fs";

const CONFIG_PATH =
  process.env.CONFIG_PATH || path.resolve(__dirname, "..", "config.json");

const unparsedConfig = JSON.parse(
  fs.readFileSync(CONFIG_PATH, { encoding: "utf8" })
);

export interface Config {
  url: string;
  interval: number;
  mailReceiver: string;
  filtering: {
    stringKeywords: string[];
    regexKeywords: string[];
  };
}

const config: Config = {
  url: unparsedConfig.url,
  interval: unparsedConfig.interval,
  mailReceiver: unparsedConfig.mail_receiver,
  filtering: {
    stringKeywords: unparsedConfig.filtering.string_keywords,
    regexKeywords: unparsedConfig.filtering.regex_keywords,
  },
};
export default config;
