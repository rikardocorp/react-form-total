import React, {Component} from 'react'
import {InputGroup, InputGroupAddon} from 'reactstrap'
import RkValidate from '../Validate/RkValidate'
import makeAnimated from 'react-select/lib/animated'
import { checkValidity } from '../Validate/validity/validity'
import Select from 'react-select'

class RkMultiSelect extends Component {
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

  // componentDidUpdate (prevProps, prevState) {
  //   if (this.state.updateProps) {
  //     const value = this.props.inputProps.value
  //     this.setState({value: value, updateProps: false})
  //     if (this.props.changed) {
  //       const name = this.props.inputProps.name
  //       this.props.changed(name, value)
  //     }
  //   }
  // }
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.inputProps.value) {
  //     this.setState({updateProps: true})
  //   }
  // }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    if (this.props.inputProps.value) {
      const value = this.props.inputProps.value ? this.props.inputProps.value : ''
      this.handlerChangeValue(value, true, false)
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
        this.handlerChangeProps
      )
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
        value: value,
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
      value: null,
      valid: undefined,
      touched: false,
      message: '',
      showMessage: false
    })
    if (this.props.changed) {
      this.props.changed(name, null)
    }
  }
  handlerIsValidate = () => {
    const value = this.state.value
    const {isValid} = checkValidity(value, this.state.rules)
    return isValid
  }

  evaluateNewValue = (newValue, isMulti, optionValue, options) => {
    let value = null
    if (isMulti) {
      newValue = Array.isArray(newValue) ? newValue : [newValue]

      if (Array.isArray(newValue)) {
        if (typeof newValue[0] !== 'object') {
          const auxValue = (newValue.toString()).split(',')
          newValue = options.filter(it => auxValue.includes(it[optionValue].toString()))
          value = newValue.length > 0 ? newValue : null
        } else {
          value = newValue
        }
      } else {
        if (typeof newValue !== 'object') {
          newValue = options.filter(it => it[optionValue].toString() === newValue.toString())
          value = newValue.length > 0 ? newValue : null
        } else {
          value = newValue
        }
      }
    } else {
      if (!Array.isArray(newValue)) {
        if (typeof newValue !== 'object') {
          newValue = options.filter(it => it[optionValue].toString() === newValue.toString())
          value = newValue.length > 0 ? newValue[0] : null
        } else {
          value = newValue
        }
      } else {
        console.group('MULTISELECT: CHANGE VALUE')
        console.info('Single multiselect isMulti=false, value does not expects ARRAY')
        console.groupEnd('END')
        value = null
      }
    }
    return value
  }
  handlerChangeValue = (newValue, cen = true, validate = true) => {
    let value = newValue
    const {isMulti = false, optionValue = 'id', options = [], returnValue = null} = {
      ...this.props.inputProps,
      ...this.state._localProps
    }
    if (cen) {
      value = this.evaluateNewValue(newValue, isMulti, optionValue, options)
    }
    const name = this.props.inputProps.name

    let _isValid = true
    let _msgError = ''
    if (validate) {
      const {isValid, msgError} = checkValidity(value, this.state.rules)
      _isValid = isValid
      _msgError = msgError
    }

    this.setState({
      value: value,
      valid: _isValid,
      message: _msgError,
      showMessage: true
    })

    if (this.props.changed) {
      if (returnValue && value) {
        if (Array.isArray(value)) {
          value = value.map(it => it[returnValue])
          this.props.changed(name, value[returnValue] === undefined ? value : value[returnValue])
        } else {
          this.props.changed(name, value[returnValue] === undefined ? value : value[returnValue])
        }
      } else {
        this.props.changed(name, value)
      }
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
    if (newProps !== null && newProps.isMulti !== undefined) {
      this.handlerChangeValue(null, false, false)
    }
  }
  handlerDisabledInput = (value) => {
    this.handlerChangeProps({isDisabled: value})
  }
  // SET LOCAL CHANGE VALUE
  changeValue = (pickOption, action) => {
    const value = pickOption.length === 0 ? null : pickOption
    this.handlerChangeValue(value, false)
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
    const {
      returnValue = null,
      menuStatic = false,
      isMulti = false,
      isDisabled = false,
      optionLabel = 'label',
      optionValue = 'value',
      optionDisabled = null,
      closeMenuOnSelect = null,
      _prepend = null,
      _append = null,
      value,
      ...localProps} = props

    const className =
      ' rk-multiselect form-control ' +
      (localProps.className ? localProps.className : '') +
      (invalid ? 'is-invalid' : '') +
      (valid ? 'is-valid' : '')

    const customStyles = {
      control: (base, state) => ({
        ...base,
        borderColor:
          invalid ? '#dc3545 !important' : (
            (valid ? '#9e9e9e !important' : (state.isFocused ? '#AAAAAA !important' : '#E3E3E3 !important'))
          ),
        boxShadow: (state.isFocused && invalid) ? '0 0 0 0.2rem rgba(220, 53, 69, 0.25)' : 'none'
      }),
      menu: (base, state) => ({
        ...base,
        position: menuStatic ? 'relative' : 'absolute'
      })
    }

    let _closeMenuOnSelect = closeMenuOnSelect
    if (closeMenuOnSelect === null) {
      _closeMenuOnSelect = !isMulti
    }

    let conteInput = null
    const input = (
      <Select
        {...localProps}
        components={makeAnimated()}
        getOptionValue={(option) => (option[optionValue])}
        getOptionLabel={(option) => (option[optionLabel])}
        isOptionDisabled={optionDisabled}
        value={value}
        closeMenuOnSelect={_closeMenuOnSelect}
        isDisabled={isDisabled}
        isMulti={isMulti}
        styles={customStyles}
        className={className}
        onChange={this.changeValue}
        onFocus={this.showErrorTooltip}
        onBlur={this.hiddenErrorTooltip} />
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

export default RkMultiSelect
