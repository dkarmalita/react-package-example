import React from 'react'
import {
  isObjectsEqual,
  combineArrays,
} from './utils'

// TODO: (kard) list:
// [x] form invalidator (to use with submit errors)
// [x] check whole form state (touched, valid, dirty)
// [-] filter out unneccesary attributes on submit (remine only values?)
// [x] should submitting form block its changes?
// [ ] onFocus & onBlur of the form

const FormContext = React.createContext({})
// https://reactjs.org/docs/context.html#api

/**
 * Properties:
 * onFormReady=(formLink)=>{...}
 * onChange=(newState)=>{...}
 * onFocus
 * onBlur
 */
export class FormProvider extends React.Component {

  state = { formBuffer: {}, blocked: false }

  constructor( props ){
    super( props )

    // Bindings
    // log = logger.bind( this )

    this._getFieldState = this._getFieldState.bind( this )
    // Returns a field state by its name.

    this._setFieldState = this._setFieldState.bind( this )
    // Set a field's state by its name

    this._getFormStateOf = this._getFormStateOf.bind( this )
    // Used to get summarized attribute of the form (dirty, value, touched, focused, etc.).  Tests all fields for attributName === defaultValue. Returns defaultValue if all of the tests are true, other case returns the first difference value met.

    this._getFormState = this._getFormState.bind( this )
    this._setFormState = this._setFormState.bind( this )

    this._handleChange = this._handleChange.bind( this )
    // Process any field changes

    this._setFieldsAttribute = this._setFieldsAttribute.bind( this )
    // Set a named attribute of each field from a values object

    this._blocked = this._blocked.bind( this )
    // Used in formProvider to set/release block outside the form

    this._getFormStateNormilized = this._getFormStateNormilized.bind( this )
    // Used to generate the form's extended state supplied to formProvider.getFormState

    this._valuesToBuffer = this._valuesToBuffer.bind( this )
    // Set value of each field from a value object.

    this._reset = this._reset.bind( this )
    // Reset form buffer to it's initial state.

    this._invalidateForm = this._invalidateForm.bind( this )
    // Apply errors from error object to fields.

    this._fireOnFormReady = this._fireOnFormReady.bind( this )
    // Wrapper for onFormReady event hander call.

    // Loading initial values from initialValues property to formBuffer
    this.state.formBuffer = this._valuesToBuffer( this.props.initialValues || {})

    // log( 'constructor', { formBuffer: this.state.formBuffer })

    // Provides all 'out of the form' API
    this._formProvider = {
      reset          : this._reset,
      getFormState   : this._getFormStateNormilized,
      getFieldState  : this._getFieldState,
      setFieldState  : this._setFieldState,
      invalidateForm : this._invalidateForm,
      setBlocked     : this._blocked,
    }

    // Firing onFormReady event
    this._fireOnFormReady()
  }

  // formLink methods
  // ================

  _invalidateForm( errorsObject ){
    const formBuffer = { ...this._getFormState() }

    Object.keys( errorsObject ).forEach( el => {
      formBuffer[el] = {
        ...formBuffer[el],
        valid  : false,
        errors : combineArrays( formBuffer[el].errors || [], errorsObject[el]),
      }
    })

    this._setFormState( formBuffer )
  }

  /**
   * Reset form values to their initials (from initState property)
   */
  _reset( cb ){
    this._setFormState( this._valuesToBuffer( this.props.initialValues || {}), cb )
  }

  _getFormState(){
    return this.state.formBuffer
  }

  _blocked( newValue = null ){
    // If no value given, return the current state.
    if( newValue === null ){ return this.state.blocked }

    // Set the given state for block and return this value.
    this.setState({ ...this.state, blocked: newValue })
    return newValue
  }

  _getFormStateNormilized(){
    return {
      fields  : this._getFormState(),
      touched : this._getFormStateOf( 'touched', false ),
      valid   : this._getFormStateOf( 'valid', true ),
      dirty   : this._getFormStateOf( 'dirty', false ),
      focused : this._getFormStateOf( 'focused', false ),
      blocked : this._blocked(),
    }
  }

  /**
   * Tests all fields for attributName === defaultValue. Returns defaultValue if all of the tests are true, other case returns the first difference value met.
   * @param  {string}  attributName - name of the attribute to test
   * @param  {Boolean} defaultValue - default value of the attribute
   * @return {Boolean} - default or opposite value (summarized value of the field)
   */
  _getFormStateOf( attributName, defaultValue = true ){
    let result = defaultValue
    const formState = this._getFormState()
    const propsList = Object.keys( formState )

    for( let i = propsList.length - 1; i >= 0; i-- ){
      if( formState[propsList[i]][attributName] !== defaultValue ){
        result = formState[propsList[i]][attributName]
        break
      }
    }

    return result
  }

  _setFormState( nextFormState, cb ){
    this.setState({ formBuffer: nextFormState }, () => {
      if( cb ){ cb() }
      if( this.props.onChange ){
        this.props.onChange( this.state.formBuffer )
      }
    })
  }

  // == end of formLink methods

  _fireOnFormReady(){
    const { onFormReady } = this.props
    if( onFormReady ) onFormReady( this._formProvider )
  }

  // Takes an object within { fieldName: attrValue } pairs and the attribute name.
  // Assigns each attribute to the named field inside the form buffer. Makes it in the only setState.
  _setFieldsAttribute( attrName, values ){
    const formBuffer = { ...this._getFormState() }

    Object.keys( values ).forEach( el => {
      formBuffer[el] = { ...formBuffer[el], [attrName]: values[el] }
    })

    this._setFormState( formBuffer )
  }

  _valuesToBuffer( values ){
    const formBuffer = {}

    Object.keys( values ).forEach( el => {
      formBuffer[el] = { value: values[el] }
    })

    return formBuffer
  }

  _getFieldState( fieldName ){
    return this.state.formBuffer[fieldName]
  }

  _setFieldState( fieldName, nextFieldState, cb ){
    this._setFormState({ ...this.state.formBuffer, [fieldName]: nextFieldState }, cb )
  }

  /**
   * _handleChange is calling each time when some field of the form is changed.
   * It uses `formBuffer` and field's name and status to combine next form value
   * and pass it to the form's `onChange` handler if it exists.
   * @param  {string} fieldName
   * @param  {object} fieldStatus
   * @return {void}
   */
  _handleChange( fieldName, nextFieldState, cb ){
    // If the form is not blocked and not in the initialization
    if( this.state.blocked
      && nextFieldState.touched !== false // it is true while initializing only
    ){ return }

    if( JSON.stringify( nextFieldState ) === JSON.stringify( this._getFieldState( fieldName ))) return

    this._setFieldState( fieldName, nextFieldState, cb )
  }

  /**
   * _otherProps is used to get a properties set cleaned from the form-specific
   * properties which are used as separate `formLink` fields., suitable to place
   * them to the `formProps` field of the `formLink`.
   * @param  {object} props - a set of properties are passed to the form provider.
   * @return {object} - a set of the properties cleaned.
   */
  _otherProps( props ){
    const { onChange, children, formBuffer, ...other } = props
    return other
  }

  /**
   * `render` is only used to render the component's children in the context of the
   * `formLink` structure which contains all of the necessary form-wide fields.
   * @return {Component}
   */
  render(){
    const formLink = {
    // This formLink will be passed to each field and used for all under the hood communications.

      getFormState : () => this.state.formBuffer,

      // * `onChange( nextValues )` is calling on each form field change. `nextValue`
      // is the next state of the form.
      onChange : this._handleChange,
      onFocus  : ( fieldName, newState ) => { if( this.props.onFocus ){ this.props.onFocus( fieldName, newState ) } },
      onBlur   : ( fieldName, newState ) => { if( this.props.onBlur ){ this.props.onBlur( fieldName, newState ) } },

      // * `formProps` contains all of the form's properties except `children` and
      // those used by FormProvider itself. See also `_otherProps`.
      formProps : { ...this._otherProps( this.props ) },

    }

    return (
      <FormContext.Provider value={formLink}>
        {this.props.children}
      </FormContext.Provider>
    )
  }

}

/**
 * HOC which is used to convert Basic Input Components to those connected to the form's context.
 * @param  {Component} FormComponent - one of the Basic Input Components.
 * @return {Component} - Connected to the form's context Component.
 */
export const Connect = FormComponent =>
  class extends React.Component {

    render = () => {
      return (
        <FormContext.Consumer>
          { formLink => <FormComponent {...this.props} formLink={formLink} /> }
        </FormContext.Consumer>
      )
    }

  }
