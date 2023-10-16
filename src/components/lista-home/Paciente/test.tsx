import { render, screen } from '@testing-library/react'

import Paciente from '.'

describe('<Paciente />', () => {
  describe('Sin mediciones', () => {
    it('debe mostrar cero mediciones', () => {
      const { container } = render(<Paciente idPaciente="1" mediciones={[]} />)

      expect(screen.getByText(/.*0 mediciones.*/)).toBeInTheDocument()
    })
  })
})
