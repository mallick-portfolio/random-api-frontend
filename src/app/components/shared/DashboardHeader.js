"use client";
import { useUserLogoutMutation } from "@/app/store/api/accountApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { setUser } from "@/app/store/reducer/globalSlice";
import Notification from "../notification/Notification";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);
  const { currentNotifications } = useSelector((state) => state.apiStateData);
  const [handleLogout, { data, isLoading }] = useUserLogoutMutation();

  const logout = async () => {
    await handleLogout();
  };

  useEffect(() => {
    if (data && data?.success) {
      dispatch(setUser({}));
      toast.success(data?.message);
      Cookies.remove("auth_token");
      redirect("/account/login");
    } else {
      toast.error(data?.message);
    }
  }, [data]);
  if (isLoading) {
    return <Loading />;
  }
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
              <label htmlFor="my-drawer" className="btn bg-first drawer-button">
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
          <Link href={"/"} className="text-xl">
            IUBoard
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn sm:mr-2 btn-ghost btn-circle">
              <div className="indicator">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs bg-first rounded-full h-5 w-5 indicator-item">
                  {currentNotifications?.length}
                </span>
              </div>
            </button>
            <Notification />
          </div>
          {!user ? (
            ""
          ) : (
            <button onClick={() => logout()} className="btn bg-second btn-sm">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
