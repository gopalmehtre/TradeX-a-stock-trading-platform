import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">404 Not Found ! <i class="fa fa-frown-o" aria-hidden="true"></i></h1>
        <p>
          The page you are trying to access does not exist.
        </p>

        <Link to={'/'}
          className="p-1.5 btn btn-primary fs-5 mb-5 mt-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Home
        </Link>
      </div>
    </div>
    </>
  )
}
