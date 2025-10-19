import React from 'react'

export default function Hero() {
  return (
    <div className='container' >

        <div className='row'>
            <h1 className='row mt-5'>
                Hello Everyone !
            </h1>
        </div>

        <div className='row p-5 mt-5 border-top text-muted'
        style={{lineHeight: "1.8", fontSize: '1.2em'}}>

            <div className='col-6 p-5' >
                <p>
                    TradeX is a comprehensive stock trading platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js), directly inspired by the successful Zerodha trading application. This full-stack web application provides users with a modern, intuitive interface for stock trading, investment management, and financial education.
                </p>
                <p>
                    The frontend leverages React.js 19.1.1 with Vite for fast development, Bootstrap 5.3.8 for responsive design, and Chart.js for interactive data visualization and stock analysis charts. The backend architecture utilizes Node.js and Express.js to build robust RESTful APIs, while MongoDB serves as the NoSQL database for storing user data, trading information, and market data. Security is implemented through JWT (JSON Web Tokens) for authentication and authorization.
                </p>
            </div>

            <div className='col-6 p-5'>
                <p>
                   Following Zerodha's successful model, TradeX features transparent pricing (₹0 for equity delivery, flat ₹20 for F&O), comprehensive trading options including stocks, IPOs, mutual funds, and derivatives, plus extensive educational resources. The platform emphasizes a clean, professional interface without gamification elements, focusing on serious traders and investors. 
                </p>

                <p>
                    The current implementation includes a complete landing page with modular components showcasing features, pricing, statistics, and educational content. Future enhancements will integrate real-time market data, advanced charting capabilities, portfolio management tools, and mobile applications, creating a complete trading ecosystem that combines modern web technologies with proven trading platform principles.
                </p>
            </div>

        </div>

    </div>
  )
}
