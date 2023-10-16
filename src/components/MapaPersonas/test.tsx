import { render, screen } from '@testing-library/react'

import MapaPersonas from '.'

describe('<MapaPersonas />', () => {
  it('sin datos debe decir cargando', () => {
    const { container } = render(<MapaPersonas mediciones={[]} />)

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })
})
