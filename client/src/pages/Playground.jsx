import React from 'react';
import Editor from '../partials/Editor';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Playground = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-10">
        <h2 className='text-3xl font-bold text-gray-800 mb-10 text-center'>Playground</h2>
        <Editor />
      </div>
      <Footer />
    </>
  );
};

export default Playground;
