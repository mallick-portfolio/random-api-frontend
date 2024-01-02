'use client'
import isAuth from "@/lib/isAuth";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, maiores?
      Fugiat, voluptatibus tempore. Ea, adipisci corrupti asperiores tempora,
      non reiciendis nulla dolores nihil amet mollitia officia. Esse maiores
      quos debitis?
    </div>
  );
};

export default isAuth(Dashboard);
