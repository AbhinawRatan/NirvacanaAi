import React, { useEffect, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../utils/constants';

const ReactEditorJS = createReactEditorJS();

const Editor = () => {
  const editorCore = useRef(null);
  const [saving, setSaving] = useState(false); // State to manage saving/loading state

  const handleSave = async () => {
    setSaving(true); // Start saving
    if (editorCore.current) {
      const outputData = await editorCore.current.save();
      localStorage.setItem('editorContent', JSON.stringify(outputData));
      setTimeout(() => { // Simulate network request delay
        setSaving(false); // Stop saving after the action is done
        alert('Content saved!');
      }, 2000); // Adjust time as needed
    }
  };

  const handleInitialize = (instance) => {
    editorCore.current = instance;
  };

  useEffect(() => {
    const loadContent = async () => {
      const savedContent = localStorage.getItem('editorContent');
      if (savedContent && editorCore.current) {
        await editorCore.current.render(JSON.parse(savedContent));
      }
    };

    loadContent();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center"> {/* Use flexbox for centering */}
      <div className="pt-16 w-full"> {/* Ensure the Editor.js occupies the full width */}
        <ReactEditorJS
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
        />
      </div>
      <button 
        onClick={handleSave} 
        className={`mt-4 mb-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full 
                    transition-all duration-500 ease-in-out 
                    ${saving ? 'w-10 h-10 p-0 rounded-full' : 'w-32 h-10 rounded-lg'}`}>
        {!saving && "Save "} {/* Hide text when saving */}
      </button>
    </div>
  );
};

export default Editor;
