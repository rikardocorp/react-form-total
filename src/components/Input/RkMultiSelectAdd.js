import React, {Component} from 'react'
import {InputGroup, InputGroupAddon} from 'reactstrap'
import { checkValidity } from '../Validate/validity/validity'

import RkValidate from '../Validate/RkValidate'
import makeAnimated from 'react-select/lib/animated'
import CreatableSelect from 'react-select/lib/Creatable'

class RkMultiSelectAdd extends Component {
  state = {
    tooltip: false,
    inputValue: '',
    value: [],
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

  componentDidUpdate (prevProps, prevState) {
    if (this.state.updateProps) {
      const value = this.props.inputProps.value
      this.setState({value: value, updateProps: false})
      if (this.props.changed) {
        const name = this.props.inputProps.name
        this.props.changed(name, value)
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
      const value = (this.props.inputProps.value) ? this.props.inputProps.value : null
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
        this.handlerChangeProps
      )
    }
    // INIT RULES
    const rules = this.props.rules ? this.props.rules : {}
    this.setState({rules: rules})

    const options = Array.isArray(this.props.inputProps.options) ? [...this.props.inputProps.options] : []
    this.setState({localOptions: options})
  }

  handlerTouched = () => {
    // console.log('resetTouched TAGS INPUT')
    if (this.state.touched) {
      this.setState({touched: false, valid: undefined})
    } else {
      const value = this.state.value
      const {isValid, msgError} = checkValidity(value, this.state.rules)
      // console.log(value, isValid, msgError)
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
  handlerChangeValue = (newValue, action = 'create-option') => {
    let data = {}
    switch (action) {
      case 'create-option':
        const props = {...this.props.inputProps, ...this.state._localProps}
        const {addOption = false} = props
        if (addOption) {
          const {localOptions} = this.state
          if (Array.isArray(newValue)) {
            const total = newValue.length
            localOptions.push(newValue[total - 1])
          } else {
            localOptions.push(newValue)
          }
          data = { value: newValue, localOptions }
        } else {
          data = { value: newValue }
        }
        break
      default:
        console.log(' -- default-option')
        data = { value: newValue }
    }

    console.log('ADD')
    const name = this.props.inputProps.name
    const {isValid, msgError} = checkValidity(newValue, this.state.rules)
    const setData = {
      ...data,
      valid: isValid,
      message: msgError,
      showMessage: true
    }

    this.setState(setData)
    console.log(this.props.inputProps.options)
    if (this.props.changed) {
      this.props.changed(name, (newValue && newValue.length > 0) ? newValue : null)
    }
  }
  handlerChangeProps = (newProps = null, newRules = undefined) => {
    let rules = (typeof newRules === 'object') ? {...newRules} : {...this.props.rules}
    if (typeof newProps === 'object' || newProps === null) {
      this.setState(state => {
        if (newProps === null) {
          console.log('CHANGED PROPS MULTISLCT ADD 1')
          console.log(this.props.inputProps.options)
          return {
            rules: rules,
            _localProps: {},
            localOptions: this.props.inputProps.options
          }
        } else {
          console.log('CHANGED PROPS MULTISLCT ADD 2')
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
  }
  handlerDisabledInput = (value) => {
    this.handlerChangeProps({isDisabled: value})
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
    this.handlerChangeValue(newValue, action)
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
    const props = {
      ...this.props.inputProps,
      ...this.state._localProps
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
      <RkValidate tooltip={this.props.tooltip} show={this.state.showMessage} message={this.state.message} valid={valid}>
        { conteInput }
      </RkValidate>
    )
  }
}

export default RkMultiSelectAdd
