import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Draggable from "react-draggable";
const Flashswap = (props) => {
  const contract = useSelector((state) => state.main.contract);
  const [value, setValue] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const handleFlashloan = async () => {
    console.log("click", contract, value);
    if (contract) {
      const rs = await contract.getAmountOutMin(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        // "0x54Ac34e5cE84C501165674782582ADce2FDdc8F4",
        ethers.utils.parseEther("1000"),
        // ["0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD", "0xe22da380ee6b445bb8273c81944adeb6e8450422"]
        [
          "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738",
          "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
        ]
      );
      setValue(ethers.utils.formatEther(rs[1]));
      console.log("rs", ethers.utils.formatEther(rs[1]));
    }
    // const contract = localStorage.getItem("contract");
    // console.log(contract);
  };
  useEffect(() => {
    // jQuery(function ($) {
    //   var panelList = $("#draggablePanelList");

    //   panelList.sortable({
    //     // Only make the .panel-heading child elements support dragging.
    //     // Omit this to make then entire <li>...</li> draggable.
    //     handle: ".panel-heading",
    //     update: function () {
    //       $(".panel", panelList).each(function (index, elem) {
    //         var $listItem = $(elem),
    //           newIndex = $listItem.index();

    //         // Persist the new indices.
    //       });
    //     },
    //   });
    // });

    jQuery(function ($) {
      var panelList2 = $("#draggablePanelList2");

      panelList2.sortable({
        // Only make the .panel-heading child elements support dragging.
        // Omit this to make then entire <li>...</li> draggable.
        handle: ".panel-heading",
        update: function () {
          $(".panel", panelList2).each(function (index, elem) {
            var $listItem = $(elem),
              newIndex = $listItem.index();
            console.log(index, "to", newIndex);
            // Persist the new indices.
          });
        },
      });
    });
  });
  return (
    <div>
      <Head>
        <link
          key="/css/flashloan.css"
          rel="stylesheet"
          href="/css/flashloan.css"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw=="
          crossorigin="anonymous"
        />
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"
          integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A=="
          crossorigin="anonymous"
        ></script>
        <script src="https://code.jquery.com/jquery-2.2.0.js"></script>
        <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
      </Head>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          onClick={() => setActiveTab(0)}
          class="btn btn-secondary"
        >
          UNI V1
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(1)}
          class="btn btn-secondary"
        >
          UNI V2
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(2)}
          class="btn btn-secondary"
        >
          UNI V3
        </button>
      </div>
      {activeTab == 0 && (
        <div>
          <p>Flashloan with swap Uniswap V1</p>
          <Draggable>
            <div className="box">
              <div className="box-drag">Block 1</div>
            </div>
          </Draggable>
          <Draggable>
            <div className="box">
              <div className="box-drag">Block 2</div>
            </div>
          </Draggable>
          <Draggable>
            <div className="box">
              <div className="box-drag">Block 3</div>
            </div>
          </Draggable>
          <div className="drag-area"></div>
        </div>
      )}
      {activeTab == 1 && (
        <div className="div-cov">
          <div class="container">
            <div class="row">
              <div class="col-xs-2">
                <div id="draggablePanelList2" class="">
                  <div
                    class="panel panel-default"
                    // style={{ transition: "ease-in-out 3s" }}
                  >
                    <div class="panel-heading">You cand drag this panel.</div>
                    <div class="panel-body">Content hedfsre ...</div>
                  </div>
                  <div
                    class="panel panel-danger"
                    // style={{ transition: "ease-in-out 3s" }}
                  >
                    <div class="panel-heading">You canfd drag this panel.</div>
                    <div class="panel-body">Content hdsfere ...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab == 2 && (
        <div>
          <p>Flashloan with swap Uniswap V3</p>
        </div>
      )}
    </div>
  );
};

export default Flashswap;
