// EditorContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import {Editor, EditorState, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import initState from './InitText';



const EditorContext = createContext<{
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
} | null>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorContextProvider");
  }
  return context;
};

interface EditorContextProviderProps {
  children: ReactNode;
}

export const EditorContextProvider: React.FC<EditorContextProviderProps> = ({ children }) => {
  const [editorState, setEditorState] = useState(initState);

  return (
    <EditorContext.Provider value={{ editorState, setEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};