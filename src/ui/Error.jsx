import { useNavigate, useRouteError } from "react-router-dom";
import Blue_Link from "./Link";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>
      <button onClick={() => navigate(-1)}></button>
      <Blue_Link to={"-1"}>&larr; Go back</Blue_Link>
    </div>
  );
}

export default Error;
