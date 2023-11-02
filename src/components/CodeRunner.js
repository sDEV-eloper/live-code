// src/CodeEditor.js

import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

function CodeEditor() {
  return (
    <AceEditor
      mode="javascript" // Set the programming language mode
      theme="monokai" // Set the editor theme
      fontSize={14} // Set the font size
      height="500px" // Set the editor's height
      width="100%" // Set the editor's width
    />
  );
}

export default CodeEditor;
