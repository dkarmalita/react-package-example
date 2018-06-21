import React from 'react'
import {
    Link, Label, FormWrapper,
    FormProvider, TextInputBlock, CheckboxInputBlock, RadioButtonBlock, SelectBlock, RadioButtonBlockEx, TextareaBlock,
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

                  <TextInputBlock
                      label={'Email'}
                      fieldName={'email'}
                      onValidate={isEmailValid}
                      onAsyncUpdate={asyncUpdater}
                      errorMessage={'Enter valid email'}
                      //      disabled={true}
                  />

                  <TextInputBlock
                      type='password'
                      label={'Password'}
                      fieldName={'password'}
                      //      disabled={true}
                  />

                  <TextareaBlock
                      label={'Note'}
                      fieldName={'note'}
                      cols='40' rows='5'
                      //      onChange={(event)=>console.log('onChange', { event })}
                      //      onFocus={(event)=>console.log('onFocus', { event })}
                      //      onBlur={(event)=>console.log('onBlur', { event })}
                      //      onValidate={ isEmailValid }
                      //      errorMessage={ "Enter valid email" }
                      //      disabled={true}
                  />

                  <br /><div>
      The two checkboxes below are linked to the same field.
      The first one is disabled so you will not be able to change it's value directly.
      The second one is enabled and you can change the field's value by clicking on it.

      Pay attanthion that both of the checkboxes become focused in the same time (with the field linked).
                  </div><br />

                  <CheckboxInputBlock
                      label={'Checkbox'}
                      fieldName={'checkbox'}
                      disabled
                  >Checkbox (disabled)</CheckboxInputBlock>

                  <CheckboxInputBlock
                      label={'Checkbox'}
                      fieldName={'checkbox'}
                  >Checkbox</CheckboxInputBlock>

                  <RadioButtonBlock
                      label={'Radiobutton'}
                      fieldName={'radiobutton'}
                      value='radio1'
                      // disabled={true}
                  >Radiobutton A</RadioButtonBlock>

                  <RadioButtonBlock
                      label={'Radiobutton'}
                      fieldName={'radiobutton'}
                      value='radio2'
                  >Radiobutton B</RadioButtonBlock>

                  <RadioButtonBlockEx
                      label={'Radiobutton'}
                      fieldName={'radiobutton'}
                      value='radio3'
                  >Radiobutton C (RadioButtonBlockEx)</RadioButtonBlockEx>

                  <SelectBlock
                      fieldName='select'
                      options={[
                          { value: 'volvo', label: 'Volvo' },
                          { value: 'saab', label: 'Saab' },
                          { value: 'mercedes', label: 'Mercedes' },
                          { value: 'audi', label: 'Audi' },
                      ]}
                  />

                  <br />

                  {/*

Original:
<div className="original-icon"></div>
<br/>

Custom:
<div className="icon"></div>

<svg viewBox="0 0 16 16">
  <use xlinkHref="./arrow-down-thin.svg"></use>
</svg>

<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195.6 107.8"><path fill="#B5B5B5" class="st0" d="M97.8 107.8c-2.6 0-5.1-1-7.1-2.9L2.9 17.1C-1 13.2-1 6.8 2.9 2.9 6.8-1 13.2-1 17.1 2.9l80.7 80.7 80.7-80.7c3.9-3.9 10.2-3.9 14.1 0 3.9 3.9 3.9 10.2 0 14.1l-87.8 87.8c-1.9 2-4.4 3-7 3z"/></svg>

<div className="logo"></div>
<h1>
  <svg viewBox="0 0 32 32">
    <defs>
      <g>
        <circle fill="url(#g1)" r="50" id="sun"/>
      </g>
    </defs>
    <use xlinkHref="#sun"></use>
  </svg>
  Call Me
</h1>

*/}
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
