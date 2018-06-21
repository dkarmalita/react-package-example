/**
 * We need custom components in different special cases. The most famous of them is stylization of radio-buttons and check-boxes.
 */
import React from 'react'
import { FieldComponent } from './FieldComponent'

import { BasicCheckBox, BasicRadioButton, BasicSelect } from './Inputs'
/**
 * [x] Input Type Radio
 * [x] Input Type Checkbox
 * [x] Input Type Text ( Password/Color )
 * [x] HTML5 Input Types
 *    [x] color
 *    [x] date
 *    [x] datetime-local
 *    [x] email
 *    [x] month
 *    [x] number
 *    [x] range
 *    [x] search
 *    [x] tel
 *    [x] time
 *    [x] url
 *    [x] week
 * [x] name -> fieldName
 * [x] FormComponent & move to context
 * [e] Eliminate superfluous renders with shouldComponentUpdate.
 * [x] onBlur, onFocus form-wide events
 * [x] validation
 * [x] onBlur validation
 * [x] async validation
 * [ ] setFocus
 */

// ==========================================================================

export class BasicSwitch extends BasicCheckBox {
  render(){
    return (
      <div
        { ...this.getDomProps() }
        tabIndex='-1'
        onClick={ this.handleChangeEvent }
        onBlur={ this.handleBlurEvent }
        onFocus={ this.handleFocusEvent }
      >{ this.props.children }</div>
    )
  }
}

export class BasicRadioSwitch extends BasicRadioButton {
  render(){
    return (
      <div
        { ...this.getDomProps() }
        tabIndex='-1'
        onClick={ this.handleChangeEvent }
        onBlur={ this.handleBlurEvent }
        onFocus={ this.handleFocusEvent }
      >{ this.props.children }</div>
    )
  }
}
