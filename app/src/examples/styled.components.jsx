import React from 'react'
import styles from './styled.components.module.scss'
import {
    FormProvider,
    Input,
    Select,
    CheckBox,
    RadioButton,
    Switch,
    RadioSwitch,
    Textarea,
} from '@kard/react-form'

export { FormProvider }

import { BasicRadioSwitchEx } from './exComponents'

import { Label } from 'components/examples'

import './style.css'

/**
 * combineClasses is a helper which allows to transfer an array of classes into a string suitable for the className property.
 * @param  {Array} arrOfClasses - array of class name strings to combine (null is acceptable too)
 * @return {String} - a string suitable for className property
 */
const combineClasses = ( arrOfClasses ) => {
  return arrOfClasses.join( ' ' )
}

export const ErrorBaner = (props) => <div {...props} className={styles.errorMessage} />

export class CheckboxInputBlock extends React.Component {

  state = {}

  handleStateChange = (fieldState) => {
    this.setState( fieldState )
  }

  render () {
    const chackedClassName = this.state.value ? ' checked' : ''
    return (
      <div className="squaredFour">
        <Switch {...this.props}
          className={`squaredFour__checkmark${chackedClassName}`}
          onStateChange={this.handleStateChange}
        />
      </div>
    )
  }

}

export class TextInput extends React.Component {

  state = {}

  handleStateChange = ( state ) => {
    this.setState({...state})
  }

  renderErrors = () => (this.state.errors || []).map( (errMsg, idx) => (
    <ErrorBaner key={idx}>{ errMsg }</ErrorBaner>
  ))

  render () {

    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div style={{ flexBasis: '48%', marginBottom: 20, ...style }}>
        <Label>{ label }</Label>
        <Input {...cleanProps}
          className={styles.textInput}
          onStateChange={this.handleStateChange}
        />
        {this.renderErrors()}
      </div>
    )
  }
}

export class RadioButtonBlock extends React.Component {

  render () {
    const fieldValue = this.inputRef ? this.inputRef.getFieldValue() : ''
    const chackedClassName = fieldValue === this.props.value ? ` ${styles.radio__text__checked}` : ''
    const focusedClassName = this.focused ? ` ${styles.radio__text__focused}` : ''
    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div style={{ flexBasis: '48%', marginBottom: 20, ...style }}>
        <Label>{ label }</Label>
        <RadioSwitch {...cleanProps}
          onBlur={ ( event )=>{ this.focused = false } }
          onFocus={ ( event )=>{ this.focused = true } }
          onReady={ (inputRef)=>{ this.inputRef = inputRef } }
          className={ `${styles.radio__text}${chackedClassName}${focusedClassName}` }
        >{ this.props.children }</RadioSwitch>
      </div>
    )
  }
}

export class TextareaBlock extends React.Component {

  render () {
    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div>
        <Label>{ label }</Label>
        <Textarea
          {...this.props}
          className={`${styles.textarea} ${this.props.className}`}
        />
      </div>
    )
  }
}

export class SelectBlock extends React.Component {

  renderOptions(options){ return options.map( option => <option
    key={ option.value } value={ option.value }>{ option.label }</option> )
  };

  render () {

    const { label, errorMessage, style, ...cleanProps } = this.props
    return (
      <div style={{ flexBasis: '48%', marginBottom: 20, ...style }}>
        <Label>{ label }</Label>
        <Select {...cleanProps}
          className={styles.select}
          //          checkedClassName={ styles.radio__text__checked }
          //          focusedClassName={ styles.radio__text__focused }
        >{ this.renderOptions( this.props.options ) }</Select>
      </div>
    )
  }
}
