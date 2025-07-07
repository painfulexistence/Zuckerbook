import React, { useState } from 'react'
import Zuckerbar from '../Zuckerbar'
import MessageBoard from '../MessageBoard'

function AppLayout({ children }) {
  const [isMessageOpen, setIsMessageOpen] = useState(false)

  const openMessageBoard = () => {
    setIsMessageOpen(true)
    document.body.style.padding = "0 0 250px 0"
  }

  const closeMessageBoard = () => {
    setIsMessageOpen(false)
    document.body.style.padding = "0 0 50px 0"
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="Zuckerbar">
        <div className="container">
          <Zuckerbar />
        </div>
      </nav>

      <div className="container" id="main">
        {children}
      </div>

      <nav className="navbar navbar-dark bg-dark fixed-bottom">
        <div className="container">
          <div className="text-center w-100">
                        {!isMessageOpen && (
              <button
                id="message-open"
                onClick={openMessageBoard}
                className="btn btn-link"
                type="button"
              >
                <i className="fa fa-chevron-up" />
              </button>
            )}
            {isMessageOpen && (
              <button
                id="message-close"
                onClick={closeMessageBoard}
                className="btn btn-link"
                type="button"
              >
                <i className="fa fa-chevron-down" />
              </button>
            )}
          </div>
          <div className="text-center w-100">
            <MessageBoard isOpen={isMessageOpen} />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppLayout
