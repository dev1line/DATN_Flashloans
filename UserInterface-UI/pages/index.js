import { useState, useEffect } from "react";
import Banner from "../components/Homepage/Banner/index.js";
import Guide from "../components/Homepage/Guide/index.js";
import Chart from "../components/Flashloans/Chart";
import StockView from "../components/Homepage/StockView/index.js";
import { useDispatch, useSelector } from "react-redux";
const SwitchButton = (props) => {
  const [isLive, setIsLive] = useState(false);
  const token = useSelector((state) => state.main.name);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("isLive", isLive);
    if (isLive) dispatch({ type: "SET_NAME", payload: "A" });
    else dispatch({ type: "SET_NAME", payload: "B" });
  }, [isLive]);
  console.log(token);
  return (
    <div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsLive(false)}
        >
          Static
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsLive(true)}
        >
          Live
        </button>
        <p>
          {token}: {isLive ? "1" : "0"}
        </p>
      </div>
      <div>{isLive ? <Chart /> : <StockView />}</div>
    </div>
  );
};
function HomePage(props) {
  return (
    <div className="root-container">
      <Banner />
      <div className="container">
        <Guide />
        <SwitchButton />
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   userInfo: state.main,
// });

// const mapDispatchToProps = {
//   userSignUp,
//   userSignIn,
//   signOut,
//   restore,
// };

export default HomePage;
