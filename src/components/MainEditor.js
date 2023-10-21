
import React, { useEffect, useRef, useState } from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import CodeMirror from 'codemirror';
import ACTIONS from '../Action';
import styled from 'styled-components';

const MainEditor = ({ socketRef, roomId, onCodeChange }) => {

  const editorRef = useRef(null);
  useEffect(() => {
      async function init() {
          editorRef.current = CodeMirror.fromTextArea(
              document.getElementById('editor'),
              {
                  mode: 'javascript', 
                  theme: 'dracula',
                 autoCloseTags:true,
                 autocorrect:true,
                  autoCloseBrackets: true,
                  lineNumbers: true,
                  
              });

              editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        init();
      }, []);

      useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);



return <textarea id="editor" value={'console.log("Hello Javascript")'} ></textarea>
};

export default MainEditor;
