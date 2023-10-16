import { Story, Meta } from '@storybook/react'
import MapaPersonas from '.'

export default {
  title: 'MapaPersonas',
  component: MapaPersonas
} as Meta

export const Default: Story = () => <MapaPersonas mediciones={[]} />
