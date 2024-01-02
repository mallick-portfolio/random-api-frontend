'use client'
import React from "react";
import ReduxProvider from "../store/ReduxProvider";

const layout = ({ children }) => {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
};

export default layout;
