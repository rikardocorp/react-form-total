// GITHUB
// https://github.com/Julusian/react-bootstrap-switch
import React, {Component} from 'react'
import Switch from 'react-bootstrap-switch'
// import { checkValidity } from '../../../shared/validity/validity'

class RkSwitch extends Component {
  state = {
    tooltip: false,
    value: true,
    realValue: null,
    defaultValue: '',
    touched: false,
    updateProps: false,
    _localProps: {}
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.updateProps) {
      const value = this.props.inputProps.value
      let newValue = false
      if (typeof value === 'boolean') {
        newValue = value
      } else if(typeof value === 'number') {
        newValue = !(value === 0)
      }
      this.setState({value: newValue, realValue: value, updateProps: false})
      if (this.props.changed) {
        const name = this.props.inputProps.name
        this.props.changed(name, value)
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.inputProps.value !== undefined) {
      this.setState({updateProps: true})
    }
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

      this.setState({value: newValue, realValue: value})
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
  }

  handlerTouched = () => {
    // console.log('resetTouched')
    // if (this.state.touched) {
    //     this.setState({touched: false, valid: undefined})
    // } else {
    //     const value = this.state.value
    //     const {isValid, msgError} = checkValidity(value, this.state.rules)
    //     this.setState({
    //         touched: true,
    //         valid: isValid,
    //         message: msgError,
    //         showMessage: true
    //     })
    // }
  }
  handlerReset = () => {
    const name = this.props.inputProps.name
    const realValue = typeof this.state.realValue === 'number' ? 1 : true
    this.setState({
      value: true,
      valid: undefined,
      touched: false,
      message: '',
      showMessage: false
    })
    if (this.props.changed) {
      this.props.changed(name, realValue)
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
  handlerDisabledInput = (value) => {
    this.handlerChangeProps({disabled: value})
  }
  // SET LOCAL CHANGE VALUE
  changeValue = (el, state) => {
    this.handlerChangeValue(state, false)
  }
  render() {
    const props = {
      ...this.props.inputProps,
      ...this.state._localProps,
      value: this.state.value
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
