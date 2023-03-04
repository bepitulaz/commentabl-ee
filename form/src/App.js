import { Box, ChakraProvider } from '@chakra-ui/react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

function App({ targetElement }) {
  const hostname = window.location.hostname
  const dataUrl = targetElement.dataset.url

  return (
    <ChakraProvider>
      <Box>
        <CommentForm />
        <CommentList link={window.location.href} />
      </Box>
    </ChakraProvider>
  )
}

export default App
