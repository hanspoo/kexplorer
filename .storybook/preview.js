import '../src/styles/globals.css'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import * as NextImage from 'next/image'
import { ChakraProvider } from '@chakra-ui/react'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
})

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 }
  }
}

export const decorators = [
  (Story) => (
    <ChakraProvider>
      <Story />
    </ChakraProvider>
  )
]
