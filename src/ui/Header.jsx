import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  return (
    <header>
      <NavLink to="/">Fast React Pizza Co.</NavLink>
      <Search/>
      <p>Abdo</p>
    </header>
  );
}
