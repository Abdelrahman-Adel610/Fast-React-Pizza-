import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <NavLink to="/">Fast React Pizza Co.</NavLink>
      <p>Abdo</p>
    </header>
  );
}
