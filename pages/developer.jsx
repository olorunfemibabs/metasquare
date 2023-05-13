import React from 'react';

const Developer = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold mb-4">Developer Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  className="w-full h-auto rounded-lg"
                  src="https://via.placeholder.com/400x400"
                  alt="Developer Avatar"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">John Doe</h2>
                <p>Email: john.doe@example.com</p>
                <p>Location: New York, USA</p>
                <p>Skills: JavaScript, React, Node.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
