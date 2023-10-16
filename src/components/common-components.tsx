import React from 'react'

export function Centered({
  msg,
  children
}: {
  msg?: string
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em'
      }}
    >
      {msg ? msg : children}
    </div>
  )
}
