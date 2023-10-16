import moment from 'moment'
import { useState } from 'react'
import { io } from 'socket.io-client'

const topic = 'tmensaje'
const date = moment().subtract(1, 'hour').toISOString()
const url = `/api/kafka-web-socket?date=${date}&topic=${topic}`

export default function Prueba() {
  const [list, setList] = useState([])
  const [error, setError] = useState('')

  function handleErrors(causa: string, err: unknown) {
    setError(`${causa}: ${JSON.stringify(err)}`)
  }

  console.log('conectando a ' + url)

  const socket = io(url, {})

  socket.on('update', (data) => console.log(data))

  socket.on('connect_error', (err) => handleErrors('connect_error', err))
  socket.on('connect_failed', (err) => handleErrors('connect_failed', err))
  socket.on('disconnect', (err) => handleErrors('disconnect', err))

  if (error) return <p>{error}</p>

  return <p>hay {list.length} mensajes</p>
}
