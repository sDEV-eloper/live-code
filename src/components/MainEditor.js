
import React, { useEffect, useState } from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'

const MainEditor = () => {

 return <CodeMirror
value='// Write code in javascript'
  options={{
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets:true,
    autocorrect:true,
    matchTags:true,
  }}
  onChange={(editor, data, value) => {
  }}
/>
};

export default MainEditor;
