import { render, screen } from '@testing-library/react'

import ResumenIndicadoresPaciente from '.'

describe('<ResumenIndicadoresPaciente />', () => {
  it('should render the heading', () => {
    const { container } = render(<ResumenIndicadoresPaciente mediciones={[]} />)

    expect(screen.getByText('No hay datos')).toBeInTheDocument()
  })
})
