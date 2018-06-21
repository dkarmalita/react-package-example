import React from 'react'
import { FieldComponent } from '../FieldComponent'

export class BasicTextarea extends FieldComponent {

  render(){
    return (
      <textarea {...this.getDomProps()}
        value={this.getFieldValue() || ''}
        onChange={this.handleChangeEvent}
        onBlur={this.handleBlurEvent}
        onFocus={this.handleFocusEvent}
      />
    )
  }

}
