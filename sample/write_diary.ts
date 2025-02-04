import { insertLines } from "../insertLines.ts";

await insertLines(
  "villagepump",
  "2025/02/04",
  "[nisbot.icon]",
  await Deno.readTextFile("diary.txt"),
  { sid: Deno.env.get("CONNECT_SID") },
);

