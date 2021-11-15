import Head from "next/head";
const Guide = (props) => {
  return (
    <div className="box-container">
      <Head>
        <link key="css/guide.css" rel="stylesheet" href="css/guide.css" />
      </Head>
      <div className="grid-row">
        <h4>
          Manage your wealth with this flashloans{" "}
          <span className="dot-line">Invest</span>
        </h4>
        <div className="box-scroll">
          <div className="vid">
            <img src="https://furucombo.app/static/media/navigation.1a882cbe.gif" />
          </div>
          <div className="box-text">
            <div className="box-text-item">
              <h4>Invest mode</h4>
              <p>
                Explore and Invest in Furucombo&apos;s wealth management farms
                with ease and let us help you make the most of your money
              </p>
            </div>
            <div className="box-text-item">
              <h4>Create and Learn</h4>
              <p>
                Learn from the pre-built strategies to create customized
                transactions simply by drag-and-drop with the visualized DeFi
                cubes
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3>
        Optimize your crypto like a Pro with the exclusive features and{" "}
        <span className="dot-line">customization</span> of your choice
      </h3>
      <div className="grid-column">
        <div className="column">
          <img src="https://furucombo.app/static/media/automation.a88b3e24.gif" />
          <h3>Automation</h3>
          <p>
            Auto re-invest your rewards to optimize the return. Auto-trade your
            tokens to rebalance your portfolio. You decide - it’s your bot
          </p>
        </div>
        <div className="column">
          <img src="https://furucombo.app/static/media/flashloan.b62af66b.gif" />
          <h3>Flashloans</h3>
          <p>
            Execute collateral-swaps, debt-swaps, or create a leveraged long or
            short position - all in one transaction with flashloans
          </p>
        </div>
        <div className="column">
          <img src="https://furucombo.app/static/media/mev.83037312.gif" />
          <h3>Private Transactions</h3>
          <p>
            Send out your transaction in a secret channel to prevent
            front-runners from taking advantage of your idea and to protect your
            return
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
