import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="grow pt-3 px-2 pb-2">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}

export default DashLayout;
