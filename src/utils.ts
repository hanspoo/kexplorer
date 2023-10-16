import moment, { Moment } from 'moment'
import { KafkaAuth, KafkaSocketEvent, Medicion, MedicionGPS } from './types'

export default function envKafkaAuth(): KafkaAuth {
  return {
    ca: '',
    bootstrapServer: process.env.BOOTSTRAP_SERVER || 'broker:9092',
    mechanism: 'plain',
    username: '',
    password: ''
  }
}

export function capitalize(frase: string): string {
  const words = frase.split(/\s+/g)

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase()
  }

  return words.join(' ')
}

export function elapsed(t: Moment) {
  return elapsedAsString(t, moment())
}
export function elapsedAsString(t1: Moment, t2: Moment) {
  var duration = moment.duration(t2.diff(t1))
  if (duration.asSeconds() === 0) return '0'
  const secs = duration.asSeconds()
  const mins = Math.round(duration.asSeconds() / 60)

  if (mins < 1) return 'un instante'

  const hours = mins / 60
  const hoursFixed = parseInt(hours.toFixed(0))
  if (hoursFixed > 0) {
    return `${hoursFixed} hora${hoursFixed === 1 ? '' : 's'}`
  }
  return `${mins} minuto${mins !== 1 ? 's' : ''}`
}

export function titleCase(str: string) {
  var splitStr = str.toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }

  return splitStr.join(' ')
}

export function fixNombre(paciente: string) {
  return titleCase(paciente).replace(/^(Reloj De|Reloj) /, '')
}

export function iniciales(title: string): string {
  const array = title.split(/\s+/)
  return array
    .map((s) => s.substring(0, 1))
    .join('')
    .toUpperCase()
}

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function numberWithCommas(x: string) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function prepareMessage(msg: KafkaSocketEvent): CustomMessage {
  const m: CustomMessage = {
    value: msg.value,
    date: moment
      .unix(parseFloat(msg.timestamp) / 1000)
      .format('h:mm A')
      .toLowerCase(),
    ts: msg.timestamp
  }
  return m
}

export type CustomMessage = {
  date: string
  ts: string
  value: string
}

export function mapPorPaciente(list: CustomMessage[]) {
  const mediciones = list
    .map((ele) => JSON.parse(ele.value) as Medicion)
    .map((m) => ({ ...m, paciente: fixNombre(m.paciente) }))

  const porPaciente = mediciones.reduce(
    (acc: Record<string, Medicion[]>, iter: Medicion) => {
      const actual = acc[iter.idPaciente]
      if (actual) {
        acc[iter.idPaciente].push(iter)
      } else {
        acc[iter.idPaciente] = [iter]
      }
      return acc
    },
    {}
  )
  return porPaciente
}

export function toMedicionGPS(list: CustomMessage[]): Array<MedicionGPS> {
  const medicionesGPS = list
    .map((ele) => JSON.parse(ele.value) as MedicionGPS)
    .map((med) => ({ ...med, paciente: fixNombre(med.paciente) }))

  const medicionesUnicas = medicionesGPS.reduce(
    (acc: Record<string, MedicionGPS>, iter: MedicionGPS) => {
      const key = `${iter.idPaciente}-${iter.fecha}`
      const obj = acc[key]
      if (obj) return acc

      acc[key] = iter

      return acc
    },
    {}
  )

  const unicas = Object.values(medicionesUnicas) as Array<MedicionGPS>

  return unicas
}
