import React, { Component } from 'react'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap'
import RkInput from '../Input/RkInput'
import RkMultiSelect from '../Input/RkMultiSelect'
import RkMultiSelectAdd from '../Input/RkMultiSelectAdd'
import RkMultiSelectTag from '../Input/RkMultiSelectTag'
import RkDatetime from '../Input/RkDatetime'
import RkSwitch from '../Input/RkSwitch'
// import RkSlider from '../Input/RkSlider'
import RkCheckbox from '../Input/RkCheckbox'
import RkRadio from '../Input/RkRadio'

class RkFormInput extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('----- ----- UPDATE -------')
    console.log(this.props)
    console.log('--- --- --------- -------')
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.render
  }

  changed = (name, value) => {
    this.props.changed(name, value)
  }

  selectTypeInput (inputProps, rules) {
    const {type = 'text', ...input} = inputProps
    let opt = null
    switch (type) {
      case ('multiSelect'):
        opt = <RkMultiSelect inputProps={input} rules={rules} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('multiSelectTag'):
        opt = <RkMultiSelectTag inputProps={input} rules={rules} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('multiSelectAdd'):
        opt = <RkMultiSelectAdd inputProps={input} rules={rules} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('switch'):
        opt = <RkSwitch inputProps={input} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('checkbox'):
        opt = <RkCheckbox inputProps={input} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('radio'):
        opt = <RkRadio inputProps={input} rules={rules} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('datetime'):
        opt = <RkDatetime inputProps={input} rules={rules} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
        break
      case ('plainText'):
        opt = <Input inputProps={input} plaintext>{ input.value }</Input>
        break
      default:
        opt = <RkInput type={type} inputProps={{...input, type}} rules={rules} changed={this.changed} getFunctions={this.props.inputFunctions} tooltip={this.props.tooltip} />
    }

    return opt
  }

  render() {
    let field = this.props.fields
    if (field.length === undefined) {
      field = [this.props.fields]
    }
    let formGroups = []
    field.map((item, key) => {
      let {inputSize = null, labelSize = null, ...formGroupProps} = item.formGroup ? item.formGroup : {}
      let {labelText = null, ...labelProps} = item.label ? item.label : {}

      let inputProps = {...item.input}
      let rules = {...item.rules}
      let inputTag = this.selectTypeInput(inputProps, rules)
      if (formGroupProps && formGroupProps.row) {
        inputTag = <Col {...inputSize}>{ inputTag }</Col>
      } else {
        labelSize = labelSize === null ? {sm: 12} : labelSize
      }
      let labelTag = labelText ? <Label {...labelProps} {...labelSize}>{labelText}</Label> : null

      let itemSize = item.size

      let formGroup = (
        <Col {...itemSize} key={key}>
          <FormGroup {...formGroupProps} >
            { labelTag }
            { inputTag }
          </FormGroup>
        </Col>
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

export default RkFormInput
