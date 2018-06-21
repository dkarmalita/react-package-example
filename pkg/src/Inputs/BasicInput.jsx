import React from 'react'
import { FieldComponent } from '../FieldComponent'

export class BasicInput extends FieldComponent {

  render(){
    return (
      <input {...this.getDomProps()}
        type={this.props.type || 'text'}
        value={this.getFieldValue() || ''}
        onChange={this.handleChangeEvent}
        onBlur={this.handleBlurEvent}
        onFocus={this.handleFocusEvent}
      />
    )
  }

}
