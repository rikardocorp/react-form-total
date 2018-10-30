import React, {Component} from 'react'
import {Input, InputGroup, InputGroupAddon} from 'reactstrap'
import { checkValidity } from '../Validate/validity/validity'
import RkValidate from '../Validate/RkValidate'

class RkInput extends Component {
  state = {
    value: '',
    disabled: false,
    outValue: null,
    defaultValue: '',
    valid: undefined,
    touched: false,
    message: '',
    showMessage: false,
    rules: {},
    updateProps: false,
    _localProps: {}
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('componentDidUpdate [input]')
  }

  componentWillMount () {
    // console.log('componentWillMount [input]')
    // INIT VALUES BY DEFAULT
    if (this.props.inputProps.value || this.props.__value) {
      const value = this.props.inputProps.value ? this.props.inputProps.value : null
      this.setState({value: value, outValue: value})
      if (this.props.changed) {
        const name = this.props.inputProps.name
        this.props.changed(name, value)
      }
    }
  }

  componentDidMount () {
    // console.log('componentDidMount [input]')
    // SET HANDLER FUNCTIONS
    if (this.props.inputProps.name) {
      const name = this.props.inputProps.name
      this.props.getFunctions(
        name,
        this.handlerTouched,
        this.handlerReset,
        () => this.handlerIsValidate(),
        this.handlerDisabledInput,
        this.handlerChangeValue,
        this.handlerChangeProps,
        this.getValue
      )
    }
    // INIT RULES
    const rules = this.props.rules ? this.props.rules : {}
    this.setState({rules: rules})
  }

  getValue = (group = null) => {
    const _grouping = this.props.grouping
    if (group === null || _grouping[group]) {
      return this.state.outValue
    }
    return undefined
  }

  handlerTouched = (isTouch) => {
    if (!isTouch) {
      this.setState({touched: false, valid: undefined})
    } else {
      const value = this.state.value
      const {isValid, msgError} = checkValidity(value, this.state.rules)
      this.setState({
        touched: true,
        valid: isValid,
        message: msgError,
        showMessage: true
      })
    }
  }
  handlerReset = (group = null) => {
    const props = {...this.props.inputProps, ...this.state._localProps}
    const {name = ''} = props
    const _grouping = this.props.grouping
    const outValue = this.props.type === 'number' ? 0 : ''

    if (group === null || _grouping[group]) {
      this.setState({
        value: '',
        outValue: outValue,
        // disabled: false,
        valid: undefined,
        touched: false,
        message: '',
        showMessage: false
      })
      if (this.props.changed) {
        this.props.changed(name, outValue, true)
      }
    }
  }
  handlerIsValidate = () => {
    const value = this.state.value
    if (!this.props.hidden) {
      const {isValid} = checkValidity(value, this.state.rules)
      return isValid
    } else {
      return true
    }
  }
  handlerChangeValue = (newValue) => {
    const name = this.props.inputProps.name
    const value = newValue
    const {isValid, msgError} = checkValidity(value, this.state.rules)
    const outValue = this.props.type === 'number' ? Number(value) : value
    this.setState({
      value: value,
      outValue: outValue,
      valid: isValid,
      message: msgError,
      showMessage: true
    })
    if (this.props.changed) {
      this.props.changed(name, outValue)
    }
  }
  handlerChangeProps = (newProps = null, newRules = undefined) => {
    let rules = (typeof newRules === 'object') ? {...newRules} : {...this.props.rules}
    // console.log('handlerChangeProps: ', newProps)
    if (typeof newProps === 'object' || newProps === null) {
      this.setState(state => {
        if (newProps === null) {
          return {
            rules: rules,
            _localProps: {}
          }
        } else {
          return {
            rules: rules,
            _localProps: {
              ...state._localProps,
              ...newProps
            }
          }
        }
      })
    }
  }
  handlerDisabledInput = (value = null, group = null) => {
    const _grouping = this.props.grouping
    if (group === null || _grouping[group]) {
      if (value !== this.state.disabled) {
        this.setState(state => {
          return {
            disabled: value == null ? !state.disabled : value
          }
        })
      }
    }
  }
  // SET LOCAL CHANGE VALUE
  changeValue = (el) => {
    const value = el.target.value
    this.handlerChangeValue(value)
  }
  // SHOW MESSAGE TOOLTIP
  showErrorTooltip = () => {
    this.setState({showMessage: true})
  }
  // HIDE MESSAGE TOOLTIP
  hiddenErrorTooltip = () => {
    this.setState({showMessage: false})
  }

  render() {
    // console.log(' [RENDER] Input')
    let props = {
      ...this.props.inputProps,
      ...this.state._localProps,
      value: this.state.value
    }
    if (this.state.disabled) {
      props = props.disabled ? {disabled: this.state.disabled, ...props} : {...props, disabled: this.state.disabled}
    }

    let valid
    let invalid
    if (this.state.valid !== undefined) {
      valid = this.state.valid
      invalid = !this.state.valid ? !this.state.valid : undefined
    }
    const {_prepend = null, _append = null, _tooltip = false, contentClassName = '', ...localProps} = props

    let conteInput = null
    const input = (
      <Input type={this.props.type} {...localProps} onFocus={this.showErrorTooltip} onBlur={this.hiddenErrorTooltip} onChange={this.changeValue} valid={valid} invalid={invalid} />
    )

    const prepend = _prepend ? <InputGroupAddon addonType='prepend'>{_prepend}</InputGroupAddon> : null
    const append = _append ? <InputGroupAddon addonType='append'>{_append}</InputGroupAddon> : null
    if (append == null && prepend == null) {
      conteInput = input
    } else {
      conteInput = (
        <InputGroup className={(invalid ? 'is-invalid ' : '') + contentClassName}>
          { prepend }
          { input }
          { append }
        </InputGroup>
      )
    }

    return (
      <RkValidate tooltip={_tooltip} show={this.state.showMessage} message={this.state.message} valid={valid}>
        { conteInput }
      </RkValidate>
    )
  }
}

export default RkInput
