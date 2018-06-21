import React from 'react'
import { FieldComponent } from '../FieldComponent'

export class BasicCheckBox extends FieldComponent {

  getDefaultValue(){
    return false
  }

  handleChangeEvent( event ){
    if( this.props.disabled ){ return }
    this.setFieldValue( !this.getFieldValue())
  }

  render(){
    return (
      <input {...this.getDomProps()}
        type='checkbox'
        name={this.props.fieldName}
        checked={this.getFieldValue() || false}
        onChange={this.handleChangeEvent}
        onBlur={this.handleBlurEvent}
        onFocus={this.handleFocusEvent}
      />
    )
  }

}
