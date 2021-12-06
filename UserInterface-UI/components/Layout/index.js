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
    // document.body.style.overflow = "auto";
    $("#__next").css({ overflow: "auto" });
    setTimeout(() => {
      $(".window-cover").css({ display: "none" });
    }, 1000);
    setLoading(false);
  };

  useEffect(() => {
    // if (router.pathname === "/") {
    // document.body.style.overflow = "hidden";
    $("#__next").css({ overflow: "hidden", height: "100vh" });
    demoAsyncCall().then(() => handleLoading());
    // } else {
    //   setLoading(false);
    // }
  }, []);

  return (
    <>
      <div className="window-cover">
        <Loader />
      </div>
      {/* {loading && } */}
      <Header isLoading={loading} />
      <div>{children}</div>
      {/* <ScrollToTop /> */}
      <Footer isLoading={loading} />
    </>
  );
};

export default Layout;
