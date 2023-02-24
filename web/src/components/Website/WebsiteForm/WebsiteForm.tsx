import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditWebsiteById, UpdateWebsiteInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormWebsite = NonNullable<EditWebsiteById['website']>

interface WebsiteFormProps {
  website?: EditWebsiteById['website']
  onSave: (data: UpdateWebsiteInput, id?: FormWebsite['id']) => void
  error: RWGqlError
  loading: boolean
}

const WebsiteForm = (props: WebsiteFormProps) => {
  const onSubmit = (data: FormWebsite) => {
  
    
    
  
    props.onSave(data, props?.website?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormWebsite> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="domain"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Domain
        </Label>
        
          <TextField
            name="domain"
            defaultValue={props.website?.domain}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="domain" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WebsiteForm
