// GITHUB
// https://github.com/Julusian/react-bootstrap-switch
import React, {Component} from 'react'
import Switch from 'react-bootstrap-switch'
// import { checkValidity } from '../../../shared/validity/validity'

class RkSwitch extends Component {
  state = {
    value: true,
    outValue: true,
    disabled: false,
    realValue: null,
    defaultValue: '',
    touched: false,
    updateProps: false,
    _localProps: {}
  }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    if (this.props.inputProps.value !== undefined) {
      const value = this.props.inputProps.value
      let newValue = false
      if (typeof value === 'boolean') {
        newValue = value
      } else if (typeof value === 'number') {
        newValue = !(value === 0)
      }

      this.setState({value: newValue, outValue: value, realValue: value})
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
        this.handlerTouched,
        this.handlerReset,
        this.handlerIsValidate,
        this.handlerDisabledInput,
        this.handlerChangeValue,
        this.handlerChangeProps,
        this.getValue
      )
    }
  }

  getValue = (group = null) => {
    const _grouping = this.props.grouping
    if (group === null || _grouping[group]) {
      return this.state.outValue
    }
    return undefined
  }

  handlerTouched = () => {}
  handlerReset = (group = null) => {
    const props = {...this.props.inputProps, ...this.state._localProps}
    const {name = ''} = props
    const _grouping = this.props.grouping

    if (group === null || _grouping[group]) {
      const realValue = typeof this.state.realValue === 'number' ? 0 : false
      this.setState({
        value: false,
        outValue: realValue,
        // disabled: false,
        valid: undefined,
        touched: false,
        message: '',
        showMessage: false
      })
      if (this.props.changed) {
        this.props.changed(name, realValue, true)
      }
    }
  }
  handlerIsValidate = () => {
    // const value = this.state.value
    // const {isValid} = checkValidity(value, this.state.rules)
    // return isValid
    return true
  }
  handlerChangeValue = (newValue, cen = true) => {
    let value = null
    let realValue = null
    if (cen) {
      realValue = newValue
      if (typeof newValue === 'boolean') {
        value = newValue
      } else if (typeof newValue === 'number') {
        value = !(newValue === 0)
      } else {
        value = false
        realValue = false
      }
    } else {
      value = newValue
      if (typeof this.state.realValue === 'number') {
        realValue = value ? 1 : 0
      } else {
        realValue = value
      }
    }

    const name = this.props.inputProps.name
    this.setState({
      value: value,
      outValue: realValue,
      realValue: realValue
    })
    if (this.props.changed) {
      this.props.changed(name, realValue)
    }
  }
  handlerChangeProps = (newValue = null) => {
    if (typeof newValue === 'object' || newValue === null) {
      this.setState(state => {
        if (newValue === null) {
          return {
            _localProps: {}
          }
        } else {
          return {
            _localProps: {
              ...state._localProps,
              ...newValue
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
  changeValue = (el, state) => {
    this.handlerChangeValue(state, false)
  }
  render() {
    let props = {
      ...this.props.inputProps,
      ...this.state._localProps,
      value: this.state.value
    }
    if (this.state.disabled) {
      props = props.disabled ? {disabled: this.state.disabled, ...props} : {...props, disabled: this.state.disabled}
    }

    const {position = 'center', ...localProps} = props
    // const _className = 'form-control ' + className
    return (
      <div className={'text-' + position}>
        <Switch {...localProps} onChange={this.changeValue} />
      </div>
    )
  }
}

export default RkSwitch
