import Router from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "./nav-link";
import { notificationCount } from "./nav.module.css";

function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Morning";
  }
  if (hour >= 12 && hour < 17) {
    return "Afternoon";
  }

  return "Evening";
}

export function Nav(): React.ReactElement {
  const [, , removeCookie] = useCookies();

  const handleLogout = async () => {
    await Router.push("/login");
    removeCookie("token");
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-700 shadow-sm">
      <div className="pr-2 md:pr-6 md:pl-8">
        <div className="flex items-center justify-between h-16">
          <button
            className="p-2 ml-2 text-blue-300 rounded-full md:hidden duration-150 ease-in-out transition hover:text-white focus:outline-none focus:text-white focus:bg-blue-600"
            type="button"
          >
            <FaBars className="w-5 h-5" />
          </button>
          <div className="items-center hidden -ml-2 md:flex">
            <NavLink href="/dashboard" label="Dashboard" />
            <NavLink href="/work-packs" label="Work Packs" />
          </div>
          <div className="flex items-center">
            <button
              className="relative flex items-center ml-4 focus:outline-none"
              type="button"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full focus:shadow-outline hover:shadow-outline duration-150 ease-in-out transition"
                src="//images.unsplash.com/photo-1472099645785-5658abf4ff4e?&facepad=2&fit=facearea&h=32&w=32"
              />
              <span className={notificationCount}>7</span>
            </button>
            <span className="hidden ml-4 font-medium text-blue-300 lg:block">
              Good {getTimeOfDay()}, James!
            </span>
            <button
              className="p-2 ml-4 text-blue-300 rounded-full duration-150 ease-in-out transition hover:text-white focus:outline-none focus:text-white hover:bg-blue-600 focus:bg-blue-600"
              onClick={handleLogout}
              type="button"
            >
              <FaSignOutAlt className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
