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

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);
  const [handleLogout, { data, isLoading }] = useUserLogoutMutation();

  const logout = async () => {
    console.log("i am calling");
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
          <Link href={"/"} className="text-xl">
            Kume
          </Link>
        </div>
        <div className="navbar-end">
          {!user ? (
            ""
          ) : (
            <button
              onClick={() => logout()}
              className="btn btn-secondary btn-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
