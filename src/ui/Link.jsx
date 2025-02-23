import { Link, useNavigate } from "react-router-dom";
const my_class =
  "text-sm text-blue-500 hover:text-blue-700 hover:underline cursor-pointer";
export default function Blue_Link({ to, children }) {
  const navigate = useNavigate();
  if (to === "-1")
    return (
      <button className={my_class} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={my_class}>
      {children}
    </Link>
  );
}
