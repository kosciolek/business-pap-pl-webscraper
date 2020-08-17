import path from "path";
import notifier from "node-notifier";
import nodemailer from "nodemailer";
import { Entry } from "./Entry";
import config from "./config";

const emailName = "biznespapnotyfikacje@gmail.com";
const emailPassword = "ail&continue=https%3A%2F%2Fma";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailName,
    pass: emailPassword,
  },
});

const makeEmailHtml = (entries: Entry[]) =>
  `<body>
  <div
    style="
      align-items: stretch;
      padding: 20px;
      background-color: #f3f3f3;
      border: 3px solid #eaeaea;
      text-align: center;
    "
  >
    <h1 style="text-align: center;">Nowe tytuły</h1>

    <table
      style="
        border: 1px solid #d4d4d4;
        background-color: #e4e4e4;
        padding: 20px;
        margin: 10px auto;
      "
    >
      <tr style="font-weight: bold;border-bottom: 1px solid black;">
        <th>Godzina</th>
        <th>Numer</th>
        <th>Firma</th>
        <th>Tytul</th>
      </tr>
      ${entries
        .map(
          (entry) => `
      <tr style="border-bottom: 1px solid gray">
        <td>${entry.hour}</td>
        <td>${entry.number}</td>
        <td>${entry.company}</td>
        <td>${entry.title}</td>
      </tr>
      `
        )
        .join("")}
    </table>
    <a style="background-color: rgb(228 228 228);padding: 10px;margin: auto;" href="${
      config.url
    }">Kliknij tutaj, by przejść na stronę.</a>
  </div>
</body>
`;

const notifyEntries = async (mailReceiver: string, ...entries: Entry[]) => {
  notifier.notify({
    title: "Biznes.pap.pl",
    message: `Znaleziono ${entries.length} nowe tytuły.`,
    sound: true,
  });

  await transport.sendMail({
    from: `Biznes Pap Notyfikacja <${emailName}>`,
    to: mailReceiver,
    subject: "Znaleziono nowe tutuły na biznes pap",
    text: `Znaleziono nowe tytuły na biznes pap pl: ${entries
      .map((x) => x.title)
      .join(" ")}`,
    html: makeEmailHtml(entries),
  });
};

export default notifyEntries;
