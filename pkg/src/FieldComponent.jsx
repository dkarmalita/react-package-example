import React from 'react'
import {
  isObjectsEqual,
  combineArrays,
} from './utils'

// eslint-disable-next-line camelcase
const helpLink_formBoundaries = 'http://example.com'

/**
 * Properties:
 *
 * formLink={...}
 * type='password'
 * fieldName={'password'}
 * disabled
 * onReady={ (inputRef)=>{ this.inputRef = inputRef } }
 * onValidate={ (value, errors, formState, invalidator)=>['error1', 'eerror2'] }
 * onShouldUpdate={(nextState,formState)=>true}
 * onFocusChange={(fieldState, fieldName)=>console.log('onFocusChange', fieldName, {fieldState})}
 * onValidChange={(fieldState, fieldName)=>console.log('onValidChange', fieldName, {fieldState})}
 * onStateChange={(fieldState, fieldName)=>console.log('onStateChange', fieldName, {fieldState})}
 */
export class FieldComponent extends React.Component {

  constructor( props ){
    super( props )

    // log = logger.bind( this )
    // log( 'constructor', { props })

    // ## Internally used, protected, methods.

    this._getDomProps = this._getDomProps.bind( this )
    // Returns a set of properties cleaned from unacceptable/specific items.

    this._formLink = this._formLink.bind( this )
    // Used to get access to `formLink`.

    this._getFormState = this._getFormState.bind( this )
    // Used to get `formState`.

    this._getFieldState = this._getFieldState.bind( this )
    this._setFieldState = this._setFieldState.bind( this )
    // Used to get and set the field state.

    this._initializeFieldState = this._initializeFieldState.bind( this )
    // Used to set up all of the field properties while construction or reinitialization (cancel).

    this._getValueErrors = this._getValueErrors.bind( this )
    // Validate a value with external validators, returns an array of errors.

    this._validate = this._validate.bind( this )
    // Calls `_getValueErrors` with the current context (field state and etc.).

    this._invalidateValue = this._invalidateValue.bind( this )
    // Takes a value and an error array of it. If the value is actual, errors are applied to it. Used in async validation.

    this._shouldFieldUpdate = this._shouldFieldUpdate.bind( this )
    // Uses `onShouldUpdate` handler to check if the nextState can be applied or not.

    this._fireOnReady = this._fireOnReady.bind(this)

    this._fireOnFocusChange = this._fireOnFocusChange.bind( this )
    // Fires `onFocusChange` if the handler is given, when necessary.

    this._fireOnValidChange = this._fireOnValidChange.bind( this )
    // Fires `onValidChange` if the handler is given, when necessary.

    this._getInitialValue = this._getInitialValue.bind( this )
    // Calculates initial value based on the initialization value and control's default value.

    // ## Controls API

    this.getDefaultValue = this.getDefaultValue.bind( this )
    // Return default value of the control. Override it to change the value for all of the cases.

    this.getDomProps = this._getDomProps
    // Returns a set of properties cleaned from unacceptable/specific items. Override it when you need to filter out some additionsl properties.

    this.handleChangeEvent = this.handleChangeEvent.bind( this )
    // Used to handle standard onChange event

    this.handleFocusEvent = this.handleFocusEvent.bind( this )
    // Used to handle standard onFocus event

    this.handleBlurEvent = this.handleBlurEvent.bind( this )
    // Used to handle standard onBlur event

    this.getFieldState = this._getFieldState
    // Used to get full field state

    this.getFieldValue = this.getFieldValue.bind( this )
    this.setFieldValue = this._setFieldValue.bind( this )
    // Used to get and set field values

    this._initializeFieldState(this._fireOnReady)
  }

  componentWillReceiveProps(){
    // If the field was 'canceled' - reinitialize it
    const { touched } = this._getFieldState()
    if( typeof touched === 'undefined' ){
      this._initializeFieldState()
    }
  }

  shouldComponentUpdate( nextProps, nextState ){
    return true
    // KARD: experimental, Eliminate superfluous renders with shouldComponentUpdate.
    // Ensure that the input is re-rendered only when its value changed.
    const propsToCompare = ( props ) => {
      const { children, ...propsToCompare } = this._getDomProps( props )
      return propsToCompare
    }
    const stateChanged = !isObjectsEqual( this.__currentState, this._getFieldState())
    const propsChanged = !isObjectsEqual( propsToCompare( this.props ), propsToCompare( nextProps ))
    const childrenChanged = this.props.children != nextProps.children
    return stateChanged || propsChanged || childrenChanged
  }

  // ## [1] Internally used, protected, methods
  // ------------------------------------------

  /**
   * The only method to get formLink of the FormProvider
   * @return {Object} - formLink or its emulator
   */
  _formLink(){
    if( this.props.fieldName
      && this.props.formLink
      && !isObjectsEqual( this.props.formLink, {})
    ){ return this.props.formLink }

    if( !this.errorShown ){
      console.error(
        `${this.constructor.name} must be used in bounds of FormProvider. `
        // eslint-disable-next-line camelcase
        + `Visit ${helpLink_formBoundaries} to learn more about the form boundaries.`
      )
      this.errorShown = true
    }

    const formLink = {
      formProps    : {},
      getFormState : () => { return {} },
      onBlur       : () => {},
      onChange     : () => {},
      onFocus      : () => {},
    }
    return formLink
  }

  _getFormState(){
    return this._formLink().getFormState()
  }

  /**
   * The only way to get field state from the form
   * @return {Object} - filed buffer
   */
  _getFieldState(){
    // * get the state from form buffer or generate the empty state
    return this._getFormState()[this.props.fieldName] || {}
  }

  /**
   * The only way to set field state
   * @param {Object} nextState - the state to set
   */
  _setFieldState( nextState, cb ){
    this._formLink().onChange(
      this.props.fieldName,
      nextState,
      () => {
        // Store the new field state for further usage in shouldComponentUpdate
        this.__currentState = Object.assign({}, nextState )

        // Fire onChange event if a handler given
        if( this.props.onStateChange ){ this.props.onStateChange( nextState, this.props.fieldName ) }

        if( cb ){ cb() }
      }
    )
  }

  /**
   * Is used by constructor to fill all of the field's attributes to defaults
   */
  _initializeFieldState(cb){
    const value = this._getInitialValue()

    // Get errors if any for the value we have
    const errors = this._getValueErrors(
      value,
      [],
      this._getFormState(),
      this._invalidateValue
    )

    // Combine next state of field
    const nextState = {
      value,
      errors,                          // Errors codes/massages of the field validation.
      focused : false,
      dirty   : false,                 // The control's value has changed.
      touched : false,                 // The control has been visited
      valid   : errors.length === 0,   // The control's value is valid.
    }

    // Store preserved value for further check. It is 'undefined' if the componant
    // is just created or contains some value in onCancel flow.
    const oldState = this.__currentState

    this._setFieldState( nextState, () => {
      if( cb ){ cb(nextState) }
      // If we are in 'cancel' flow and valid value is changed, fire the event.
      if( typeof oldState === 'undefined' ){ return }
      if( oldState.valid !== nextState.valid ){
        this._fireOnValidChange( nextState )
      }
    })
  }

  /**
   * _getValueErrors returns array of errors for the given value
   * @param  {Any} value - value to test
   * @param  {Array} errors - the current list of errors
   * @param  {Object} formState - the current form state
   * @param  {Function} invalidator - async invalidator (see _invalidateValue)
   * @return {Array} - updated array of errors
   */
  _getValueErrors( value, errors, formState, invalidator ){
    const result = this.props.onValidate
      ? this.props.onValidate(
        value, errors, formState, invalidator
      ) : []
    return result
  }

  /**
   * _invalidate is used to set invalid field state and add some errors to to
   * the state for a specific value. If field's value is different from the one
   * gitven in the parameters, nothing happans. Usually used to invalidate the
   * field after an asynchronic check.
   * @param  {[type]} value - the original value to be invalidated
   * @param  {Array}  errors - errors (id/massages) to add
   * @return {Void}
   */
  _invalidateValue( value, errors = []){
    const fieldState = this._getFieldState()

    // If the field value is not relevant or there are no errors in array, just return
    if(
      ( fieldState.value !== value )
      || ( errors.length === 0 )
    ){ return }


    // Add only errors are not in the list yet
    const nextErrors = combineArrays( fieldState.errors || [], errors )

    // Update field's state with new errors
    const nextState = {
      ...fieldState,
      valid  : nextErrors.length === 0,
      errors : nextErrors,
    }

    this._setFieldState( nextState, () => {
      if( fieldState.valid !== nextState.valid ){
        this._fireOnValidChange( nextState )
      }
    })
  }

  /**
   * _validate executes a call of this._getFieldState(...) within the current context.
   * @param  {Any} value - a value to test
   * @return {Array} - array if errors for the given value
   */
  _validate( value ){
    const errors = this._getValueErrors(
      value,
      this._getFieldState().errors,
      this._getFormState(),
      this._invalidateValue
    )
    return errors
  }


  /**
   * _getInitialValue returns initial value of the field extracted from formLink
   * @return {Any} - initial value of the field
   */
  _getInitialValue(){
    const { formProps } = this._formLink()
    return formProps
      && formProps.initialValues
      && typeof formProps.initialValues[this.props.fieldName] !== 'undefined'
      ? formProps.initialValues[this.props.fieldName]
      : this.getDefaultValue()
  }

  /**
   * _setFieldValue is used to set the field value and set all of the value related
   * flags: errors, dirty, valid
   * @param {Amy}   newValue - a value to set
   * @param {Function} cb - callback to call after the value is set
   */
  _setFieldValue( nextValue, cb ){
    // if the control is disabled, do nothing
    if( this.props.disabled ){ return }

    // extract next value from event
    // const nextValue = event.target.value;

    // validate the next value
    const nextErrors = this._validate( nextValue )

    const fieldState = this._getFieldState()

    // validate it and put into nextState
    const nextState = {
      ...fieldState,
      value  : nextValue,
      errors : nextErrors,
      dirty  : nextValue !== this._getInitialValue(),   // The control's value has changed.
      valid  : nextErrors.length === 0,                 // The control's value is valid.
    }

    // test if the nextState should be set, return if no
    if( !this._shouldFieldUpdate( nextState )){ return }

    // set the new field state
    this._setFieldState(
      nextState,
      () => {
        // Handle valid changed event is valid property of the states are different
        if( fieldState.valid !== nextState.valid ){
          this._fireOnValidChange( nextState )
        }

        // Fire onChange event if a handler given
        if( this.props.onChange ){ this.props.onChange( event ) }

        if( cb ){ cb() }
      }
    )
  }

  /**
   * Fired onShouldUpdate and return its value or true
   * @param  {Object} nextState - field state to check
   * @return {[type]} - true when the nextState should be set, false in other case
   */
  _shouldFieldUpdate( nextState ){
    if( this.props.onShouldUpdate ){
      return this.props.onShouldUpdate(
        nextState,
        this._getFormState(),
      )
    }
    return true
  }

  _fireOnReady(){
    const { onReady } = this.props
    if( onReady ) onReady( this )
  }

  _fireOnFocusChange( fieldState ){
    if( this.props.onFocusChange ){
      this.props.onFocusChange( fieldState, this.props.fieldName )
    }
  }

  _fireOnValidChange( fieldState ){
    if( this.props.onValidChange ){
      this.props.onValidChange( fieldState, this.props.fieldName )
    }
  }

  _getDomProps(){
    const {

      fieldName,
      formLink,
      onReady,
      onFocusChange,
      onShouldUpdate,
      onValidate,
      onValidChange,
      onStateChange,

      ...cleanProps
    } = this.props
    return cleanProps
  }

  // ## [2] Controls API
  // -------------------------------------

  getDefaultValue(){
    return '' // text, password
  }

  getFieldValue(){
    return this._getFieldState().value
  }

  handleChangeEvent( event ){
    this._setFieldValue( event.target.value )
  }

  handleFocusEvent( event ){
    const fieldState = this._getFieldState()
    const nextState = {
      ...fieldState,
      focused : true,
      touched : true,
    }

    this._setFieldState(
      nextState,
      () => {
        // Fire onFocus event if a handler given
        if( this.props.onFocus ){
          this.props.onFocus( event )
        }

        // Fire onFocusChanged. It's posible to get here without
        // field focus state changed for radio buttons.
        if( fieldState.focused !== nextState.focused ){
          this._fireOnFocusChange( nextState )
        }

        // Fire form's onFocus event
        this._formLink().onFocus(
          this.props.fieldName,
          nextState,
        )
      }
    )
  }

  handleBlurEvent( event ){
    const fieldState = this._getFieldState()
    const nextState = {
      ...fieldState,
      focused : false,
    }

    this._setFieldState(
      nextState,
      () => {
        // Fire onBlur event if a handler given
        if( this.props.onBlur ){
          this.props.onBlur( event )
        }

        // Fire onFocusChanged. It's posible to get here without
        // field focus state changed for radio buttons.
        if( fieldState.focused !== nextState.focused ){
          this._fireOnFocusChange( nextState )
        }

        // Fire form's onFocus event
        this._formLink().onBlur(
          this.props.fieldName,
          nextState,
        )
      }
    )
  }

}

// --------------------------------------------------------------------------

FieldComponent.defaultProps = {
  formLink : null,
}
