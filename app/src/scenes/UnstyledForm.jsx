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

// import { isEmailValid } from 'examples/validators'
import 'examples/glob.scss'

import { FormState, Link, Label, FormWrapper } from 'components/examples'

const isEmailAcceptable = (email) => !/@yahoo.com\s*$/.test(email)

const isEmailValid = (email) => {

    const result = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g
        .test(email)
    return result

}

const isValid = (value) => {

    console.log('isValid', value)
    return true

}

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

/**
 * Validator should return an array of errors (messages or ids). Field become valid
 * if the array contains no elements. Othe case, the field become valid.
 * @param  {Any} value - field value to check
 * @param  {Array} errors - current array of the field's errors
 * @param  {[type]} invalidator - invalidator function that can be used in async
 * @return {Array} - updated array of the field errors
 */
const validatorExample = (value, errors, formState, invalidator) => {

    setTimeout(
        () => invalidator(value, [ 'Async Error A', 'Async Error B' ]),
        2000,
    )
    return []// ['Sync A', 'Sync B']

}

const marginBottom = 3

export class UnstyledForm extends React.Component {

  // This buffer is only neccesary for field monitor
  state = { formBuffer: {} }
  renderWithErrors () {

      return (
          <div>
              <Input
                  style={{ marginBottom: marginBottom }}
                  fieldName={'email'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              />
              <br />
              <Input
                  style={{ marginBottom: marginBottom }}
                  type='password'
                  fieldName={'password'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              />
              <br />
              <CheckBox
                  style={{ marginBottom: marginBottom }}
                  fieldName={'checkbox'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              />
              <br />
              <RadioButton
                  style={{ marginBottom: marginBottom }}
                  fieldName={'radiobutton'}
                  value='radio1'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              />
              <RadioButton
                  style={{ marginBottom: marginBottom }}
                  fieldName={'radiobutton'}
                  value='radio2'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              />
              <br />
              <Select
                  style={{ marginBottom: marginBottom }}
                  fieldName='select'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              >
                  <option value='volvo'>Volvo</option>
                  <option value='saab'>Saab</option>
                  <option value='mercedes'>Mercedes</option>
                  <option value='audi'>Audi</option>
              </Select>
              <br />
              <Textarea
                  style={{ marginBottom: marginBottom }}
                  fieldName={'note'}
                  cols='40' rows='5'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
              />
          </div>
      )

  }

  renderSimple () {

      // return this.renderWithErrors()
      return (
          <FormWrapper>
              <FormProvider
                  onFormReady={(formProvider) => this.formProvider = formProvider}
                  onChange={(formBuffer) => this.setState({ formBuffer })}
                  initialValues={{
                      email: 'valid@test.com',
                      // checkbox: true,
                      radiobutton: 'radio2',
                      select: 'saab',
                  }}
              >

                  <Input
                      style={{ marginBottom: marginBottom }}
                      fieldName={'email'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <Input
                      style={{ marginBottom: marginBottom }}
                      type='password'
                      fieldName={'password'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <CheckBox
                      style={{ marginBottom: marginBottom }}
                      fieldName={'checkbox'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <RadioButton
                      style={{ marginBottom: marginBottom }}
                      fieldName={'radiobutton'}
                      value='radio1'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <RadioButton
                      style={{ marginBottom: marginBottom }}
                      fieldName={'radiobutton'}
                      value='radio2'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <Select
                      style={{ marginBottom: marginBottom }}
                      fieldName='select'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  >
                      <option value='volvo'>Volvo</option>
                      <option value='saab'>Saab</option>
                      <option value='mercedes'>Mercedes</option>
                      <option value='audi'>Audi</option>
                  </Select>
                  <br />
                  <Textarea
                      style={{ marginBottom: marginBottom }}
                      fieldName={'note'}
                      cols='40' rows='5'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <button
                      onClick={() => {

                          console.log('Submit', this.formProvider.getFormState())
                          this.formProvider.setBlocked(true)
                          setTimeout(
                              () => {

                                  this.formProvider.invalidateForm({
                                      select: [ 'ErrA', 'ErrB' ],
                                  })
                                  this.formProvider.setBlocked(false)
                                  console.log('Submitted:', this.formProvider.getFormState())

                              }, 4000
                          )

                      }}
                  >Submit</button>
                  <button style={{ marginLeft: 10 }}
                      onClick={() => this.formProvider.reset(() => console.log('Cancel', this.formProvider.getFormState()))}
                  >Cancel</button>

              </FormProvider>
              <FormState formBuffer={this.state.formBuffer} />
          </FormWrapper>
      )

  }

  renderAdditionalInputs (){
    return (
      <div>
        <Input
            style={{ marginBottom: marginBottom }}
            type='color'
            fieldName={'color'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

        <Input
            style={{ marginBottom: marginBottom }}
            type='date'
            fieldName={'date'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

        <Input
            style={{ marginBottom: marginBottom }}
            type='datetime-local'
            fieldName={'datetime-local'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

        <Input
            style={{ marginBottom: marginBottom }}
            type='datetime-local'
            fieldName={'datetime-local'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

        <Input
            style={{ marginBottom: marginBottom }}
            type='email'
            fieldName={'email'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='number'
            fieldName={'number'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='range'
            fieldName={'range'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='search'
            fieldName={'search'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='tel'
            fieldName={'tel'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='time'
            fieldName={'time'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='url'
            fieldName={'url'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />

         <Input
            style={{ marginBottom: marginBottom }}
            type='week'
            fieldName={'week'}
        // onValidate={ validatorExample }
        // disabled
        // onShouldUpdate={(nextState,formState)=>true}
        // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
        // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
        />
        <br />
      </div>
    )
  }

  render () {

      // return this.renderWithErrors()
      return (
          <FormWrapper>
              <FormProvider
                  onFormReady={(formProvider) => this.formProvider = formProvider}
                  onChange={(formBuffer) => this.setState({ formBuffer })}
                  initialValues={{
                      email: 'valid@test.com',
                      checkbox: true,
                      radiobutton: 'radio2',
                      select: 'saab',
                      color: '#00ffff',
                  }}
              >

                {this.renderAdditionalInputs()}

                  <Input
                      style={{ marginBottom: marginBottom }}
                      fieldName={'email'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <Input
                      style={{ marginBottom: marginBottom }}
                      type='password'
                      fieldName={'password'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <CheckBox
                      style={{ marginBottom: marginBottom }}
                      fieldName={'checkbox'}
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <RadioButton
                      style={{ marginBottom: marginBottom }}
                      fieldName={'radiobutton'}
                      value='radio1'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <RadioButton
                      style={{ marginBottom: marginBottom }}
                      fieldName={'radiobutton'}
                      value='radio2'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>true}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <Select
                      style={{ marginBottom: marginBottom }}
                      fieldName='select'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  >
                      <option value='volvo'>Volvo</option>
                      <option value='saab'>Saab</option>
                      <option value='mercedes'>Mercedes</option>
                      <option value='audi'>Audi</option>
                  </Select>
                  <br />
                  <Textarea
                      style={{ marginBottom: marginBottom }}
                      fieldName={'note'}
                      cols='40' rows='5'
                  // onValidate={ validatorExample }
                  // disabled
                  // onShouldUpdate={(nextState,formState)=>false}
                  // onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
                  // onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
                  />
                  <br />
                  <button
                      onClick={() => {

                          console.log('Submit', this.formProvider.getFormState())
                          this.formProvider.setBlocked(true)
                          setTimeout(
                              () => {

                                  this.formProvider.invalidateForm({
                                      select: [ 'ErrA', 'ErrB' ],
                                  })
                                  this.formProvider.setBlocked(false)
                                  console.log('Submitted:', this.formProvider.getFormState())

                              }, 4000
                          )

                      }}
                  >Submit</button>
                  <button style={{ marginLeft: 10 }}
                      onClick={() => this.formProvider.reset(() => console.log('Cancel', this.formProvider.getFormState()))}
                  >Cancel</button>

              </FormProvider>
              <FormState formBuffer={this.state.formBuffer} />
          </FormWrapper>
      )

  }
}
