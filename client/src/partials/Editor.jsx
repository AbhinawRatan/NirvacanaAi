import React, { useEffect, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../utils/constants';

const ReactEditorJS = createReactEditorJS();

const savingMessages = [
  "AI is performing its magic...",
  "Just a moment, creating something awesome...",
  "Hold tight, weaving the words...",
  "Almost there, finalizing the touches..."
];

const Editor = () => {
  const editorInstanceRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  // New: State to hold the editor data for initializing the editor
  const [editorData, setEditorData] = useState({});

  const handleSave = async () => {
    setSaving(true);
    setCurrentMessage(0);
    if (editorInstanceRef.current) {
      const outputData = await editorInstanceRef.current.save();
      localStorage.setItem('editorContent', JSON.stringify(outputData));
      setTimeout(() => {
        setSaving(false);
        alert('Content saved!');
      }, 2000);
    }
  };

  useEffect(() => {
    let interval;
    if (saving) {
      interval = setInterval(() => {
        setCurrentMessage((prevMessage) => (prevMessage + 1) % savingMessages.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [saving]);

  useEffect(() => {
    // Load content from localStorage and set it as the initial data for the editor
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setEditorData(JSON.parse(savedContent));
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Overlay for saving messages */}
      {saving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-center p-5 bg-gray-800 rounded-lg">
            <p className="animate-pulse">{savingMessages[currentMessage]}</p>
          </div>
        </div>
      )}
      <div className="pt-16 w-full">
        <ReactEditorJS
          instanceRef={instance => (editorInstanceRef.current = instance)}
          tools={EDITOR_JS_TOOLS}
          defaultValue={editorData} // Initialize the editor with loaded content
        />
      </div>
      <button
        onClick={handleSave}
        className={`mt-4 mb-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full
                    transition-all duration-500 ease-in-out ${saving ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}`}>
        {!saving ? "Save" : ""}
      </button>
    </div>
  );
};

export default Editor;
