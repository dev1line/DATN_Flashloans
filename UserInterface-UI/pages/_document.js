import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="pt-BR"
        dir="ltr"
        lang="en"
        className="notranslate"
        translate="no"
      >
        <Head>
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width, user-scalable=no, target-densitydpi=device-dpi"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>

          <title>Flashloans</title>

          {/* bootrap cdn */}
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Hina+Mincho&family=New+Tegomin&display=swap"
            rel="stylesheet"
          ></link>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
          ></script>

          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://kit.fontawesome.com/c6253efcfe.js"
            crossorigin="anonymous"
          ></script>
          <script src="https://www.amcharts.com/lib/3/ammap.js"></script>
          <script src="https://www.amcharts.com/lib/3/maps/js/worldLow.js"></script>
          <script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
          <link
            rel="stylesheet"
            href="https://www.amcharts.com/lib/3/plugins/export/export.css"
            type="text/css"
            media="all"
          />
          <script src="https://www.amcharts.com/lib/3/themes/light.js"></script>

          <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
          <script src="https://cdn.amcharts.com/lib/4/maps.js"></script>
          <script src="https://cdn.amcharts.com/lib/4/geodata/worldLow.js"></script>
          <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
          <script src="https://www.amcharts.com/lib/4/geodata/continentsLow.js"></script>
          <script src="https://www.amcharts.com/lib/4/plugins/bullets.js"></script>

          {/* gsap */}
          <script
            type="text/javascript"
            src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"
          ></script>
          <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.3/gsap.min.js"
          ></script>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Montserrat&amp;display=swap"
            rel="stylesheet"
          />

          <script
            type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"
          ></script>
          <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>

          <script
            type="text/javascript"
            src="https://s3.tradingview.com/tv.js"
          ></script>

          <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
          <script src="https://cdn.amcharts.com/lib/5/wc.js"></script>
          <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
        </Head>
        <body>
          <div id="wrapper">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
