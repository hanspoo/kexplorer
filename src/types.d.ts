export type KafkaSocketEvent = {
  timestamp: string
  value: string
}

interface KafkaAuth {
  ca: string
  bootstrapServer: string
  mechanism: 'scram-sha-512' | 'plain'
  username: string
  password: string
}

export type Medicion = {
  tipo: string
  payload: string
  paciente: string
  idPaciente: number
  imei: number
  fecha: number
}

export interface MedicionGPS extends Medicion {
  lat: number
  lng: number
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    dataTheme?: string
  }
}
