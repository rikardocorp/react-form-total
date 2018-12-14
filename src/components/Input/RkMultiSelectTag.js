import React, {Component} from 'react';
import {InputGroupAddon, InputGroup} from 'reactstrap'
import RkValidate from '../Validate/RkValidate'
// import makeAnimated from 'react-select/lib/animated'
import { checkValidity } from '../Validate/validity/validity'
import CreatableSelect from 'react-select/lib/Creatable'

const components = {
  DropdownIndicator: null
}

const createOption = (label, key, optionLabel, optionValue) => ({
  [optionLabel]: label,
  [optionValue]: label,
  key: Math.random().toString(36).substr(2, 9)
})

class RkMultiSelectTag extends Component {
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
    _localProps: {}
  }

  // componentDidUpdate (prevProps, prevState) {
  //   if (this.state.updateProps) {
  //     this.handlerChangeValue(this.props.inputProps.value, false)
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
      this.handlerChangeValue(this.props.inputProps.value, false)
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
        this.handlerIsValidate,
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

  handlerTouched = (isTouch, group = null) => {
    const _grouping = this.props.grouping
    if (group === null || _grouping[group]) {
      if (!isTouch) {
        this.setState({touched: false, valid: undefined})
      } else {
        const value = this.state.value
        const {isValid, msgError} = checkValidity(value, this.state.rules)
        this.setState({
          // value: value,
          touched: true,
          valid: isValid,
          message: msgError,
          showMessage: true
        })
      }
    }
  }
  handlerReset = (group = null) => {
    const props = {...this.props.inputProps, ...this.state._localProps}
    const {name = ''} = props
    const _grouping = this.props.grouping

    if (group === null || _grouping[group]) {
      this.setState({
        value: [],
        outValue: null,
        // disabled: false,
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
  handlerIsValidate = (group = null) => {
    const _grouping = this.props.grouping
    const value = this.state.value
    if (!this.props.hidden) {
      if (group === null || _grouping[group]) {
        const {isValid} = checkValidity(value, this.state.rules)
        return isValid
      } else {
        return true
      }
    } else {
      return true
    }
  }
  handlerChangeValue = (newValue, cen = true) => {
    let value = newValue ? newValue : []
    if (!Array.isArray(value)) { value = [value] }

    const props = {...this.props.inputProps, ...this.state._localProps}
    const {optionLabel = 'label', optionValue = 'value'} = props
    let conteValue = []
    value.map(it => {
      if (typeof it === 'object') {
        if (it.key === undefined) {
          console.group('MULTISELECT TAG: CHANGE VALUE')
          console.info('Multiselect tag, the object dont have "key" value')
          console.groupEnd('END')
        } else if (it[optionValue] === undefined || it[optionLabel] === undefined) {
          console.group('MULTISELECT TAG: CHANGE VALUE')
          console.info('Multiselect tag, the object dont have "optionValue = ' + optionValue + '" or "optionLabel = ' + optionLabel + '"')
          console.groupEnd('END')
        } else {
          conteValue.push(it)
        }
      } else {
        conteValue.push(createOption(it, conteValue.length, optionLabel, optionValue))
      }
    })

    if (cen) {
      const {isValid, msgError} = checkValidity(conteValue, this.state.rules)
      this.setState({
        value: conteValue,
        outValue: conteValue,
        updateProps: false,
        valid: isValid,
        message: msgError,
        showMessage: true})
    } else {
      this.setState({value: conteValue, outValue: conteValue, updateProps: false})
    }

    if (this.props.changed) {
      const name = this.props.inputProps.name
      this.props.changed(name, conteValue)
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
  // SET LOCAL CHANGE VALUE
  changeValue = (value, actionMeta) => {
    const name = this.props.inputProps.name
    const {isValid, msgError} = checkValidity(value, this.state.rules)
    const outValue = (value && value.length > 0) ? value : null
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
  // SHOW MESSAGE TOOLTIP
  showErrorTooltip = () => {
    this.setState({showMessage: true})
  }
  // HIDE MESSAGE TOOLTIP
  hiddenErrorTooltip = () => {
    this.setState({showMessage: false})
  }
  // REACT SELECT CREATABLES FUNCTIONS
  handleInputChange = (inputValue) => {
    this.setState({ inputValue })
  }
  handleKeyDown = (event) => {
    const { inputValue, value = [] } = this.state
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const props = {...this.props.inputProps, ...this.state._localProps}
        const {optionLabel = 'label', optionValue = 'value', name} = props

        let localValue = []
        if (Array.isArray(value)) {
          localValue = [...value, createOption(inputValue, value.length, optionLabel, optionValue)]
        } else {
          localValue = [createOption(inputValue, 0)]
        }
        const {isValid, msgError} = checkValidity(localValue, this.state.rules)
        this.setState({
          inputValue: '',
          value: localValue,
          outValue: localValue,
          valid: isValid,
          message: msgError,
          showMessage: true
        })
        if (this.props.changed) {
          this.props.changed(name, localValue)
        }
        event.preventDefault()
    }
  }
  isValidNewOption = (inputValue, selectValue, selectOptions) => {
    return !(
      inputValue.trim().length === 0 ||
      selectOptions.find(option => option['key'] === inputValue)
    )
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

    const className =
      ' rk-multiselectTag form-control ' +
      (props.className ? props.className : '') +
      (invalid ? 'is-invalid' : '') +
      (valid ? 'is-valid' : '')

    const customStyles = {
      control: (base, state) => ({
        ...base,
        borderColor: invalid ? '#dc3545 !important' : ((valid ? '#9e9e9e !important' : (state.isFocused ? '#AAAAAA !important' : '#E3E3E3 !important'))),
        boxShadow: (state.isFocused && invalid) ? '0 0 0 0.2rem rgba(220, 53, 69, 0.25)' : 'none'
      })
    }

    const {
      isMulti = false,
      isDisabled = false,
      optionLabel = 'label',
      optionValue = 'value',
      optionDisabled = null,
      placeholder = 'Digite y presione enter...',
      _prepend = null,
      _append = null,
      _tooltip = false,
      ...localProps} = props
    const { inputValue, value } = this.state

    let conteInput = null
    const input = (
      <CreatableSelect
        {...localProps}
        getOptionValue={(option) => (option.key)}
        getOptionLabel={(option) => (option[optionLabel])}
        className={className}
        styles={customStyles}
        components={components}
        inputValue={inputValue}
        isDisabled={isDisabled}
        isOptionDisabled={optionDisabled}
        isClearable
        isMulti
        menuIsOpen={false}
        isValidNewOption={this.isValidNewOption}
        onChange={this.changeValue}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        onFocus={this.showErrorTooltip}
        onBlur={this.hiddenErrorTooltip}
        placeholder={placeholder}
        value={value}
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
        {conteInput}
      </RkValidate>
    )
  }
}

export default RkMultiSelectTag
