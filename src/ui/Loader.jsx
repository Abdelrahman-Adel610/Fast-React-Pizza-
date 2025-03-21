import React from "react";

export default function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/40 backdrop-blur-sm h-screen">
      <div className="loader"></div>
    </div>
  );
}
