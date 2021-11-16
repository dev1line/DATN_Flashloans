import Head from "next/head";

const Banner = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <Head>
        <link key="/css/banner.css" rel="stylesheet" href="/css/banner.css" />
      </Head>

      <div className="main-cover">
        <div
          className="bg-cover"
          style={{
            backgroundImage: `url(${props.data.property[0].image.original})`,
            backgroundColor: "grey",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
