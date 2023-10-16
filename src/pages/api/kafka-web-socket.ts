import { Message } from 'kafkajs'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

import { KafkaAuth, KafkaSocketEvent } from '../../types'

import envKafkaAuth from '../../utils'
import KafkaConsumer from 'backend/KafkaConsumer'

interface CustomNextApiResponse extends NextApiResponse {
  socket: any
}
export default function kafkaWebSockets(
  req: NextApiRequest,
  res: CustomNextApiResponse
) {
  // if (!res.socket.server.io) {
  // console.log("Creando socket");

  const topic = req.query.topic + ''
  if (!topic) throw Error('Debe venir el tópico')

  const { persona } = req.query

  const date = req.query.date ? moment(req.query.date) : moment()

  const auth: KafkaAuth = envKafkaAuth()

  const io = new Server(res.socket.server)

  io.on('connection', (socket) => {
    function connectionReady() {
      socket.emit('connection-ready')
    }
    function kafkaError(msg: string): void {
      socket.emit('error', msg)
    }
    socket.broadcast.emit('a user connected')
    socket.on('stop', (_msg: unknown) => {
      socket.disconnect()
    })
    // setInterval(() => {
    //   socket.emit("hello", "world!");
    // }, 3000);
    if (!auth) throw Error('No viene el ambiente')
    new KafkaConsumer(
      date.valueOf(),
      auth,
      topic,
      (msg: Message) => {
        const event: KafkaSocketEvent = {
          timestamp: msg.timestamp!,
          value: msg.value!.toString()
        }

        socket.emit('kafka-record', JSON.stringify(event))
      },
      connectionReady,
      kafkaError
    ).run()
  })

  res.socket.server.io = io
  res.end()
}
