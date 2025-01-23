import { patch, type PatchOptions } from "jsr:@cosense/std@0.29/websocket";

export const insertLines = (
  project: string,
  title: string,
  targetLineText: string,
  text: string,
  options?: PatchOptions,
) => patch(
  project,
  title,
  (lines_) => {
    let index = lines_.findIndex(
      (line) => line.text === targetLineText
    );
    index = index < 0 ? lines_.length : index;
    const lines = lines_.map((line) => line.text);
    
    return [
      ...lines.slice(0,index + 1),
      ...text.split("\n"),
      ...lines.slice(index + 1),
    ];
  },
  options,
);