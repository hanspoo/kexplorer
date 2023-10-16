import 'styles/globals.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'
import NavbarReact from 'components/NavbarReact'

const theme = extendTheme({
  colors: {
    colors: {
      gray: {
        100: '#fafafa',
        200: '#f7f7f7'
      }
    },
    brand: {
      100: '#2e6dfa',
      900: '#2e6dfa'
    }
  }
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavbarReact />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
