import React from 'react'

function Fotter() {
  return (
    <footer className="py-4 bg-dark text-white text-center">
        <div className="container">
          <p className="mb-2">
            <i className="fas fa-envelope"></i> support@shopease.com
          </p>
          <div>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="text-white mx-2">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Fotter