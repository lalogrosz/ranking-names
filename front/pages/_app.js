import React from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <main className="main-content mt-1 border-radius-lg">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <h6 className="font-weight-bolder mb-0">Ranking Names</h6>
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              
            </div>
          </div>
        </nav>
        <Component {...pageProps} />
      </main>
    </React.Fragment>
    
  );
}

export default MyApp
