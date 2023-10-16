import moment from 'moment'
import React from 'react'

import { useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

import { KafkaSocketEvent } from '../../types'

import { Centered } from 'components/common-components'
import { CustomMessage, prepareMessage } from 'utils'
import TablaPacientes from './TablaPacientes'
import { Spinner } from '@chakra-ui/react'

const topic = 'tmensaje'
const date = moment().subtract(1, 'hour').toISOString()

const ContainerPacientes = () => {
  const [connectionReady, setConnectionReady] = React.useState(false)
  const [error, setError] = React.useState('')
  const [running, setRunning] = React.useState(true)
  const [q, setSearch] = React.useState('')
  const [list, setList] = React.useState<Array<CustomMessage>>([])
  const [socket, setSocket] = React.useState<Socket>()

  useEffect(() => {
    fetch(`/api/kafka-web-socket?date=${date}&topic=${topic}`, {})
      .finally(() => {
        const sock = io()
        setSocket(sock)

        sock.on('connect', () => {
          console.log('connect')
        })
        sock.on('error', (error: string) => {
          setError(error)
        })
        sock.on('connect_error', (error: any) => {
          setError(error)
        })
        sock.on('connect_failed', (error: string) => {
          setError(error)
        })

        sock.on('connection-ready', () => {
          console.log('Recibido connection-ready ****')

          setConnectionReady(true)
        })

        sock.on('kafka-record', (data: string) => {
          if (!running) return

          const msg: KafkaSocketEvent = JSON.parse(data) as KafkaSocketEvent

          const m = [prepareMessage(msg)]
          setList((list) => m.concat(list))
        })

        sock.on('a user connected', () => {
          console.log('a user connected')
        })

        sock.on('disconnect', () => {
          console.log('disconnect')
        })
      })
      .catch((error) => {
        console.log(error)
        setError(JSON.stringify(error))
      })
  }, [running])

  if (error) return <Centered msg={error} />

  if (!connectionReady)
    return (
      <Centered>
        <Spinner />
      </Centered>
    )

  return (
    <div style={{ padding: '1em' }}>
      <TablaPacientes list={list} />
    </div>
  )
}

export default ContainerPacientes
