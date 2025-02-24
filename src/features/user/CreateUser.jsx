import { useState } from "react";
import Button from "../../ui/Button";
import { setUsername } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setLocalUsername] = useState("");
  const { username: user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUsername(username));
    navigate("/pizza/menu");
  }
  return (
    <form onSubmit={handleSubmit} className="text-slate-800">
      {user === "Guest" && (
        <>
          <p className="mb-4 sm:mb-3">
            👋 Welcome! Please start by telling us your name:
          </p>
          <input
            type="text"
            placeholder="Your full name"
            value={username}
            className="w52 mb-8 md:w-72"
            onChange={(e) => setLocalUsername(e.target.value)}
          />
        </>
      )}

      {(user !== "Guest" || username !== "") && (
        <div>
          {user !== "Guest" ? (
            <Button to={"/pizza/menu"}>continue ordering, {user}</Button>
          ) : (
            <Button>Start ordering</Button>
          )}
        </div>
      )}
    </form>
  );
}

export default CreateUser;
