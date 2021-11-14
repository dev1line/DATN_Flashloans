import Head from "next/head";
const Loader = (props) => {
  return (
    <div>
      <Head>
        <link key="css/loader.css" rel="stylesheet" href="css/loader.css" />
      </Head>
      <div class="loader">
        <div class="box box0">
          <div></div>
        </div>
        <div class="box box1">
          <div></div>
        </div>
        <div class="box box2">
          <div></div>
        </div>
        <div class="box box3">
          <div></div>
        </div>
        <div class="box box4">
          <div></div>
        </div>
        <div class="box box5">
          <div></div>
        </div>
        <div class="box box6">
          <div></div>
        </div>
        <div class="box box7">
          <div></div>
        </div>
        <div class="ground">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
