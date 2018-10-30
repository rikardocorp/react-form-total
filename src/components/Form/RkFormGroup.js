import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Label, Col, Input } from 'reactstrap'
import RkInput from '../Input/RkInput'
import RkMultiSelect from '../Input/RkMultiSelect'
import RkMultiSelectAdd from '../Input/RkMultiSelectAdd'
import RkMultiSelectTag from '../Input/RkMultiSelectTag'
import RkDatetime from '../Input/RkDatetime'
import RkSwitch from '../Input/RkSwitch'
import RkCheckbox from '../Input/RkCheckbox'
import RkRadio from '../Input/RkRadio'

class RkFormGroup extends Component {
  static propTypes = {
    formGroup: PropTypes.object,
    label: PropTypes.object,
    size: PropTypes.object,
    name: PropTypes.string,
    inputProps: PropTypes.object,
    grouping: PropTypes.object,
    rules: PropTypes.object,
    // inputRef: PropTypes.object,
    inputComponent: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    getFunction: PropTypes.func,
    inputFunctions: PropTypes.func,
    changed: PropTypes.func
  }

  state = {
    _localProps: {
      formGroup: {},
      label: {},
      size: {},
      grouping: {}
    },
    hidden: false,
    inputRef: null,
    getRef: true,
    inputComponent: null
  }

  selectTypeInput (inputProps, rules, grouping = {}) {
    const {type = 'text', ...input} = inputProps
    let opt = null
    const props = {
      inputProps: input,
      changed: this.props.changed,
      getFunctions: this.props.inputFunctions,
      grouping: grouping,
      hidden: this.state.hidden
    }
    switch (type) {
      case ('multiSelect'):
        opt = <RkMultiSelect {...props} rules={rules} />
        break
      case ('multiSelectTag'):
        opt = <RkMultiSelectTag {...props} rules={rules} />
        break
      case ('multiSelectAdd'):
        opt = <RkMultiSelectAdd {...props} rules={rules} />
        break
      case ('switch'):
        opt = <RkSwitch {...props} />
        break
      case ('checkbox'):
        opt = <RkCheckbox {...props} />
        break
      case ('radio'):
        opt = <RkRadio {...props} rules={rules} />
        break
      case ('datetime'):
        opt = <RkDatetime {...props} rules={rules} />
        break
      case ('plainText'):
        opt = <Input inputProps={input} plaintext>{ input.value }</Input>
        break
      default:
        opt = <RkInput type={type} {...props} rules={rules} />
    }

    return opt
  }

  componentDidMount () {
    // console.log(' --[componentDidMount] (rkFormGroup)')
    // SET HANDLER FUNCTIONS
    if (this.props.name && this.props.getFunction) {
      const name = this.props.name
      this.props.getFunction(name, this.handlerChangeProps, this.handlerHidden)
    }
  }

  handlerHidden = (value = null, group = null) => {
    const props = {...this.props.grouping, ...this.state._localProps.grouping}
    const grouping = props
    if (group === null || grouping[group]) {
      if (value !== this.state.hidden) {
        this.setState(state => {
          return {
            hidden: value == null ? !state.hidden : value
          }
        })
      }
    }
  }

  handlerChangeProps = (newProps) => {
    this.setState(state => {
      if (newProps === null) {
        return {
          _localProps: {
            formGroup: {},
            label: {},
            size: {},
            grouping: {}
          }
        }
      } else {
        const { formGroup = {}, label = {}, size = {}, grouping = {} } = newProps
        return {
          _localProps: {
            formGroup: {
              ...state._localProps.formGroup,
              ...formGroup
            },
            label: {
              ...state._localProps.label,
              ...label
            },
            size: {
              ...state._localProps.size,
              ...size
            },
            grouping: {
              ...state._localProps.grouping,
              ...grouping
            }
          }
        }
      }
    })
  }

  render() {
    // console.log('[RENDER] (rkFormGroup)')
    const props = {
      formGroup: {
        ...this.props.formGroup,
        ...this.state._localProps.formGroup
      },
      label: {
        ...this.props.label,
        ...this.state._localProps.label
      },
      size: {
        ...this.props.size,
        ...this.state._localProps.size
      }
    }

    let _inputComponent = this.selectTypeInput(this.props.inputProps, this.props.rules, this.props.grouping)

    let {inputSize = null, labelSize = null, ...formGroupProps} = props.formGroup
    let {labelText = null, ...labelProps} = props.label
    let {...itemSize} = props.size

    // let inputComponent = this.state.inputComponent
    if (formGroupProps && formGroupProps.row) {
    } else {
      labelSize = labelSize === null ? {sm: 12} : {...labelSize, sm: 12, md: 12, lg: 12}
      inputSize = inputSize === null ? {sm: 12} : {...inputSize, sm: 12, md: 12, lg: 12}
    }
    let classNameInputSize = Object.keys(inputSize).map(it => 'col-' + it + '-' + inputSize[it])
    let inputComponent = <div className={classNameInputSize.join(' ')}>{ _inputComponent }</div>
    let labelTag = labelText ? <Label {...labelProps} {...labelSize}>{labelText}</Label> : null

    const hidden = this.state.hidden ? {display: 'none'} : null

    return (
      <Col {...itemSize} style={hidden}>
        <FormGroup {...formGroupProps} row>
          { labelTag }
          { inputComponent }
        </FormGroup>
      </Col>
    )
  }
}

RkFormGroup.defaultProps = {
  formGroup: {},
  label: {},
  size: {},
  grouping: {}
}

export default RkFormGroup
