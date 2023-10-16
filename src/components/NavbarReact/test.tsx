import { render, screen } from '@testing-library/react'

import NavbarReact from '.'

describe('<NavbarReact />', () => {
  it('la barra de navegación debe decir Acticare', () => {
    const { container } = render(<NavbarReact />)

    expect(
      screen.getByRole('heading', { name: 'Acticare' })
    ).toBeInTheDocument()

    // expect(container.firstChild).toMatchSnapshot()
  })
})
