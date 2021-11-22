import { convertArrToObject } from "../../../util/converArrayToObject";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useDarkMode from "use-dark-mode";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import ScrollToTop from "../ScrollToTop";
import { registerSwipeEvent } from "../../../util/windowEvents";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import contractDefinition from "../../../contracts/FlashloanMoneyLego.json";
const Header = (props) => {
  const { bgNoTransparent, data } = props;
  const isLoadingTime = useRef("loading");
  const [isConnect, setIsconnect] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const navbarMenuList = [
    {
      url: "/flashloan",
      name: "Flashloan",
      childrenPage: [],
    },
    {
      url: "/instructions",
      name: "Instructions",
      childrenPage: [
        {
          url: "/instructions/dex",
          name: "Decentralize Exchange (DEX)",
        },
        {
          url: "/instructions/price-strategy",
          name: "Price Strategy",
        },
        {
          url: "/instructions/fee",
          name: "Fee Transaction",
        },
      ],
    },
    {
      url: "/news",
      name: "News",
      childrenPage: [
        {
          url: "/news/aave",
          name: "AAVE protocol",
        },
        {
          url: "/news/link",
          name: "ChainLink protocol",
        },
        {
          url: "/news/comp",
          name: "Compound protocol",
        },
      ],
    },
  ];

  const navRef = useRef(null);
  const router = useRouter();

  const darkmode = useDarkMode();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (bgNoTransparent) {
      navRef.current.classList.add("dark-nav");
    }

    if (!localStorage?.getItem("darkmode")) {
      const hour = new Date().getHours();
      if (hour < 5 || hour >= 19) darkmode.enable();
      else darkmode.disable();
    } else {
      const isDarkmode = localStorage.getItem("darkmode");
      if (isDarkmode == "on") darkmode.enable();
      else darkmode.disable();
    }

    if (darkmode.value) setIsDark(true);
  }, []);

  function wrapToggle() {
    if (darkmode.value) {
      localStorage?.setItem("darkmode", "off");
      // isSnow(false);
      darkmode.disable();
    } else {
      localStorage?.setItem("darkmode", "on");
      // isSnow(true);
      darkmode.enable();
    }
  }

  const scrollEvent = () => {
    if (navRef.current) {
      if (
        isLoadingTime.current === "loading" ||
        isLoadingTime.current === "waiting"
      ) {
        if (isLoadingTime.current !== "waiting") {
          isLoadingTime.current = "waiting";
          const loadingTime = 3000 + 500;
          setTimeout(() => {
            isLoadingTime.current = "end";
            if (window.pageYOffset >= 20) {
              navRef.current.classList.add("dark-nav");
            }
          }, loadingTime);
        }
        return;
      }
      if (bgNoTransparent) {
        navRef.current.classList.add("dark-nav");
      } else {
        if (window.pageYOffset >= 20) {
          navRef.current.classList.add("dark-nav");
        } else {
          navRef.current.classList.remove("dark-nav");
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent, true);

    const cleanupSwipeEvent = registerSwipeEvent(({ direction }) => {
      if (navRef.current) {
        if (direction) navRef.current.classList.add("navbar-hidden");
        else navRef.current.classList.remove("navbar-hidden");
      }
    });

    return () => {
      window.removeEventListener("scroll", scrollEvent, true);
      cleanupSwipeEvent();
    };
  }, [navRef]);

  useEffect(() => {
    // $(".btn-connect").click(() => {
    //   setIsconnect(!isConnect);
    // });
    function toggleDropdown(e) {
      $(this).toggleClass("po-dropdown-open");
    }

    function toggleOpenPopcover(e) {
      $("body").toggleClass("po-open");
      // $(".po-popcover").toggleClass("po-popcover-open");
      [...document.getElementsByClassName("po-popcover")].map((e) =>
        e.classList.toggle("po-popcover-open")
      );
    }

    $(".po-list-dropdown").on("click", toggleDropdown);

    // $(".toggle-open-popcover-button").on("click", toggleOpenPopcover);
    let buttons = [
      ...document.getElementsByClassName("toggle-open-popcover-button"),
    ];

    buttons.map((btn) => btn.addEventListener("click", toggleOpenPopcover));

    return () => {
      $(".po-list-dropdown").off("click", toggleDropdown);
      // $(".toggle-open-popcover-button").off("click", toggleOpenPopcover);
      buttons.map((btn) =>
        btn.removeEventListener("click", toggleOpenPopcover)
      );
    };
  });

  const handleConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer;
    const kovan = {
      name: "kovan",
      networkID: "42",
      erc20: {
        dai: {
          address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
        },
      },
    };
    const contractFlashloanMoneyLegoAddress =
      contractDefinition.networks[kovan.networkID].address;
    try {
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      console.log("signer", signer);
    } catch (err) {
      console.log(err.message);
    }
    if (signer && (await signer.getAddress())) {
      console.log("Connect successfully", signer);
      console.log(
        "logger:",
        contractDefinition.abi,
        contractFlashloanMoneyLegoAddress
      );
      const contractFlashloanMoneyLego = new ethers.Contract(
        contractFlashloanMoneyLegoAddress,
        contractDefinition.abi,
        signer
      );
      console.log("aaa:", contractFlashloanMoneyLego);

      const tx = await contractFlashloanMoneyLego.initateFlashLoan(
        kovan.erc20.dai.address, // We would like to borrow DAI (note override to Kovan address)
        ethers.utils.parseEther("1000"), // We would like to borrow 1000 DAI (in 18 decimals)
        { gasLimit: 4000000 }
      );
      // Inspect the issued transaction
      console.log(tx);
      let receipt = await tx.wait();
      // Inspect the transaction receipt
      console.log("receipt", receipt);
    } else {
      //handle log fail connect
      console.log(
        "logger:",

        contractDefinition.abi
      );
    }
  };
  return (
    <>
      <Head>
        <link key="/css/common.css" rel="stylesheet" href="/css/common.css" />
        <link
          key="/css/header.module.css"
          rel="stylesheet"
          href="/css/header.module.css"
        />
      </Head>

      <nav
        id="navbar"
        ref={navRef}
        className={clsx(
          "navbar navbar-expand-lg navbar-light no-default-spacing home"
        )}
      >
        <a className="navbar-brand no-default-spacing" href="#">
          <img src="/img/logo1.jpg" className="img-navbar-brand" />
        </a>
        <div className="collapse navbar-collapse navbar-menu" id="navbarNav">
          <ul className="navbar-nav">
            {navbarMenuList.map((menu, key) => (
              <li className="nav-item item-navbar-menu" key={key}>
                <div className={clsx("dropdown")}>
                  <div className="hover-o">
                    <div className="hover-t">
                      <a
                        href={menu?.url}
                        className={clsx(
                          "text-navbar-menu",
                          new RegExp(menu.url).test(router.pathname)
                            ? "text-animation-line"
                            : "",
                          menu.childrenPage.length !== 0
                            ? "dropdown-chevron"
                            : ""
                        )}
                      >
                        {menu?.name}
                      </a>
                      <a
                        href={menu?.url}
                        className={clsx(
                          "text-navbar-menu",
                          "text-animation",
                          menu.childrenPage.length !== 0
                            ? "dropdown-chevron-animation"
                            : ""
                        )}
                      >
                        {menu?.name}
                      </a>
                    </div>
                  </div>
                  {menu.childrenPage.length !== 0 && (
                    <div
                      className={
                        menu.childrenPage.length > 4
                          ? "dropdown-layer long-width"
                          : "dropdown-layer"
                      }
                    >
                      <div className="dropdown-body">
                        <ul>
                          {menu.childrenPage.map((item, index) => (
                            <li key={index}>
                              <div>
                                <a href={item.url}>{item.name}</a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <a className="wrap-menu menu-icon-toggle toggle-open-popcover-button">
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </a>

        <div className="po-popcover">
          <div className="po-postition-relative po-fill-full">
            <div className="po-container">
              <div className="po-box-logo-container">
                <div className="po-box-logo">
                  <a className="po-logo" href="#">
                    <img alt="LOGO" src="/img/logo1.jpg" />
                  </a>
                  <img
                    className="po-close-button toggle-open-popcover-button"
                    src="/img/close.svg"
                  />
                </div>
                <div className="po-box-options">
                  <div className="po-box-darkmode">
                    {darkmode.value ? <p>Dark</p> : <p>Light</p>}
                    <label className="po-box-darkmode-switch">
                      <input
                        onClick={wrapToggle}
                        type="checkbox"
                        id="checkbox-dark-mode"
                      />
                      <span
                        className={isDark ? "check-dark-on" : "check"}
                      ></span>
                      <div className="dark-mode-bubble"></div>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="po-list-container">
                {navbarMenuList.length > 0 &&
                  navbarMenuList.map((item, index) => (
                    <li key={index} className="po-list-dropdown">
                      <div
                        className={`po-list-dropdown-text ${
                          item.childrenPage.length > 0 && `po-arrow`
                        }`}
                      >
                        <a href={item.url}> {item.name}</a>
                      </div>
                      <ul className="po-list-dropdown-children">
                        {item.childrenPage.length > 0 &&
                          item.childrenPage.map((subitem, key) => (
                            <li key={key} className="po-list-dropdown-item">
                              <a className="" href={subitem.url} key={key}>
                                <div className="">{subitem.name}</div>
                              </a>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <DarkModeSwitch
          style={{ margin: "0 12px" }}
          className="nav-darkmode-icon hide-on-mobile"
          checked={!!darkmode.value}
          onChange={wrapToggle}
          size={40}
        />
        <div id="login">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="history"
            className="svg-inline--fa fa-history fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"
            ></path>
          </svg>
        </div>
        <div className="box-btn-connect" onClick={handleConnect}>
          {!isConnect ? (
            <div className="btn-connect">
              <p>Connect Wallet</p>
            </div>
          ) : (
            <div className="btn-connect">
              <div className="cover-svg-connect">
                <svg
                  viewBox="0 0 24 24"
                  color="primary"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sc-bdnxRM ACFFk"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z"
                  ></path>
                </svg>
              </div>
              <div className="content-connect">
                <p>0xadb4</p>
                <svg
                  viewBox="0 0 24 24"
                  color="text"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sc-bdnxRM iGEvSN"
                >
                  <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* <ScrollToTop /> */}
    </>
  );
};

export default Header;
