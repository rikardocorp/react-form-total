import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RkFormInput from './components/Form/RkFormInput'

class RkForm extends Component {
  static propTypes = {
    name: PropTypes.string,
    inputs: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    inputFormHandler: PropTypes.func,
    inputChanged: PropTypes.func,
    render: PropTypes.bool
    // isLoading: PropTypes.bool
  }

  state = {
    items: {},
    disabled: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.render) return true
    if (this.props.inputs !== undefined && this.props.inputs !== nextProps.inputs) return true
    if (this.props.name !== undefined && this.props.name !== nextProps.name) return true
    return false
  }

  componentWillMount () {
    // SET FORM FUNCTIONS
    const formName = this.props.name
    const _function = {
      $touch: this.touchForm,
      $reset: this.resetForm,
      $isValid: this.validateForm,
      $disable: this.disableAllForm,
      $change: this.changeInputForm,
      $changeProps: this.changeInputProps,
      $getValues: this.getInputForm
    }
    if (this.props.inputFormHandler) {
      this.props.inputFormHandler(formName, _function)
    }
  }

  // GET FUNCTION BY INPUTS
  inputFunctions = (name, eventTouched, eventReset, eventIsValid, disableInput, changeValue, changeProps, getValue) => {
    this.setState(state => {
      return {
        items: {
          ...state.items,
          [name]: {
            ...state.items[name],
            $touch: eventTouched,
            $reset: eventReset,
            $isValid: eventIsValid,
            $disable: disableInput,
            $change: changeValue,
            $changeProps: changeProps,
            $getValue: getValue
          }
        }
      }
    })
  }
  // GET VALUE
  getInputForm = (key = null) => {
    if (key === null) {
      const obj = {}
      Object.keys(this.state.items).map(it => {
        obj[it] = this.state.items[it].$getValue()
      })
      return obj
    } else {
      if (this.state.items[key]) {
        return this.state.items[key].$getValue()
      }
    }
    return undefined
  }
  // CHANGE VALUE
  changeInputForm = (key, value, extra = undefined) => {
    if (this.state.items[key]) {
      this.state.items[key].$change(value, extra)
    }
  }
  // CHANGE INPUT PROPS
  changeInputProps = (key, value, extra = undefined) => {
    if (this.state.items[key]) {
      this.state.items[key].$changeProps(value, extra)
    }
  }
  // RESET ALL INPUTS FORM
  touchForm = (isTouch = true) => {
    Object.keys(this.state.items).map(it => {
      this.state.items[it].$touch(isTouch)
    })
  }
  // DISABLE ALL FORM
  disableAllForm = (value) => {
    Object.keys(this.state.items).map(it => {
      this.state.items[it].$disable(value)
    })
    this.setState({disabled: value})
  }
  // TOUCH ALL INPUTS FORM
  resetForm = (option = null) => {
    if (option === '_all_') {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$reset()
        this.state.items[it].$changeProps(null)
      })
      this.setState({disabled: false})
    } else {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$reset()
      })
    }
  }
  // VALID ALL INPUTS FORM
  validateForm = () => {
    let isValidate = true
    let keys = Object.keys(this.state.items)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let valid = this.state.items[key].$isValid()
      if (valid === false) {
        isValidate = false
        break
      }
    }
    return isValidate
  }
  // SET CHANGE VALUES FORM
  inputChanged = (name, value) => {
    const formName = this.props.name
    if (this.props.inputChanged) {
      this.props.inputChanged(formName, name, value)
    }
  }

  render() {
    const {children, inputs, render} = this.props
    const FormInputs = inputs
    const _inputs = Object.keys(FormInputs).map(key => {
      let fInput = null
      if (key[0] === '_' && key[1] === '_') {
        fInput = Object.keys(FormInputs[key]).map(iKey => {
          return (
            FormInputs[key][iKey] = {
              ...FormInputs[key][iKey],
              input: {
                ...FormInputs[key][iKey]['input'],
                name: iKey
              }
            }
          )
        })
      } else {
        FormInputs[key]['input'] = {
          ...FormInputs[key]['input'],
          name: key
        }
        fInput = FormInputs[key]
      }
      return <RkFormInput key={key} fields={fInput} render={render} changed={this.inputChanged} inputFunctions={this.inputFunctions} />
    })

    return (
      <form className={'rkForm form-horizontal ' + (this.state.disabled ? 'rkForm-disabled' : '')} autoComplete='off' >
        { _inputs }
        { children ? <div>{children}</div> : null }
      </form>
    )
  }
}

RkForm.defaultProps = {
  // isLoading: false,
  render: false
}

export default RkForm
