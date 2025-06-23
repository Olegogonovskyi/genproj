import React, {FC} from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState, $getRoot } from 'lexical'
import { LexicalErrorBoundary } from '@lexical/react';
import { LexicalEditorProps } from '../../models/ILexicalEditorProps';

const ErrorBoundary = LexicalErrorBoundary as unknown as React.ComponentType<any>;

export const LexicalEditor: FC<LexicalEditorProps> = ({ onChange, initialValue }) => {
  const config = {
    namespace: 'MyEditor',
    theme: {},
    onError(error: Error) {
      console.error(error);
    },
  }

  return (
    <LexicalComposer initialConfig={config}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<div className="editor-placeholder">Введіть текст...</div>}
        ErrorBoundary={ErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState: EditorState) => {
          editorState.read(() => {
            const root = $getRoot()
            const html = root.__cachedText ?? root.getTextContent();
            onChange(html)
          })
        }}
      />
    </LexicalComposer>
  )
}
