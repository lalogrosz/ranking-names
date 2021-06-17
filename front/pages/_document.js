import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
          <script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous" ></script>
          <script src="/js/core/popper.min.js" ></script>
          <script src="/js/core/bootstrap.min.js" ></script>
          <script src="/js/plugins/chartjs.min.js" ></script>
          <script src="/js/plugins/Chart.extension.js" ></script>
          
        </Head>
        <body className="g-sidenav-show bg-gray-100">
          <Main />
          <NextScript />   
          <script src="https://buttons.github.io/buttons.js" async defer ></script>
          <script src="/js/soft-ui-dashboard.min.js?v=1.0.2" ></script>       
        </body>
      </Html>
    )
  }
}

export default MyDocument