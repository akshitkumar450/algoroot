import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin "></div>
    </div>
  );
}

export default Loader;
