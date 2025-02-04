import { BaseLine } from "https://jsr.io/@cosense/types/0.10.4/base.ts";
import { patch, type PatchOptions } from "jsr:@cosense/std@0.29/websocket";


const project = "villagepump";
const title = "2025/02/04";
const targetLineText = "[scbot.icon]"
const text = "インデントを配慮して書き込めるAIです！"
const options: PatchOptions = { sid: Deno.env.get("CONNECT_SID") }

const update = (lines_: BaseLine[]) => {
  const lines = lines_.map((line) => line.text);

  const index = lines.findIndex(line => line === targetLineText);
  if (index < 0) {
    return [
      ...lines,
      ...text.split('\n').map(line => '\t' + line),
    ];
  }

  // インデントされた子孫ブロックの末尾を探す
  let endIndex = index + 1;
  const baseMatch = lines[index].match(/^\s*/);
  if (!baseMatch) return lines;
  const baseIndent = baseMatch[0].length;
  console.log("baseIndent:", baseIndent)

  while (endIndex < lines.length) {
    const match = lines[endIndex].match(/^\s*/);
    if (!match || match[0].length <= baseIndent) break;
    endIndex++;
  }

  return [
    ...lines.slice(0, endIndex),
    ...text.split('\n').map(line => '\t'.repeat(baseIndent + 1) + line),
    ...lines.slice(endIndex),
  ];
}

patch(
  project,
  title,
  update,
  options,
)
