// MyEditor.tsx
import React, { FC, useEffect, useMemo, } from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import { EditorState, ContentBlock, genKey, CharacterMetadata, ContentState } from 'draft-js';
import {  RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertToRaw } from 'draft-js';
import { useEditorContext } from '../provider/EditorProvider';
import { List } from 'immutable';
import 'draft-js/dist/Draft.css';
import Editor,{createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';


const text =
  'In this editor a toolbar shows up once you select part of the text …';

const MyEditor: FC = () => {
  const { editorState, setEditorState } = useEditorContext();
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  // useEffect(() => {
  //   setEditorState(createEditorStateWithText(text));
  // }, []);

  const onChange = (value:any) => {
    setEditorState(value);
  };

  // Handle key commands
  const handleKeyCommand = (command: string): 'handled' | 'not-handled' => {
    let newState;

    // Handle block type changes
    switch (command) {
      case 'header-one':
      case 'header-two':
      case 'header-three':
        newState = RichUtils.toggleBlockType(editorState, command);
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
        break;
    }

    if (newState) {
      setEditorState(newState);
      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  // Custom key bindings
  const myKeyBindingFn = (e: React.KeyboardEvent): string | null => {
    if (e.ctrlKey && e.shiftKey && e.key === '1') {
      console.log('feel key bind')
      return 'header-one';
    }
    if (e.ctrlKey && e.shiftKey && e.key === '2') {
      return 'header-two';
    }
    if (e.ctrlKey && e.shiftKey && e.key === '3') {
      return 'header-three';
    }

    return getDefaultKeyBinding(e);
  };


  return (
    <div className="my-editor">
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={myKeyBindingFn}
        plugins={plugins}
      />
      <InlineToolbar/>
    </div>
  );
};

export default MyEditor;