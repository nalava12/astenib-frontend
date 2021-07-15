import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Editor from './app'

ReactDOM.render(<ChakraProvider>
    <Editor />
  </ChakraProvider>,
  document.getElementById('root')
)