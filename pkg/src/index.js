import React from 'react'

import { Connect } from './FormProvider'
import { BasicSwitch, BasicRadioSwitch } from './customComponents'
import { BasicCheckBox, BasicInput, BasicRadioButton, BasicSelect, BasicTextarea } from './Inputs'

export { FormProvider } from './FormProvider'
export { FieldComponent } from './FieldComponent'

/**
 * Export of the Basic Input Components connected.
 */
export const Input = Connect( BasicInput )
export const Select = Connect( BasicSelect )
export const CheckBox = Connect( BasicCheckBox )
export const RadioButton = Connect( BasicRadioButton )
export const Textarea = Connect( BasicTextarea )

export const Switch = Connect( BasicSwitch )
export const RadioSwitch = Connect( BasicRadioSwitch )

export { BasicRadioButton }// from 'components/BasicRadioButton'
export { Connect }// from 'components/FormProvider'
