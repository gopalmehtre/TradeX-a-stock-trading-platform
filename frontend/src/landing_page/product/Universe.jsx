import React from "react";

export default function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The TradeX Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg" style={{ maxHeight: "60px", Width: "100%" }} />
          <p className="text-small text-muted">Options trading platform </p>
        </div>
        <div className="col-4 p-4 mt-5">
          <img src="media/images/streakLogo.png" style={{ maxHeight: "60px", maxWidth: "100%" }} />
          <p className="text-small text-muted">Systematic Trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" style={{ maxHeight: "60px", maxWidth: "100%" }} />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundhouse.png" style={{ maxHeight: "60px", maxWidth: "100%" }}/>
          <p className="text-small text-muted">Our asset management venture </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{ maxHeight: "60px", maxWidth: "100%" }}/>
          <p className="text-small text-muted">Personal Advice on health insurance.</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" style={{ maxHeight: "60px", maxWidth: "100%" }} />
          <p className="text-small text-muted">Investment research platform</p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

