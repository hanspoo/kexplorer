import Avatar from 'components/Avatar'

import { Medicion } from 'types'
import ResumenIndicadoresPaciente from '../ResumenIndicadoresPaciente'

type Props = {
  idPaciente: string
  mediciones: Array<Medicion>
}

const Paciente = ({ idPaciente, mediciones }: Props) => {
  if (mediciones.length === 0) return <p>0 mediciones</p>
  const { paciente } = mediciones[0]
  return (
    <div className="my-4 flex items-center justify-between">
      <Avatar label={paciente} />

      <div className="flex-1 pl-2">
        <div className="font-semibold">{paciente}</div>
        <div className="text-sm">
          <ResumenIndicadoresPaciente mediciones={mediciones} />
        </div>
      </div>
      {/* <div className="text-blue-300">{mediciones.length}</div> */}
    </div>
  )
}

export default Paciente
