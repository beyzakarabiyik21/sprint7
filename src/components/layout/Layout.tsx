import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";

function Layout() {
  const { pathname } = useLocation();

  // Sayfa değişince en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
