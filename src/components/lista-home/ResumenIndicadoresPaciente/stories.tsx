import { Story, Meta } from '@storybook/react'
import medsJimmyPage from 'fixtures/medsJimmyPage'
import ResumenIndicadoresPaciente from '.'

export default {
  title: 'ResumenIndicadoresPaciente',
  component: ResumenIndicadoresPaciente
} as Meta

export const Default: Story = () => (
  <ResumenIndicadoresPaciente mediciones={medsJimmyPage} />
)
