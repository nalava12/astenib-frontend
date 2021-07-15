import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './app'

ReactDOM.render(<ChakraProvider>
    <Main />
  </ChakraProvider>,
  document.getElementById('root')
)