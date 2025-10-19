import React from 'react'

export default function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">About Me.</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/undraw_developer-avatar_f6ac.png"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Gopal Mehtre</h4>
          <h6>Full Stack Developer.</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            I’m a passionate Full Stack Developer skilled in building scalable, user-focused web applications using modern technologies across both front-end and back-end. I specialize in developing robust APIs, integrating databases, and crafting intuitive user interfaces with technologies like React, Node.js, Express, and MongoDB. With a strong understanding of system architecture and deployment workflows, I aim to deliver seamless, high-performance solutions that bridge business needs with technical innovation.
          </p>
          <p>
            Connect on : <a href="https://github.com/gopalmehtre">Github</a> /
            <a href="https://www.linkedin.com/in/gopal-mehtre-332a10257/">LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
  )
}
