import { Story, Meta } from '@storybook/react'
import medsJimmyPage from 'fixtures/medsJimmyPage'

import Paciente from '.'

export default {
  title: 'Paciente',
  component: Paciente
} as Meta

export const Default: Story = () => <Paciente idPaciente="1" mediciones={[]} />
export const ConMediciones: Story = () => (
  <Paciente idPaciente="1" mediciones={medsJimmyPage} />
)
