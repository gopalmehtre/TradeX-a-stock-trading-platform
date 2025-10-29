import React from 'react'

export default function Hero() {
  return (
    <div className='container border-bottom mb-5' >
        <div className='text-center mt-5 p-3' >
            <h1>Technology.</h1>
            <h3 className='text-muted mt-3 fs-3'>Sleek, Modern, Intuitive trading platform.</h3>
            <p>
                Check out our{" "}
                <a href="" style={{textDecoration: "none"}} >
                    investment offerings {" "}
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </a>
            </p>
        </div>
    </div>
  )
}
