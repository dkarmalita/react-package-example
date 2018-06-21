import React from 'react'
import { FieldComponent } from '@kard/react-form'// 'components/FieldComponent';
import { BasicRadioButton } from '@kard/react-form'// 'components/BasicRadioButton'
import { Connect } from '@kard/react-form'// 'components/FormProvider'

const combineClasses = (arrOfClasses) => {

    return arrOfClasses.join(' ')

}

export class BasicRadioSwitchEx_ extends BasicRadioButton {

  focused = false;
  getDomProps () {

      const {
          className,
          disabled,
          disabledClass,
          checkedDisabledClass,
          checkedClassName,
          focusedClassName,
          children,
          ...other
      } = super.getDomProps()
      return other

  }
  handleFocusEvent (event) {

      this.focused = true
      super.handleFocusEvent(event)

  }
  handleBlurEvent (event) {

      this.focused = false
      super.handleBlurEvent(event)

  }
  render () {

      return (
          <div
              className={combineClasses([
                  this.props.disabled ? this.props.disabledClass : this.props.className,
                  this.getFieldValue() === this.props.value ? this.props.checkedClassName : null,
                  this.focused ? this.props.focusedClassName : null,
              ])}
              tabIndex='-1'
              onClick={this.handleChangeEvent}
              onBlur={this.handleBlurEvent}
              onFocus={this.handleFocusEvent}
          >{ this.props.children }</div>
      )

  };

};

export const BasicRadioSwitchEx = Connect(BasicRadioSwitchEx_)
