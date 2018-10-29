import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import RkFormGroup from './RkFormGroup'
// import RkInput from '../Input/RkInput'
// import RkMultiSelect from '../Input/RkMultiSelect'
// import RkMultiSelectAdd from '../Input/RkMultiSelectAdd'
// import RkMultiSelectTag from '../Input/RkMultiSelectTag'
// import RkDatetime from '../Input/RkDatetime'
// import RkSwitch from '../Input/RkSwitch'
// import RkCheckbox from '../Input/RkCheckbox'
// import RkRadio from '../Input/RkRadio'

class RkFormInput extends Component {
  static propTypes = {
    render: PropTypes.bool,
    fields: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    inputFunctions: PropTypes.func,
    formGroupFunctions: PropTypes.func,
    changed: PropTypes.func
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.group('FORM INPUTS: Render Activate')
    console.info('The props "render" is true, we recommend you to keep it in false')
    console.groupEnd('END')
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.render
  }

  changed = (name, value, isReset = false) => {
    this.props.changed(name, value, isReset)
  }

  // selectTypeInput (inputProps, rules, grouping = {}) {
  //   const {type = 'text', ...input} = inputProps
  //   let opt = null
  //   const props = {
  //     inputProps: input,
  //     changed: this.changed,
  //     getFunctions: this.props.inputFunctions,
  //     grouping: grouping,
  //     hidden: true
  //   }
  //   switch (type) {
  //     case ('multiSelect'):
  //       opt = <RkMultiSelect {...props} rules={rules} />
  //       break
  //     case ('multiSelectTag'):
  //       opt = <RkMultiSelectTag {...props} rules={rules} />
  //       break
  //     case ('multiSelectAdd'):
  //       opt = <RkMultiSelectAdd {...props} rules={rules} />
  //       break
  //     case ('switch'):
  //       opt = <RkSwitch {...props} />
  //       break
  //     case ('checkbox'):
  //       opt = <RkCheckbox {...props} />
  //       break
  //     case ('radio'):
  //       opt = <RkRadio {...props} rules={rules} />
  //       break
  //     case ('datetime'):
  //       opt = <RkDatetime {...props} rules={rules} />
  //       break
  //     case ('plainText'):
  //       opt = <Input inputProps={input} plaintext>{ input.value }</Input>
  //       break
  //     default:
  //       opt = <RkInput type={type} {...props} rules={rules} />
  //   }
  //
  //   return opt
  // }

  render() {
    // console.log('[RENDER] (rkFormInput)')
    let field = this.props.fields
    if (field.length === undefined) {
      field = [this.props.fields]
    }
    let formGroups = []
    field.map((item, key) => {
      let inputProps = {...item.input}
      let rules = {...item.rules}
      let grouping = item.grouping ? {...item.grouping} : {}
      let name = item.input ? item.input.name : null
      // let inputTag = this.selectTypeInput(inputProps, rules, grouping)

      let formGroup = (
        <RkFormGroup
          key={key}
          name={name}
          inputProps={inputProps}
          rules={rules}
          grouping={grouping}
          formGroup={item.formGroup}
          label={item.label}
          size={item.size}
          // inputComponent={inputTag}
          getFunction={this.props.formGroupFunctions}
          inputFunctions={this.props.inputFunctions}
          changed={this.changed} />
      )

      formGroups.push(formGroup)
    })

    let resultFormGroup = null
    if (formGroups.length > 1) {
      resultFormGroup = (
        <Col>
          <Row>
            {formGroups}
          </Row>
        </Col>
      )
    } else {
      resultFormGroup = formGroups[0]
    }

    return (
      <Row>{resultFormGroup}</Row>
    )
  }
}

RkFormInput.defaultProps = {
  render: false,
  fields: []
}

export default RkFormInput
