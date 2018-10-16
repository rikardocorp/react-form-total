import React, { Component } from 'react'

import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/general.css'
import './assets/css/mainRkForm.css'
import './assets/css/checkbox_radio.css'
import './assets/css/bootstrap_switch.css'
import './assets/css/react-datetime.css'

import RkForm from 'react-form-total'
// import RkForm from '../../dist/'
import {Button, Card, Col, Row} from 'reactstrap'
import {test} from './variables'
// import moment from 'moment'

export default class App extends Component {
  state = {
    render: false,
    form1: {
      name: test.name,
      item: {...test.post},
      inputs: {...test.inputs}
    }
  }

  handlerSubmit = () => {
    console.log('SUBMIT')
    console.log(this.state.form1.item)
    console.log(this.state.form1.$isValid())
  }
  inputChangedHandler = (formName, name, value) => {
    this.setState(state => {
      return {
        [formName]: {
          ...state[formName],
          item: {
            ...state[formName].item,
            [name]: value
          }
        },
        render: false
      }
    })
  }
  inputFormHandler = (formName, callbackFunctions) => {
    this.setState(state => {
      return {
        [formName]: {
          ...state[formName],
          ...callbackFunctions
        }
      }
    })
  }

  render () {
    return (
      <Card className='mb-5'>
        <Row className={'d-flex justify-content-center'}>
          <Col md={3} lg={2}>
            <div className='groupButton mt-3'>
              <Button size='sm' color='primary' onClick={() => this.state.form1.$change('input1', 'Change Value by Click')}>Change Input1</Button>
              <Button size='sm' color='primary' onClick={() => this.state.form1.$changeProps('input1', {disabled: true})}>Change Props Input1</Button>
            </div>

            <div className='groupButton mt-3'>
              <Button size='sm' color='warning' onClick={() => this.state.form1.$change('input2', 2018)}>Change Input2</Button>
              <Button size='sm' color='warning' onClick={() => this.state.form1.$changeProps('input2', {placeholder: 'Is a number?'})}>Change Props Input2</Button>
            </div>

            <div className='groupButton mt-3'>
              <Button size='sm' color='info' onClick={() => this.state.form1.$change('input3', 'This is fantastic!!')}>Change Input3</Button>
              <Button size='sm' color='info' onClick={() => this.state.form1.$changeProps('input3', {_prepend: '@', _append: '@'})}>Change Props Input3</Button>
            </div>

            <div className='groupButton mt-3'>
              {/*<Button size='sm' color='success' onClick={() => this.state.form1.$change('input5', [{ id: 3, value1: 'rikardocorp', label1: 'rikardocorp' }])}>Change MultiSelect Input5</Button>*/}
              {/*<Button size='sm' color='success' onClick={() => this.state.form1.$change('input5', { id: 3, value1: 'vanilla', label1: 'Vanilla' })}>Change MultiSelect Input5.0</Button>*/}
              <Button size='sm' color='success' onClick={() => this.state.form1.$change('input5', [1, 3, 100])}>Change MultiSelect Input5.1</Button>
              <Button size='sm' color='success' onClick={() => this.state.form1.$changeProps('input5', {isMulti: true})}>Change Props MultiSelect Input5</Button>
              {/*<Button size='sm' color='success' onClick={() => this.state.form1.$changeProps('input5', {isMulti: false})}>Change Props MultiSelect Input5.1</Button>*/}
            </div>

            <div className='groupButton mt-3'>
              {/*<Button size='sm' color='danger' onClick={() => this.state.form1.$change('input6', [{ id: 2, value1: 'strawberry', label1: 'Strawberry', user: 'inge2' }, { id: 3, value1: 'vanilla', label1: 'Vanilla', user: 'inge3' }])}>Change MultiSelectADD Input6</Button>*/}
              <Button size='sm' color='danger' onClick={() => this.state.form1.$change('input6', [2, 3, 6])}>Change MultiSelectADD Input6</Button>
              <Button size='sm' color='danger' onClick={() => this.state.form1.$changeProps('input6', {addOption: true, isMulti: false, _prepend: null})}>Change Props MultiSelectADD Input6</Button>
            </div>

            <div className='groupButton mt-3'>
              <Button size='sm' color='secondary' onClick={() => this.state.form1.$change('input7', ['Item1', 'Item2', 'Item3', 'Item4'])}>Change MultiSelectADD Input7</Button>
              <Button size='sm' color='secondary' onClick={() => this.state.form1.$change('input7', [{value1: '12', label1: 'rikardocorp', key: 1}])}>Change MultiSelectADD Input7</Button>
              <Button size='sm' color='secondary' onClick={() => this.state.form1.$changeProps('input7', {isDisabled: true, placeholder: 'The best Tag'})}>Change Props MultiSelectTag Input7</Button>
            </div>

            <div className='groupButton mt-3'>
              <Button size='sm' color='' onClick={() => this.state.form1.$change('input8', '19-09-2018 09:12:19', true)}>Change Datetime Input8</Button>
              <Button size='sm' color='' onClick={() => this.state.form1.$changeProps('input8', {utc: true, dateFormat: 'DD-MM-YYYY', returnFormat: 'DD/MM/YYYY HH:mm:ss'})}>Change Props Datetime Input8</Button>
            </div>

            <div className='groupButton mt-4'>
              <Button size='sm' color='primary' onClick={() => this.state.form1.$change('input9', 'Python')}>Change Radio Input9</Button>
              <Button size='sm' color='primary' onClick={() => this.state.form1.$changeProps('input9', {disabled: true})}>Change Props Radio Input9</Button>
            </div>
          </Col>

          <Col md={5} lg={4}>
            <RkForm name='form1' render={this.state.render} inputs={this.state.form1.inputs} inputChanged={this.inputChangedHandler} inputFormHandler={this.inputFormHandler} >
              <div className={'d-flex justify-content-around'}>
                <Button size='sm' color='primary' onClick={this.handlerSubmit}>Submit</Button>
                <Button size='sm' color='warning' onClick={this.state.form1.$touch}>Touch</Button>
                <Button size='sm' color='danger' onClick={this.state.form1.$reset}>Reset</Button>
                <Button size='sm' color='danger' onClick={() => this.state.form1.$reset('_all_')}>Reset All</Button>
                <Button size='sm' color='' onClick={() => this.state.form1.$disable(true)}>Disable All</Button>
              </div>
            </RkForm>
          </Col>
        </Row>
      </Card>
    )
  }
}

