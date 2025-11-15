import React from 'react';

function Hero() {
    return(
        <>
        <div className='container p-5 mb-5' >
            <div className='row text-center'>

                <h1 className='mt-5' >Learn. Invest. Grow.</h1>

                <p>Online platform to invest in stocks, derivatives, mutual funds, and more.</p>

                <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"20%", margin: "0 auto"}} >SignUp Now</button>
            </div>
        </div>
        </>
    )
}

export default Hero;