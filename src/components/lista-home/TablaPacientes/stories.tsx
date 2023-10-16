import { Story, Meta } from '@storybook/react'
import mediciones from './kafka-messages.json'
import TablaPersonas from '.'
import { CustomMessage } from 'utils'

export default {
  title: 'TablaPersonas',
  component: TablaPersonas
} as Meta

export const Default: Story = () => <TablaPersonas list={[]} />
export const ConPersonas: Story = () => (
  <TablaPersonas list={mediciones as Array<CustomMessage>} />
)
