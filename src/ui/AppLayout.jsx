import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const isLoading = useNavigation().state === "loading";
  return (
    <div className="grid h-lvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <main className="mt-8 flex flex-row justify-center overflow-auto">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
