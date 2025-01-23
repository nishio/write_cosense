import { insertLines } from "./insertLines.ts";

await insertLines(
  "nishio",
  "日記2025-01-23",
  "AI",
  " Hello!" + new Date().toISOString(),
  { sid: Deno.env.get("CONNECT_SID") },
);