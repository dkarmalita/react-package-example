import React from 'react'
import {
    FormProvider,

    CheckBox,
    Input,
    RadioButton,
    Select,

    RadioSwitch,
    Switch,
    Textarea,
} from '@kard/react-form'
import {
    Link, Label, FormWrapper,
} from './styled.components'
import { isEmailValid } from './validators'
import './glob.scss'

import { FormState } from './components/FormState'

const isEmailAcceptable = (email) => !/@yahoo.com\s*$/.test(email)

const asyncUpdater = (fieldState) => new Promise((resolve, reject) => {

    setTimeout(() => {

        const accepted = isEmailAcceptable(fieldState.value)
        resolve({
            ...fieldState,
            accepted,
            asyncErrorMessage: !accepted ? 'yahoo emails are not acceptable' : null,
        })

    }, 1000)

})

export default class ExampleForm extends React.Component {

  state = { formBuffer: {} }
  render () {

      return (
          <FormWrapper>
              <FormProvider
                  onFormReady={(formProvider) => this.formProvider = formProvider}
                  onChange={(formBuffer) => this.setState({ formBuffer })}
                  initialState={{
                      email: 'valid@test.com',
                      checkbox: false,
                      radiobutton: 'radio2',
                      select: 'saab',
                  }}
              >

                  <Input
                      label={'Email'}
                      fieldName={'email'}
                      onValidate={isEmailValid}
                      onAsyncUpdate={asyncUpdater}
                  />
                  <br />
                  <Input
                      type='password'
                      label={'Password'}
                      fieldName={'password'}
                  />
                  <br />
                  <CheckBox
                      label={'Checkbox'}
                      fieldName={'checkbox'}
                  />
                  <br />
                  <RadioButton
                      label={'Radiobutton'}
                      fieldName={'radiobutton'}
                      value='radio1'
                      // disabled={true}
                  />
                  <RadioButton
                      label={'Radiobutton'}
                      fieldName={'radiobutton'}
                      value='radio2'
                  />
                  <br />
                  <Select
                      fieldName='select'
                      options={[
                          { value: 'volvo', label: 'Volvo' },
                          { value: 'saab', label: 'Saab' },
                          { value: 'mercedes', label: 'Mercedes' },
                          { value: 'audi', label: 'Audi' },
                      ]}
                  />
                  <br />
                  <Textarea
                      label={'Note'}
                      fieldName={'note'}
                      cols='40' rows='5'
                  />
                  <br />
                  <Link
                      onClick={() => console.log('Submit', this.formProvider.getFormState())}
                  >Submit</Link>
                  <Link style={{ marginLeft: 10 }}
                      onClick={() => this.formProvider.cancel()}
                  >Cancel</Link>

              </FormProvider>
              <FormState formBuffer={this.state.formBuffer} />
          </FormWrapper>
      )

  }

}
