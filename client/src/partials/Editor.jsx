import React, { useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../utils/constants';

const ReactEditorJS = createReactEditorJS();

const Editor = () => {
  const editorCore = useRef(null); // Step 1: Reference to the Editor.js instance

  const handleSave = async () => {
    if (editorCore.current) {
      const outputData = await editorCore.current.save();
      // Here you could alternatively send the data to a server
      localStorage.setItem('editorContent', JSON.stringify(outputData));
      alert('Content saved!'); // Feedback to the user (optional)
      console.log('Saved data', outputData); // For demonstration, log the saved data
    }
  };

  const handleInitialize = (instance) => {
    editorCore.current = instance; // Store the editor instance
  };

  return (
    <div>
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          time: Date.now(),
          blocks: JSON.parse(localStorage.getItem('editorContent'))?.blocks || [],
        }}
      />
      <button onClick={handleSave} style={{ marginTop: '20px' }}>Save Content</button>
    </div>
  );
};

export default Editor;
