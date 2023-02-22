import { Box, ChakraProvider } from '@chakra-ui/react'
import CommentForm from './CommentForm'

function App({ targetElement }) {
  const hostname = window.location.hostname
  const dataUrl = targetElement.dataset.url

  return (
    <ChakraProvider>
      <Box>
        <CommentForm />
      </Box>
    </ChakraProvider>
  )
}

export default App
