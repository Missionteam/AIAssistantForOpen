import React from "react";
import { useEditorContext } from "../provider/EditorProvider";
import { Modifier, SelectionState, EditorState } from "draft-js";

export default function useSetText(blockForKey: string, text: string) {
  const { editorState, setEditorState } = useEditorContext();
  const contentState = editorState.getCurrentContent();
  //   // ブロックキーを指定してブロックを取得
  const block = contentState.getBlockForKey(blockForKey);
  //   // ブロックの data プロパティから識別子を取得
  const identifier = block.getData().get("identifier");
  const selection = new SelectionState({
    anchorKey: blockForKey,
    anchorOffset: 0,
    focusKey: blockForKey,
    focusOffset: block.getLength(),
  });
  const newContentState = Modifier.replaceText(contentState, selection, text);
  //   // 新しいContentStateでエディタステートを更新
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "change-inline-style",
  );
  //   setEditorState(newEditorState);
}
