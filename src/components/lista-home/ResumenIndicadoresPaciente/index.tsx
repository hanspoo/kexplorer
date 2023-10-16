import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

import { Medicion } from 'types'
import { elapsed, numberWithCommas } from 'utils'

type Props = {
  mediciones: Array<Medicion>
}

export default function ResumenIndicadoresPaciente({ mediciones }: Props) {
  const [tipo, setTipo] = React.useState('')

  if (!mediciones || mediciones.length === 0) return <div>No hay datos</div>

  function mostrarHist(tipo: string) {
    setTipo(tipo)
  }
  const cerrar = () => setTipo('')

  const porTipo: Record<string, Medicion[]> = mediciones.reduce(function (
    acc: Record<string, Medicion[]>,
    medicion: Medicion
  ) {
    const entrada = acc[medicion.tipo]
    if (entrada) {
      acc[medicion.tipo].push(medicion)
    } else {
      acc[medicion.tipo] = [medicion]
    }
    return acc
  },
  {})

  function toggleVisible() {
    setTipo('')
  }

  const titulo = tipo.replace(/^Medicion/, '')
  const modalIsOpen = !!tipo
  return (
    <>
      <Modal isOpen={modalIsOpen} onClose={toggleVisible}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Historial ${titulo}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <table style={{ width: '100%' }}>
              {porTipo[tipo] &&
                porTipo[tipo].map(({ payload, fecha }, index) => (
                  <tr key={index}>
                    <td>{moment.unix(fecha).format('HH:mm')}</td>
                    <td style={{ textAlign: 'right' }}>{payload}</td>
                  </tr>
                ))}
            </table>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={toggleVisible}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {Object.keys(porTipo).map((tipo, index) => {
        const { payload, fecha } = porTipo[tipo][0]
        const payloadFormatted = /^\d+/.test(payload)
          ? numberWithCommas(payload)
          : payload
        return (
          <div
            onClick={() => mostrarHist(tipo)}
            key={tipo}
            style={{
              cursor: 'pointer',
              margin: 0,
              padding: 0,
              fontSize: '0.9em'
            }}
          >
            <b className="text-sm">{payloadFormatted}</b>,{' '}
            <span className="text-slate-400">
              {tipo.replace(/^Medicion/, '')}, hace{' '}
              {elapsed(moment.unix(fecha))}
            </span>
          </div>
        )
      })}
    </>
  )
}
