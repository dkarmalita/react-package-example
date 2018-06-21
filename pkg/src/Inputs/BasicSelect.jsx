import React from 'react'
import { FieldComponent } from '../FieldComponent'

export class BasicSelect extends FieldComponent {

  render(){
    return (
      <select {...this.getDomProps()}
        value={this.getFieldValue()}
        onChange={this.handleChangeEvent}
        onBlur={this.handleBlurEvent}
        onFocus={this.handleFocusEvent}
      >{ this.props.children }
      </select>
    )
  }

}
