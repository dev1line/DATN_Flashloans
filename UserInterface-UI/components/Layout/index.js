import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import ScrollToTop from "./ScrollToTop";
import Loader from "./Loader";

const Layout = ({ footerData, navbarData, children, ...props }) => {
  const [loading, setLoading] = useState(true);
  function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1999));
  }

  const router = useRouter();

  const handleLoading = () => {
    document.body.style.overflow = "auto";
    setLoading(false);
  };

  useEffect(() => {
    if (router.pathname === "/") {
      document.body.style.overflow = "hidden";
      demoAsyncCall().then(() => handleLoading());
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div>
          <Header isLoading={loading} />
          <div>{children}</div>
          {/* <ScrollToTop /> */}
          <Footer isLoading={loading} />
        </div>
      )}
    </>
  );
};

export default Layout;
