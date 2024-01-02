"use client";
import React from "react";
import DashboardHeader from "../components/shared/DashboardHeader";
import DashboardSidebar from "../components/shared/DashboardSidebar";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ReduxProvider from "../store/ReduxProvider";

const Layout = ({ children }) => {
  return (
    <ReduxProvider>
      <DashboardHeader />
      <div className="drawer">
        <div className="drawer-content container py-6">{children}</div>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <DashboardSidebar />
      </div>
    </ReduxProvider>
  );
};

export default Layout;
