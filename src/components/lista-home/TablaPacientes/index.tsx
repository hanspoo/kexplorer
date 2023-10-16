import List from '../../List'

import { CustomMessage, mapPorPaciente } from 'utils'
import Paciente from '../Paciente'
import { Centered } from 'components/common-components'

type Props = {
  list: CustomMessage[]
}
export default function TablaPersonas({ list }: Props) {
  if (!list || list.length === 0)
    return (
      <Centered>
        <span title={'No hay datos'}>Espere...</span>
      </Centered>
    )
  const porPaciente = mapPorPaciente(list)

  const n = Object.keys(porPaciente).length
  return (
    <>
      <p className="text-sm font-light text-gray-500">
        Hay {n} persona{n === 1 ? '' : 's'}
      </p>
      <List>
        {Object.keys(porPaciente).map((key) => (
          <Paciente idPaciente={key} key={key} mediciones={porPaciente[key]} />
        ))}
      </List>
    </>
  )
}
