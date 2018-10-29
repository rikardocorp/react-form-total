import React, {Component} from 'react'
import {Input} from 'reactstrap'
import PropTypes from 'prop-types'

// import Switch from 'react-bootstrap-switch'

class RkCheckbox extends Component {
  static propTypes = {
    name: PropTypes.string,
    inputProps: PropTypes.object,
    grouping: PropTypes.object,
    getFunctions: PropTypes.func,
    changed: PropTypes.func
  }
  state = {
    cbId: Math.random().toString(16).slice(2),
    value: false,
    disabled: false,
    outValue: false,
    touched: false,
    updateProps: false,
    _localProps: {}
  }

  componentWillMount () {
    // INIT VALUES BY DEFAULT
    if (this.props.inputProps.value !== undefined || this.props.__value !== undefined) {
      const value = this.props.inputProps.value ? this.props.inputProps.value : false
      this.handlerChangeValue(value)
    }
  }

  componentDidMount () {
    // SET HANDLER FUNCTIONS
    if (this.props.inputProps.name) {
      const name = this.props.inputProps.name
      this.props.getFunctions(
        name,
        () => this.handlerTouched(),
        this.handlerReset,
        () => this.handlerIsValidate(),
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
      this.setState({value: false, outValue: false, disabled: false})
      if (this.props.changed) {
        this.props.changed(name, false, true)
      }
    }
  }
  handlerIsValidate = () => {
    return true
  }
  handlerChangeValue = (newValue) => {
    const name = this.props.inputProps.name
    let localValue = null
    if (newValue === undefined) {
      this.setState(state => {
        localValue = !state.value
        if (this.props.changed) {
          this.props.changed(name, localValue)
        }
        return {
          value: localValue,
          outValue: localValue
        }
      })
      return
    } else if (typeof newValue === 'boolean') {
      localValue = newValue
    } else {
      localValue = false
    }
    this.setState({value: localValue, outValue: localValue})

    if (this.props.changed) {
      this.props.changed(name, localValue)
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
  changeValue = () => {
    this.handlerChangeValue()
  }

  render() {
    let props = {
      ...this.props.inputProps,
      ...this.state._localProps
    }
    if (this.state.disabled) {
      props = props.disabled ? {disabled: this.state.disabled, ...props} : {...props, disabled: this.state.disabled}
    }

    const {label = 'test', position = 'left', color = null, disabled = false, className = '', style = null} = props
    return (
      <div className={'checkbox text-' + position + (color ? ' checkbox-' + color : '') + ' ' + className} style={style}>
        <Input id={this.state.cbId} type='checkbox' onChange={this.changeValue} checked={this.state.value} disabled={disabled} />
        <label htmlFor={this.state.cbId}>{label}</label>
      </div>
    )
  }
}

export default RkCheckbox
