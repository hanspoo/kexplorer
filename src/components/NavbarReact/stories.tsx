import { ChakraProvider } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import NavbarReact from '.'

export default {
  title: 'NavbarReact',
  component: NavbarReact
} as Meta

export const Default: Story = () => (
  <ChakraProvider>
    <NavbarReact />
  </ChakraProvider>
)
