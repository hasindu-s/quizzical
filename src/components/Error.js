import React from 'react'

export default function Error({message}) {
  return (
    <div className="error-container">
      <h1 className="error-header">Oops! Looks like somethings wrong</h1>
      <h2 className="error-message">Error: {message}</h2>
    </div>
  )
}
