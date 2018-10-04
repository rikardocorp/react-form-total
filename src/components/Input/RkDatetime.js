// REACT DATETIME
// https://github.com/YouCanBookMe/react-datetime#i18n
// -----------------------------------------------------
import React, {Component} from 'react'
import { checkValidity } from '../Validate/validity/validity'
import {InputGroup, InputGroupAddon} from 'reactstrap'
import RkValidate from '../Validate/RkValidate'
import Datetime from 'react-datetime'
import moment from 'moment'
import 'moment/locale/es'

// const NOW = '_now_'
const DEFAULT_FDATE = 'DD/MM/YYYY'
const DEFAULT_FTIME = 'HH:mm:ss'
const DEFAULT_RETURN_FORMAT = 'DD/MM/YYYY HH:mm:ss'

class RkDatetime extends Component {
  state = {
    value: null,
    defaultValue: null,
    valid: undefined,
    touched: false,
    message: '',
    showMessage: false,
    rules: {},
    _localProps: {}
  }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    const {value = null, name} = this.props.inputProps
    let newValue = value
    if (newValue) {
      const dateEvaluate = this.generateDateValue(newValue)
      let _value = dateEvaluate[0]
      let _outValue = dateEvaluate[1]
      this.setState({value: _value})
      if (this.props.changed) {
        this.props.changed(name, _outValue)
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
  }

  handlerTouched = () => {
    if (this.state.touched) {
      this.setState({touched: false, valid: undefined})
    } else {
      const value = this.state.value
      // console.log(value)
      const {isValid, msgError} = checkValidity(value, this.state.rules)
      // console.log(isValid, msgError)
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
  handlerChangeValue = (newValue, isUTC = undefined) => {
    const name = this.props.inputProps.name
    const dateEvaluate = this.generateDateValue(newValue, isUTC)
    let _value = dateEvaluate[0]
    let _outValue = dateEvaluate[1]
    const {isValid, msgError} = checkValidity(_value, this.state.rules)
    this.setState({
      value: _value,
      valid: isValid,
      message: msgError,
      showMessage: true
    })
    if (this.props.changed) {
      this.props.changed(name, _outValue)
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
    this.handlerChangeProps({inputProps: {disabled: value}})
  }
  generateDateValue = (newValue, isUTC = undefined) => {
    if (newValue) {
      const props = {...this.props.inputProps, ...this.state._localProps}
      let {returnFormat = DEFAULT_RETURN_FORMAT, utc = true} = props

      let _value = null
      let _outValue = null

      if (newValue instanceof moment) {
        // newValue = newValue
      } else if (typeof newValue === 'string') {
        newValue = moment(newValue, returnFormat)
      } else {
        newValue = null
      }

      if (newValue && newValue.isValid()) {
        if (utc) {
          _value = newValue
          if (isUTC !== undefined) {
            _outValue = isUTC ? newValue.format(returnFormat) : moment(newValue).utc(false).format(returnFormat)
          } else {
            _outValue = newValue.format(returnFormat)
          }
        } else {
          _value = newValue
          if (isUTC !== undefined) {
            _outValue = isUTC ? newValue.format(returnFormat) : moment(newValue).utc(false).format(returnFormat)
          } else {
            _outValue = moment(newValue).utc(false).format(returnFormat)
          }
        }
      }
      // console.log(_value, _outValue)
      return [_value, _outValue]
    }
    return [null, null]
  }
  onChange = (newValue) => {
    this.handlerChangeValue(newValue)
  }
  generateCondition = (condition) => {
    if (condition) {
      const min = condition.min
      const max = condition.max
      let dateMin = null
      let dateMax = null
      if (min || typeof min === 'number') dateMin = min <= 0 ? moment().subtract(Math.abs(min - 1), 'day') : moment().add(Math.abs(min - 1), 'day')
      if (max || typeof max === 'number') dateMax = max < 0 ? moment().subtract(Math.abs(max), 'day') : moment().add(Math.abs(max), 'day')
      return [dateMin, dateMax]
    }
    return [null, null]
  }
  isValiDateRange = (current, params) => {
    let condition = true
    if (params[0]) condition = condition && current.isAfter(params[0])
    if (params[1]) condition = condition && current.isBefore(params[1])
    return condition
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
    // let date = new Date()
    const props = {
      ...this.props.inputProps,
      ...this.state._localProps,
      value: this.state.value
    }

    const {
      dateFormat = DEFAULT_FDATE,
      timeFormat = DEFAULT_FTIME,
      returnFormat = DEFAULT_RETURN_FORMAT,
      menuStatic = false,
      open = undefined,
      className = '',
      validDateRange = undefined,
      value,
      isValidDate = null,
      utc = true,
      _prepend = null,
      _append = null,
      ...localProps} = props

    const paramsValidDate = this.generateCondition(validDateRange)
    const validFunction = validDateRange ? (current) => this.isValiDateRange(current, paramsValidDate) : isValidDate

    let valid
    let invalid
    if (this.state.valid !== undefined) {
      valid = this.state.valid
      invalid = !this.state.valid ? !this.state.valid : undefined
    }

    const _className =
      ' rk-datetime form-control ' + className + ' ' + (menuStatic && open ? 'rdt-static' : '') +
      (invalid ? 'is-invalid' : '') +
      (valid ? 'is-valid' : '')

    let conteInput = null
    const input = (
      <Datetime
        {...localProps}
        locale='es'
        className={_className}
        value={value}
        open={open}
        isValidDate={validFunction}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        onChange={this.onChange}
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

export default RkDatetime
