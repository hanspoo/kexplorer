import { render, screen } from '@testing-library/react'

import Avatar from '.'

describe('<Avatar />', () => {
  it('debe renderear las iniciales del nombre', () => {
    const { container } = render(<Avatar label="Robert Plant" />)

    expect(screen.getByText('RP')).toBeInTheDocument()
  })
})
