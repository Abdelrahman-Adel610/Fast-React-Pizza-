import { NavLink } from "react-router-dom";
const base =
  "rounded-full bg-yellow-500  transition-all duration-300 hover:cursor-pointer hover:bg-yellow-400 focus:ring focus:ring-yellow-500 focus:ring-offset-1 focus:outline-none uppercase font-semibold";
const styles = {
  primary: base + " px-5 py-2",
  small: base + " text-xs px-4 py-2",
  secondary:
    "rounded-full border-stone-500 border text-stone-500  transition-all duration-300 hover:cursor-pointer hover:bg-stone-400 hover:text-stone-800 focus:ring focus:ring-stone-600 focus:ring-offset-1 focus:outline-none uppercase font-semibold px-5 py-2 text-sm",
  secondary_small:
    "rounded-full border-stone-500 border text-stone-500  transition-all duration-300 hover:cursor-pointer hover:bg-stone-400 hover:text-stone-800 focus:ring focus:ring-stone-600 focus:ring-offset-1 focus:outline-none uppercase font-semibold text-xs px-2 py-1",
};
export default function Button({
  children,
  disabled,
  to = null,
  type = "primary",
  onClick = () => {},
}) {
  if (to)
    return (
      <NavLink to={to} className={styles[type]}>
        {children}
      </NavLink>
    );

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}
