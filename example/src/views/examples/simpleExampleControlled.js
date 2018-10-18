import React, {Component} from 'react';
import ReactFormTotal from 'react-form-total'
import {Button} from 'reactstrap'

const inputs = {
  input1: {
    label: {
      labelText: 'Text Input'
    },
    input: {
      type: 'text',
      placeholder: 'Input type Text'
    }
  },
  input2: {
    label: {
      labelText: 'Number Input'
    },
    input: {
      type: 'number',
      placeholder: 'Input type Number'
    }
  },
  input3: {
    label: {
      labelText: 'Email Input'
    },
    input: {
      type: 'email'
    }
  }
}

class SimpleExample extends Component {
  state = {
    form: {
      name: 'form',
    }
  }

  inputFormHandler = (forname, callbackControls) => {
    this.setState(state => {
      return {
        [forname]: {
          ...state[forname],
          ...callbackControls
        }
      }
    })
  }

  handlerSubmit = () => {
    const data = this.state.form.$getValues()
    this.props.toggleModal(data)
    console.log(data)
  }

  render() {
    return (
      <ReactFormTotal name={this.state.form.name} inputs={inputs} inputFormHandler={this.inputFormHandler}>
        <div className='clearfix'>
          <Button color='secondary' className='float-left' onClick={() => this.state.form.$reset()}>Reset</Button>
          <Button color='primary' className='float-right' onClick={this.handlerSubmit}>Submit</Button>
        </div>
      </ReactFormTotal>
    )
  }
}

export default SimpleExample
