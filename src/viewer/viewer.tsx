import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Viewer from './app'

ReactDOM.render(<ChakraProvider>
    <Viewer />
  </ChakraProvider>,
  document.getElementById('root')
)