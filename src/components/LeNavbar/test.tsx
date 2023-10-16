import { render, screen } from '@testing-library/react'

import LeNavbar from '.'

describe('<LeNavbar />', () => {
  it('should render the heading', () => {
    const { container } = render(
      <LeNavbar title="Menu Importante" navItems={[]} />
    )

    expect(
      screen.getByRole('heading', { name: /Menu Importante/i })
    ).toBeInTheDocument()
  })
})
