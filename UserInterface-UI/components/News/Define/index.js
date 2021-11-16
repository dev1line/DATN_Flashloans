import Head from "next/head";
const Define = (props) => {
  const item = props.data.property[0];
  return (
    <div className="container">
      <Head>
        <link key="/css/define.css" rel="stylesheet" href="/css/define.css" />
      </Head>
      <div className="div-section">
        <img src={item.image.original} className="img-define" />
        <div className="content">
          <h2>{item.key}</h2>
          <p>{item.value}</p>
        </div>
      </div>
    </div>
  );
};

export default Define;
