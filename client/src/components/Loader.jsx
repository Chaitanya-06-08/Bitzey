import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center font-brandFont absolute top-0 left-0 w-full h-full bg-transparent">
      <div className="relative bg-white rounded-full">
        <div className="h-36 w-36 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-36 w-36 rounded-full border-t-8 border-b-8 border-brand-primary animate-spin"></div>
      </div>
      <div className="absolute top-50 left-50 text-xl text-brand-primary rounded-full">Loading..</div>
    </div>
  );
};

export default Loader;
