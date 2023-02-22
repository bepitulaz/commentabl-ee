import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react'

const EMAIL_TEXT =
  'If you provide your email, then you will get notification when someone replies to your comment.'

function CommentForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Box py={1}>
          <FormLabel>Your name</FormLabel>
          <Input type="text" {...register('fullname', { required: true })} />
          <FormErrorMessage></FormErrorMessage>
        </Box>
        <Box py={1}>
          <FormLabel>Your email</FormLabel>
          <Input type="email" {...register('email')} />
          <FormHelperText>{EMAIL_TEXT}</FormHelperText>
        </Box>
        <Box py={1}>
          <FormLabel>Your comment</FormLabel>
          <Textarea
            type="text"
            placeholder="What's on your mind?"
            {...register('comment', { required: true })}
          />
        </Box>
        <Box py={2}>
          <Button type="submit" colorScheme="red">
            Submit my comment
          </Button>
        </Box>
      </FormControl>
    </form>
  )
}

export default CommentForm
