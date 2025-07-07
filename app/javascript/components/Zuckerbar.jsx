import React, { useState } from 'react'

function Zuckerbar() {
  const [searchKey, setSearchKey] = useState('')

  const isUserSignedIn = false
  const isUserBanned = false

  const handleSearch = (e) => {
    e.preventDefault()
    window.location.href = `/z/posts?key=${encodeURIComponent(searchKey)}`
  }

  const handleSignOut = () => {
    if (confirm("Are you sure to leave?")) {
      window.location.href = '/users/sign_out'
    }
  }

  return (
    <>
      <a className="navbar-brand" href={isUserSignedIn ? '/z/posts' : '/'} id="Zuckerbrand">
        <strong>Zuckerbook</strong>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav me-auto" id="Zucker-search">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              placeholder="Any Keywords"
              className="form-control me-2"
              required
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-light">
              Search
            </button>
          </form>
        </div>

        <div className="navbar-nav" id="Zucker-menu">
          <div className="btn-group" role="group">
            {isUserSignedIn ? (
              <>
                {isUserBanned ? (
                  <span className="badge bg-danger">You've been banned by Zucker</span>
                ) : (
                  <a href="/z/posts/new" className="btn btn-outline-light">
                    <i className="fa fa-pencil" /> Posts
                  </a>
                )}
                <a href="/account" className="btn btn-outline-light">
                  <i className="fa fa-cog" /> Account
                </a>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline-light"
                  type="button"
                >
                  <i className="fa fa-sign-out" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="/sign_up" className="btn btn-outline-light">
                  <i className="fa fa-user-plus" /> Sign Up
                </a>
                <a href="/users/sign_in" className="btn btn-outline-light">
                  <i className="fa fa-sign-in" /> Sign In
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Zuckerbar
