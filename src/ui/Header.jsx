import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";
import User from "./User";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 p-3.5 text-stone-800 sm:p-3">
      <NavLink to="/" className="text-lg font-bold tracking-widest">
        Fast React Pizza Co.
      </NavLink>
      <Search />
      <User />
    </header>
  );
}
