import { render, screen } from '@testing-library/react'

import List from '.'

describe('<List />', () => {
  it('should render the heading', () => {
    const { container } = render(
      <List>
        <span>List children</span>
      </List>
    )

    expect(screen.getByText(/List children/)).toBeInTheDocument()
  })
})
