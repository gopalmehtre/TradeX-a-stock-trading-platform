import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <h3 style={{color: "#0080ff"}}><i class="fa fa-line-chart" aria-hidden="true"></i> TradeX</h3>
            <p>
              &copy; 2022-2026, TradeX Broking Ltd. <br /> All rights reserved.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="">About</a>
            <br />
            <a href="">Products</a>
            <br />
            <a href="">Pricing</a>
            <br />
            <a href="">Referral programme</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">TradeX.tech</a>
            <br />
            <a href="">Press & media</a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="">Contact</a>
            <br />
            <a href="">Support portal</a>
            <br />
            <a href="">List of charges</a>
            <br />
            <a href="">Downloads & resources</a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="">Open an account</a>
            <br />
            <a href="">Fund transfer</a>
            <br />
            <a href="">60 day challenge</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>

          <p>
            TradeX is a comprehensive stock trading platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js), directly inspired by the successful Zerodha trading application. This full-stack web application provides users with a modern, intuitive interface for stock trading, investment management, and financial education.

            The frontend leverages React.js 19.1.1 with Vite for fast development, Bootstrap 5.3.8 for responsive design, and Chart.js for interactive data visualization and stock analysis charts. The backend architecture utilizes Node.js and Express.js to build robust RESTful APIs, while MongoDB serves as the NoSQL database for storing user data, trading information, and market data. Security is implemented through JWT (JSON Web Tokens) for authentication and authorization.

            The current implementation includes a complete landing page with modular components showcasing features, pricing, statistics, and educational content. Future enhancements will integrate real-time market data, advanced charting capabilities, portfolio management tools, and mobile applications, creating a complete trading ecosystem that combines modern web technologies with proven trading platform principles.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;