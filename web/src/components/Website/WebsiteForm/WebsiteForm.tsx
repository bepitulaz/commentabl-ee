import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormLabel,
  Heading,
} from '@chakra-ui/react'

import { Form, FormError, FieldError, TextField } from '@redwoodjs/forms'

const WebsiteForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.website?.id)
  }

  return (
    <Box maxW="4xl">
      <Card>
        <CardHeader borderBottom="1px solid" borderBottomColor="gray.100">
          <Heading as="h4" size="md">
            General information
          </Heading>
        </CardHeader>
        <Form onSubmit={onSubmit} error={props.error}>
          <CardBody pt={0}>
            <FormError
              error={props.error}
              wrapperClassName="rw-form-error-wrapper"
              titleClassName="rw-form-error-title"
              listClassName="rw-form-error-list"
            />

            <FormLabel>Domain</FormLabel>

            <TextField
              name="domain"
              defaultValue={props.website?.domain}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />

            <FieldError name="domain" className="rw-field-error" />
          </CardBody>

          <CardFooter bgColor="gray.50" py={3}>
            <Flex width="100%" justifyContent="end">
              <Button type="submit" colorScheme="teal" disabled={props.loading}>
                Save
              </Button>
            </Flex>
          </CardFooter>
        </Form>
      </Card>
    </Box>
  )
}

export default WebsiteForm
