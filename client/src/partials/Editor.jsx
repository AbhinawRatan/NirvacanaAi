import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';

const EditorComponent = () => {
  const editorContainerRef = useRef(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: editorContainerRef.current,
      placeholder: 'Start creating your content...',
      tools: {
        header: Header,
        list: List,
        image: SimpleImage,
      },
      autofocus: true,
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((error) => console.error('ERROR editor cleanup', error));
    };
  }, []);

  return <div ref={editorContainerRef} className="editor-container min-h-[300px] bg-white border border-gray-300 p-4"></div>;
};

export default EditorComponent;
