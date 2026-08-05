import React from "react";
import { Link } from "react-router-dom";

function DashHeader() {
  const content = (
    <header className="sticky top-0 z-[1] bg-slate-900 px-2 border-b border-white">
      <div className="flex justify-between items-center">
        <Link to="/dash">
          <h1 className="text-2xl font-semibold">techNotes</h1>
        </Link>
        <nav className="flex justify-end gap-2">{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
}

export default DashHeader;
