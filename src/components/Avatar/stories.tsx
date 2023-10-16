import { Story, Meta } from '@storybook/react'
import Avatar from '.'

export default {
  title: 'Avatar',
  component: Avatar
} as Meta

export const Default: Story = () => <Avatar label="Juan Pérez" />
export const DefaultCon4Letras: Story = () => (
  <Avatar label="José Miguel Carrera Cruz" />
)
