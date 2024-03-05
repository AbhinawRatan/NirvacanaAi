import React from 'react'
import Editor from '../partials/Editor'

const Playground = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10">
     <h2 className='text-2xl font-bold text-gray-800 mb-5'>Playground</h2>
     <div className="editor-wrapper bg-white p-5 shadow rounded-lg">
        <Editor />
     </div>
    </div>
  )
}

export default Playground;
