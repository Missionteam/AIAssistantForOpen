import { createContext, useContext, useState, ReactNode } from 'react';
import { ContentState, Editor, EditorState, convertFromRaw } from 'draft-js';


const createBlock = (blockData: BlockData) => {
  return {
    key: blockData.key,
    text: blockData.text,
    type: blockData.type,
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    data: {},
  };
};

const blockDatas: BlockData[] = [
  { key: "objectTiTle", text: "目標", type: "header-three", },
  { key: "object", text: "  今日の目標は、AIサービスを完成させることです。", type: "paragraph", },
  { key: "1", text: "", type: "paragraph", },
  { key: "ToDoTiTle", text: "ToDo", type: "header-three", },
  { key: "ToDo", text: "・一日の計画を練る\n・時間を計測する", type: "paragraph" },
  { key: "2", text: "", type: "paragraph", },
  { key: "WarnintTiTle", text: "注意点", type: "header-three", },
  { key: "Warning", text: "・時間を常に意識する\n・目標を達成できるかを都度見返す。", type: "paragraph" },
  { key: "3", text: "", type: "paragraph", },
  { key: "TimeTiTle", text: "時間", type: "header-three", },
  { key: "Time", text: "  2時間", type: "paragraph" },
  // ...他のブロックデータ...
];

const blocks = blockDatas.map(blockData => createBlock(blockData));

const initData = convertFromRaw({
  entityMap: {},
  blocks: blocks,
})


const initState = EditorState.createWithContent(
  initData,
)

export default initState;











interface BlockData {
  key: string;
  text: string;
  type: string;
}