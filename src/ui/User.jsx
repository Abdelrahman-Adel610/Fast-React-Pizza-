import { useSelector } from "react-redux";

export default function User() {
  const { username } = useSelector((state) => state.user);
  return <p className="hidden font-semibold sm:block">{username}</p>;
}
