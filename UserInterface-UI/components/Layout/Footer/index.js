import { convertArrToObject, getData } from "../../../util/converArrayToObject";
import styles from "./style.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import animate from "../../../util/animation";
import useDarkMode from "use-dark-mode";

const groups = [
  {
    url: "/flashloan",
    name: "Flashloan",
    childrenPage: [],
  },
  {
    url: "/instruction",
    name: "Instruction",
    childrenPage: [
      {
        url: "/instruction/dex",
        name: "Decentralize Exchange (DEX)",
      },
      {
        url: "/instruction/price-stock",
        name: "Price Stock",
      },
      {
        url: "/instruction/fee",
        name: "Fee transaction",
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
const Footer = (props) => {
  const darkmode = useDarkMode();
  useEffect(() => {
    animate();
  }, [darkmode.value]);

  useEffect(() => {
    // window.convertArrToObject = convertArrToObject;
    Array.from({ length: groups.length }, (num, index) => {
      $(`#btn-up-${index + 1}`).click(() => {
        $(`#ul-item-${index + 1}`).css({
          display: "none",
          transition: "all 0.5s ease",
        });
        $(`#btn-down-${index + 1}`).css("display", "block");
        $(`#btn-up-${index + 1}`).css("display", "none");
      });
      $(`#btn-down-${index + 1}`).click(() => {
        $(`#ul-item-${index + 1}`).css({
          display: "block",
          transition: "all 0.5s ease",
        });
        $(`#btn-down-${index + 1}`).css("display", "none");
        $(`#btn-up-${index + 1}`).css("display", "block");
      });
    });
  }, []);

  return (
    <>
      <footer id="sticky-s-footer" className={clsx(styles.footer)}>
        <div className={clsx(styles.footerBackground, "footer-dark-mode")}>
          <div
            className={clsx(
              "container-fluid d-flex justify-content-center flex-column ",
              styles.bgBox
            )}
            // style={{ background: "url('img/aave.png') center" }}
          >
            <div className={clsx("container-fluid", styles.containX)}>
              <div className={clsx(styles.groupMapIcon)}>
                <div
                  className={clsx(
                    "d-flex  justify-content-between",
                    styles.groupNapaIcon
                  )}
                >
                  <div className={clsx(styles.wrapIconLogo)}>
                    <img
                      src="/img/logo1.jpg"
                      className={clsx(styles.imgNapa)}
                    />
                    <div className={clsx(styles.socialsIconDeskTop)}>
                      <a href="/">
                        <svg
                          width="40px"
                          color="white"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="linkedin"
                          className="svg-inline--fa fa-linkedin fa-w-14"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                          ></path>
                        </svg>
                      </a>
                      <a href="/">
                        <svg
                          width="40px"
                          color="white"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="facebook-square"
                          className="svg-inline--fa fa-facebook-square fa-w-14"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                          ></path>
                        </svg>
                      </a>
                      <a href="/">
                        <svg
                          width="40px"
                          color="white"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="twitter-square"
                          className="svg-inline--fa fa-twitter-square fa-w-14"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* <div className="pl-0 d-flex justify-content-end">
                  <img src="img/logo2.png" className={clsx(styles.imgMap)} />
                </div> */}
              </div>
              <div className={clsx(styles.half)}>
                <div className={clsx(styles.linksAndsocials)}>
                  {groups.map((page, index) => (
                    <div key={index} className={clsx(styles.groupText)}>
                      <h4>
                        {!!page.url ? (
                          <a href={page.url} className={styles.colorWhite}>
                            {page.name}
                          </a>
                        ) : (
                          page.name
                        )}
                        <span id={`btn-down-${index + 1}`}>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="sort-down"
                            className="svg-inline--fa fa-sort-down fa-w-10"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                          >
                            <path
                              fill="currentColor"
                              d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
                            ></path>
                          </svg>
                        </span>
                        <span
                          id={`btn-up-${index + 1}`}
                          className={clsx(styles.upIcon)}
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="sort-up"
                            className="svg-inline--fa fa-sort-up fa-w-10"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                          >
                            <path
                              fill="currentColor"
                              d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
                            ></path>
                          </svg>
                        </span>
                      </h4>
                      <ul id={`ul-item-${index + 1}`}>
                        {page.childrenPage.map((childPage, key) => (
                          <li key={key}>
                            <a
                              href={childPage.url}
                              className={clsx(styles.liText)}
                              key={key}
                            >
                              {childPage.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className={clsx(styles.socialsIcon)}>
                    <a href="/">
                      <svg
                        width="40px"
                        color="white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="linkedin"
                        className="svg-inline--fa fa-linkedin fa-w-14"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                        ></path>
                      </svg>
                    </a>
                    <a href="/">
                      <svg
                        width="40px"
                        color="white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="facebook-square"
                        className="svg-inline--fa fa-facebook-square fa-w-14"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                        ></path>
                      </svg>
                    </a>
                    <a href="/">
                      <svg
                        width="40px"
                        color="white"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter-square"
                        className="svg-inline--fa fa-twitter-square fa-w-14"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={clsx(
                "d-flex justify-content-center",
                styles.footerPublish
              )}
            >
              <p className="txt-bottom-footer">@Copyright WuanSan</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
