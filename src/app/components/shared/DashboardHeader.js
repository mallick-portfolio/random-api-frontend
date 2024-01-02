"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DashboardHeader = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/account/logout/`,
      {},
      {
        headers: { Authorization: `Bearer ${Cookies.get("auth_token")}` },
      }
    );
    if (data?.success) {
      toast.success(data?.message, { autoClose: 2000 });
      Cookies.remove("auth_token");
      router.push("/");
    }
  };

  return (
    <div className="shadow-2xl  bg-base-200">
      <div className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Kume</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-primary btn-sm mr-3">
            <Link href={"/account/login"}>Login</Link>
          </button>
          <button
            onClick={() => handleLogout()}
            className="btn btn-secondary btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
