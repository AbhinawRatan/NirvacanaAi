import React from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

function VisitorInfo() {
  const { data, loading, error } = useVisitorData();

  console.log('Visitor Data:', data);
  console.log('Loading:', loading);
  console.log('Error:', error);

  if (loading) return <p>Loading visitor data...</p>;
  if (error) return <p>Error loading visitor data: {error.message}</p>;
  if (!data) return <p>No visitor data available.</p>; // Added check for data

  return (
    <div>
      <h3>Visitor Information:</h3>
      <p>Visitor ID: {data.visitorId}</p>
      {/* Display more data as needed */}
    </div>
  );
}

export default VisitorInfo;
