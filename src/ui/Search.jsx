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
      />
    </form>
  );
}
