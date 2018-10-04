import React, {Component} from 'react'
import {Input, InputGroup, InputGroupAddon} from 'reactstrap'
import { checkValidity } from '../Validate/validity/validity'
import RkValidate from '../Validate/RkValidate'

class RkInput extends Component {
  state = {
    tooltip: false,
    value: '',
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
    if (this.state.updateProps) {
      const value = this.props.inputProps.value
      const outValue = this.props.type === 'number' ? Number(value) : value
      this.setState({value: outValue, updateProps: false})
      if (this.props.changed) {
        const name = this.props.inputProps.name
        this.props.changed(name, outValue)
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.inputProps.value) {
      this.setState({updateProps: true})
    }
  }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    if (this.props.inputProps.value) {
      const value = this.props.inputProps.value ? this.props.inputProps.value : null
      this.setState({value: value})
      if (this.props.changed) {
        const name = this.props.inputProps.name
        this.props.changed(name, value)
      }
    }
  }

  componentDidMount () {
    // SET HANDLER FUNCTIONS
    if (this.props.inputProps.name) {
      const name = this.props.inputProps.name
      this.props.getFunctions(
        name,
        () => this.handlerTouched(),
        () => this.handlerReset(),
        () => this.handlerIsValidate(),
        this.handlerDisabledInput,
        this.handlerChangeValue,
        this.handlerChangeProps)
    }
    // INIT RULES
    const rules = this.props.rules ? this.props.rules : {}
    this.setState({rules: rules})
  }

  handlerTouched = () => {
    if (this.state.touched) {
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
  handlerReset = () => {
    const name = this.props.inputProps.name
    this.setState({
      value: '',
      valid: undefined,
      touched: false,
      message: '',
      showMessage: false
    })
    if (this.props.changed) {
      const outValue = this.props.type === 'number' ? 0 : ''
      this.props.changed(name, outValue)
    }
  }
  handlerIsValidate = () => {
    const value = this.state.value
    const {isValid} = checkValidity(value, this.state.rules)
    return isValid
  }
  handlerChangeValue = (newValue) => {
    // console.log('handlerChangeValue')
    // console.log(newValue)
    const name = this.props.inputProps.name
    const value = newValue
    const {isValid, msgError} = checkValidity(value, this.state.rules)
    this.setState({
      value: value,
      valid: isValid,
      message: msgError,
      showMessage: true
    })
    if (this.props.changed) {
      const outValue = this.props.type === 'number' ? Number(value) : value
      this.props.changed(name, outValue)
    }
  }
  handlerChangeProps = (newProps = null, newRules = undefined) => {
    let rules = (typeof newRules === 'object') ? {...newRules} : {...this.props.rules}
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
  handlerDisabledInput = (value) => {
    this.handlerChangeProps({disabled: value})
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
    const props = {
      ...this.props.inputProps,
      ...this.state._localProps,
      value: this.state.value
    }

    let valid
    let invalid
    if (this.state.valid !== undefined) {
      valid = this.state.valid
      invalid = !this.state.valid ? !this.state.valid : undefined
    }
    const {_prepend = null, _append = null, ...localProps} = props

    let conteInput = null
    const input = (
      <Input {...localProps} onFocus={this.showErrorTooltip} onBlur={this.hiddenErrorTooltip} onChange={this.changeValue} valid={valid} invalid={invalid} />
    )
    const prepend = _prepend ? <InputGroupAddon addonType='prepend'>{_prepend}</InputGroupAddon> : null
    const append = _append ? <InputGroupAddon addonType='append'>{_append}</InputGroupAddon> : null
    if (append == null && prepend == null) {
      conteInput = input
    } else {
      conteInput = (
        <InputGroup className={invalid ? 'is-invalid' : ''}>
          { prepend }
          { input }
          { append }
        </InputGroup>
      )
    }

    return (
      <RkValidate tooltip={this.props.tooltip} show={this.state.showMessage} message={this.state.message} valid={valid}>
        { conteInput }
      </RkValidate>
    )
  }
}

export default RkInput
