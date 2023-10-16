import { render, screen } from '@testing-library/react'

import TablaPersonas from '.'

describe('<TablaPersonas />', () => {
  it('sin informacion debe indicar no hay datos', () => {
    const { container } = render(<TablaPersonas list={[]} />)

    expect(screen.getByTitle('No hay datos')).toBeInTheDocument()
  })
})
