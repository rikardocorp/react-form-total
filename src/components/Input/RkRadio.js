import React, {Component} from 'react'
import {RadioGroup, Radio} from 'react-radio-group'
import { checkValidity } from '../Validate/validity/validity'
import PropTypes from 'prop-types'
import RkValidate from '../Validate/RkValidate'

class RkRadio extends Component {
  static propTypes = {
    name: PropTypes.string,
    inputProps: PropTypes.object,
    grouping: PropTypes.object,
    rules: PropTypes.object,
    getFunctions: PropTypes.func,
    changed: PropTypes.func
  }

  state = {
    value: null,
    outValue: null,
    disabled: false,
    valid: undefined,
    touched: false,
    message: '',
    showMessage: false,
    rules: {},
    _localProps: {}
  }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    const {value} = this.props.inputProps
    if (value !== undefined) {
      const localValue = value ? value : null
      this.handlerChangeValue(localValue)
    }
  }

  componentDidMount () {
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

    if (group === null || _grouping[group]) {
      this.setState({
        value: null,
        outValue: null,
        disabled: false,
        valid: undefined,
        touched: false,
        message: '',
        showMessage: false
      })
      if (this.props.changed) {
        this.props.changed(name, null, true)
      }
    }
  }
  handlerIsValidate = () => {
    const value = this.state.value
    const {isValid} = checkValidity(value, this.state.rules)
    return isValid
  }
  handlerChangeValue = (newValue) => {
    const name = this.props.inputProps.name
    const value = newValue
    const {isValid, msgError} = checkValidity(value, this.state.rules)
    this.setState({
      value: value,
      outValue: value,
      valid: isValid,
      message: msgError,
      showMessage: true
    })
    if (this.props.changed) {
      this.props.changed(name, value)
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
  changeValue = (value) => {
    this.handlerChangeValue(value)
  }

  render() {
    let props = {
      ...this.props.inputProps,
      ...this.state._localProps
    }
    if (this.state.disabled) {
      props = props.disabled ? {disabled: this.state.disabled, ...props} : {...props, disabled: this.state.disabled}
    }

    let valid
    let invalid
    // let touched = false
    if (this.state.valid !== undefined) {
      valid = this.state.valid
      invalid = !this.state.valid ? !this.state.valid : undefined
    }

    const conteClassName = 'rk-radio ' + (invalid ? 'is-invalid' : '') + (valid ? 'is-valid' : '')

    const {
      options = [],
      position = 'left',
      color = null,
      disabled = false,
      className = '',
      _tooltip = false,
      style = null} = props
    const name = this.props.inputProps.name

    const _options = Array.isArray(options) ? options : []
    const radios = _options.map((it, key) => {
      let _color = color ? 'radio-' + color : ''
      let _value = it

      if (typeof it === 'object') {
        _color = it.color ? 'radio-' + it.color : _color
        _value = it.value ? it.value : undefined
      }

      const _name = name + '_' + key
      return (
        <div className={'radio text-' + position + ' ' + _color + ' ' + className} key={key}>
          <Radio value={_value} id={_name} disabled={disabled} /><label htmlFor={_name}>{_value}</label>
        </div>
      )
    })

    return (
      <RkValidate tooltip={_tooltip} show={this.state.showMessage} message={this.state.message} valid={valid}>
        <RadioGroup
          name='fruit'
          className={conteClassName}
          style={style}
          selectedValue={this.state.value}
          onChange={this.changeValue}>
          {radios}
        </RadioGroup>
      </RkValidate>
    )
  }
}

export default RkRadio
