import React from 'react'
import { FieldComponent } from '../FieldComponent'

export class BasicRadioButton extends FieldComponent {

  getDefaultValue(){
    return ''
  }

  handleChangeEvent(){
    if( this.props.disabled ){ return }
    this.setFieldValue( this.props.value )
  }

  render(){
    return (
      <input {...this.getDomProps()}
        type='radio'
        name={this.props.fieldName}
        checked={this.getFieldValue() === this.props.value}
        onChange={this.handleChangeEvent}
        onBlur={this.handleBlurEvent}
        onFocus={this.handleFocusEvent}
      />
    )
  }

}
