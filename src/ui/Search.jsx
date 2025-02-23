import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function submitHandler(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/pizza/order/${query}`);
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter the order id..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-style w-52 !bg-yellow-200 transition-all duration-100 sm:w-64 sm:focus:w-80"
      />
    </form>
  );
}
