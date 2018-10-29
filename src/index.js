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
    render: PropTypes.bool,
    className: PropTypes.string
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
    if (this.props.children !== undefined && this.props.children !== nextProps.children) return true
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
      $changeExtraProps: this.changeExtraProps,
      $getValues: this.getInputForm,
      $hidden: this.hiddenInputForm
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
  inputFunctionsFormGroup = (name, changeExtraProps, hiddenInput) => {
    this.setState(state => {
      return {
        items: {
          ...state.items,
          [name]: {
            ...state.items[name],
            $changeExtraProps: changeExtraProps,
            $hidden: hiddenInput
          }
        }
      }
    })
  }
  // GET VALUE
  getInputForm = (key = null, byGroup = false) => {
    if (key === null || byGroup) {
      const obj = {}
      Object.keys(this.state.items).map(it => {
        const value = this.state.items[it].$getValue(key)
        if (value !== undefined) obj[it] = this.state.items[it].$getValue(key)
      })
      return obj
    } else {
      if (this.state.items[key]) {
        return this.state.items[key].$getValue()
      }
    }
    return undefined
  }
  // HIDDEN
  hiddenInputForm = (key = null, value = null, byGroup = false) => {
    if (key === null || byGroup) {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$hidden(value, key)
        this.state.items[it].$touch(false)
      })
    } else {
      if (this.state.items[key]) {
        this.state.items[key].$hidden(value)
        this.state.items[key].$touch(false)
      }
    }
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
  // CHANGE LABEL SIZE PROPS
  changeExtraProps = (key, value) => {
    if (this.state.items[key]) {
      this.state.items[key].$changeExtraProps(value)
    }
  }
  // RESET ALL INPUTS FORM
  touchForm = (isTouch = true) => {
    Object.keys(this.state.items).map(it => {
      this.state.items[it].$touch(isTouch)
    })
  }
  // DISABLE ALL FORM
  disableAllForm = (value = null, group = null) => {
    Object.keys(this.state.items).map(it => {
      this.state.items[it].$disable(value, group)
    })
    this.setState({disabled: value})
  }
  // TOUCH ALL INPUTS FORM
  resetForm = (option = null) => {
    if (option === '_input_') {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$reset()
        this.state.items[it].$changeProps(null)
      })
      if (this.state.disabled) this.setState({disabled: false})
    } else if (option === '_all_') {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$changeExtraProps(null)
        this.state.items[it].$reset()
        this.state.items[it].$changeProps(null)
        this.state.items[it].$disable(false, null)
        this.state.items[it].$hidden(false)
      })
      if (this.state.disabled) this.setState({disabled: false})
    } else if (option === '_extra_') {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$changeExtraProps(null)
      })
    } else {
      Object.keys(this.state.items).map(it => {
        this.state.items[it].$reset(option)
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
  inputChanged = (name, value, isReset = false) => {
    const formName = this.props.name
    if (this.props.inputChanged) {
      this.props.inputChanged(formName, name, value, isReset)
    }
  }

  render() {
    const {children, inputs, render, className = ''} = this.props
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
      return (
        <RkFormInput
          key={key}
          fields={fInput}
          render={render}
          changed={this.inputChanged}
          inputFunctions={this.inputFunctions}
          formGroupFunctions={this.inputFunctionsFormGroup} />
      )
    })

    const _className = 'rkForm form-horizontal ' + (className === '' ? '' : (className + ' '))

    return (
      <form className={_className + (this.state.disabled ? 'rkForm-disabled' : '')} autoComplete='off'>
        { _inputs }
        { children ? <div>{children}</div> : null }
      </form>
    )
  }
}

RkForm.defaultProps = {
  // isLoading: false,
  className: '',
  render: false
}

export default RkForm
