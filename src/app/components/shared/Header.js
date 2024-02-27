import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="navbar bg-base-100 container">
      <div className="navbar-start">
        <div className="dropdown">
          {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
          </div> */}
          <Link href={"/"} className="btn btn-ghost text-xl">
            Kanban
          </Link>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={"/public/board"} className="btn btn-ghost text-xl">
          Public Board
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn bg-first btn-sm">
          <Link href={"/account/register"}>Register</Link>
        </button>
        <button className="btn bg-second btn-sm ml-2">
          <Link href={"/account/login"}>Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
