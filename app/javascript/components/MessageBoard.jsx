import React, { useState } from 'react'

function MessageBoard({ isOpen }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="panel" id="message-board" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="panel-body" id="messages">
      </div>
      <div className="panel-footer" id="message-write">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your message"
            id="messageInput"
            className="form-control"
            required
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ display: 'none' }}>
            send
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageBoard
