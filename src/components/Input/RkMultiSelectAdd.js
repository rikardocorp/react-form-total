import React, {Component} from 'react'
import {InputGroup, InputGroupAddon} from 'reactstrap'
import { checkValidity } from '../Validate/validity/validity'

import RkValidate from '../Validate/RkValidate'
import makeAnimated from 'react-select/lib/animated'
import CreatableSelect from 'react-select/lib/Creatable'

class RkMultiSelectAdd extends Component {
  state = {
    inputValue: '',
    value: [],
    outValue: null,
    disabled: false,
    defaultValue: '',
    valid: undefined,
    touched: false,
    message: '',
    showMessage: false,
    rules: {},
    updateProps: false,
    isLoading: false,
    localOptions: [],
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

  handlerChangeValueAuxiliar = (newValue, cen = true, validate = true) => {
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

    let outValue = value
    // if (returnValue && value) {
    //   if (Array.isArray(value)) {
    //     outValue = value.map(it => it[returnValue])
    //     outValue = outValue[returnValue] === undefined ? outValue : outValue[returnValue]
    //   } else {
    //     outValue = outValue[returnValue] === undefined ? outValue : outValue[returnValue]
    //   }
    // }

    this.setState({
      value: value,
      outValue: outValue,
      valid: _isValid,
      message: _msgError,
      showMessage: true
    })

    if (this.props.changed) {
      this.props.changed(name, outValue)
    }
  }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    if (this.props.inputProps.value) {
      const value = this.props.inputProps.value ? this.props.inputProps.value : null
      this.handlerChangeValueAuxiliar(value, true, false)
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

    const options = Array.isArray(this.props.inputProps.options) ? [...this.props.inputProps.options] : []
    this.setState({localOptions: options})
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
        value: value,
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
  handlerChangeValue = (newValue, action = 'create-option', cen = true, validate = true) => {
    let data = {}

    let value = newValue
    const {localOptions} = this.state
    const {addOption = false, isMulti = false, optionValue = 'id'} = {
      ...this.props.inputProps,
      ...this.state._localProps
    }
    if (cen) {
      value = this.evaluateNewValue(newValue, isMulti, optionValue, localOptions)
    }

    switch (action) {
      case 'create-option':
        if (addOption) {
          if (Array.isArray(value)) {
            const total = value.length
            localOptions.push(value[total - 1])
          } else {
            if (value !== null) localOptions.push(value)
          }
          data = { value: value, localOptions }
        } else {
          data = { value: value }
        }
        break
      default:
        data = { value: value }
    }

    const name = this.props.inputProps.name

    let _isValid = true
    let _msgError = ''
    if (validate) {
      const {isValid, msgError} = checkValidity(value, this.state.rules)
      _isValid = isValid
      _msgError = msgError
    }

    const outValue = Array.isArray(value) && value.length === 0 ? null : value

    const setData = {
      ...data,
      outValue: outValue,
      valid: _isValid,
      message: _msgError,
      showMessage: true
    }

    this.setState(setData)
    if (this.props.changed) {
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
            _localProps: {},
            localOptions: this.props.inputProps.options
          }
        } else {
          const localOptions = Array.isArray(newProps.options) ? newProps.options : state.localOptions
          return {
            rules: rules,
            _localProps: {
              ...state._localProps,
              ...newProps
            },
            localOptions: localOptions
          }
        }
      })
    }
    if (newProps !== null && newProps.isMulti !== undefined) {
      this.handlerChangeValue(null, null, false, false)
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
  // SHOW MESSAGE TOOLTIP
  showErrorTooltip = () => {
    this.setState({showMessage: true})
  }
  // HIDE MESSAGE TOOLTIP
  hiddenErrorTooltip = () => {
    this.setState({showMessage: false})
  }

  handleChange = (newValue, {action}) => {
    this.handlerChangeValue(newValue, action, false)
  }

  isValidNewOption = (inputValue, selectValue, selectOptions) => {
    const props = {...this.props.inputProps, ...this.state._localProps}
    const {optionValue = 'value'} = props
    return !(inputValue.trim().length === 0 || selectOptions.find(option => option[optionValue] === inputValue))
  }

  getNewOptionData = (_inputValue, _optionLabel) => {
    const props = {...this.props.inputProps, ...this.state._localProps}
    const {optionLabel = 'label', optionValue = 'value'} = props
    let data = {
      [optionValue]: _inputValue,
      [optionLabel]: _optionLabel
    }
    return data
  }

  render() {
    let props = {
      ...this.props.inputProps,
      ...this.state._localProps
    }
    if (this.state.disabled) {
      props = props.disabled ? {isDisabled: this.state.disabled, ...props} : {...props, isDisabled: this.state.disabled}
    }

    let valid
    let invalid
    // let touched = false
    if (this.state.valid !== undefined) {
      valid = this.state.valid
      invalid = !this.state.valid ? !this.state.valid : undefined
    }

    const {
      menuStatic = false,
      isMulti = false,
      isDisabled = false,
      optionLabel = 'label',
      optionValue = 'value',
      optionDisabled = null,
      options = [],
      _prepend = null,
      _append = null,
      _tooltip = false,
      ...localProps} = props

    const { localOptions, value } = this.state

    const className =
      ' rk-multiselect form-control ' +
      (props.className ? props.className : '') +
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

    let conteInput = null
    const input = (
      <CreatableSelect
        {...localProps}
        isClearable
        options={localOptions}
        value={value}
        components={makeAnimated()}
        className={className}
        styles={customStyles}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isOptionDisabled={optionDisabled}
        getOptionLabel={(option) => (option[optionLabel])}
        getOptionValue={(option) => (option[optionValue])}
        getNewOptionData={this.getNewOptionData}
        isValidNewOption={this.isValidNewOption}
        onChange={this.handleChange}
        onFocus={this.showErrorTooltip}
        onBlur={this.hiddenErrorTooltip}
      />
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
      <RkValidate tooltip={_tooltip} show={this.state.showMessage} message={this.state.message} valid={valid}>
        { conteInput }
      </RkValidate>
    )
  }
}

export default RkMultiSelectAdd
