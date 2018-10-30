import React, {Component} from 'react'
import ReactFormTotal from 'react-form-total'
import {UncontrolledCollapse, Button} from 'reactstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {required, email} from '../../assets/validity/validators/'

const inputs = {
  input1: {
    label: {
      labelText: 'Text Input'
    },
    input: {
      type: 'text',
      placeholder: 'Input type Text',
    },
    rules: {
      required
    },
    grouping: {
      grupo1: true
    }
  },
  input2: {
    label: {
      labelText: 'Number Input'
    },
    input: {
      type: 'number',
      placeholder: 'Input type Number'
    },
    rules: {
      required
    },
    grouping: {
      grupo1: true
    }
  },
  input3: {
    label: {
      labelText: 'Email Input'
    },
    input: {
      type: 'email',
      placeholder: 'Type a valid email'
    },
    rules: {
      required,
      email
    },
    grouping: {
      grupo1: true
    }
  },
  __group_1: {
    check1: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Prepend All',
        color: 'secondary'
      }
    },
    check2: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Change lineal row',
        color: 'success'
      }
    },
    check3: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Change placeholder',
        color: 'danger'
      }
    }
  }
}

const code = `
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
`.trim()

class SimpleExample extends Component {
  state = {
    form: {
      name: 'form'
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

  inputChangedHandler = (formName, name, value, isReset) => {
    // console.log('isReset ', name, isReset)
    if (name === 'check1' && !isReset) {
      this.state.form.$changeProps('input1', {_prepend: value ? <span className='input-group-text'><i className='fa fa-user' /></span> : null})
      this.state.form.$changeProps('input2', {_prepend: value ? <span className='input-group-text'><i className='fa fa-calculator' /></span> : null})
      this.state.form.$changeProps('input3', {_prepend: value ? <span className='input-group-text'><i className='fa fa-envelope-o' /></span> : null})
    }
    if (name === 'check2' && !isReset) {
      const newFormGroup = {
        row: value,
        labelSize: {sm: 6, md: 4},
        inputSize: {sm: 6, md: 8}
      }
      this.state.form.$changeExtraProps('input1', {formGroup: newFormGroup})
      this.state.form.$changeExtraProps('input2', {formGroup: newFormGroup})
      this.state.form.$changeExtraProps('input3', {formGroup: newFormGroup})
    }
    if (name === 'check3' && !isReset) {
      const oldPlaceholder = inputs.input1.input.placeholder
      this.state.form.$changeProps('input1', {placeholder: value ? 'Setting new placeholder... ' : oldPlaceholder})
      // this.state.form.$changeProps('input1', {disabled: false})
    }
  }

  handlerSubmit = () => {
    const data = this.state.form.$getValues('grupo1', true)
    if (this.state.form.$isValid()) {
      this.props.toggleModal(data)
    } else {
      this.state.form.$touch()
    }
    console.log(data)
  }

  handlerDisable = () => {
    this.state.form.$disable(null, 'grupo1')
    // this.state.form.$disable(true)
  }

  render() {
    console.log('UPDATE [Simple Controlled]')
    // const codeString = JSON.stringify(inputs, null, 3)
    const codeString = code
    return (
      <section>
        <h2 className='clearfix'>Simple Form Example Controlled <Button id='toggler2' size='sm' className='float-right' color='link'>Show Code</Button></h2>
        <UncontrolledCollapse toggler='#toggler2'>
          <React.Fragment>
            <p className='text-secondary pl-3'>Inputs Props Object</p>
            <SyntaxHighlighter className='react-code' style={this.props.styleCode}>
              {codeString}
            </SyntaxHighlighter>
          </React.Fragment>
        </UncontrolledCollapse>

        <ReactFormTotal
          name={this.state.form.name}
          inputs={inputs}
          inputChanged={this.inputChangedHandler}
          inputFormHandler={this.inputFormHandler}
          className='w-75 m-auto'>
          <div className='clearfix'>
            <Button color='danger' className='float-left' onClick={() => this.state.form.$reset('grupo1')}>$reset</Button>
            <Button color='secondary' className='float-left ml-2' onClick={() => this.state.form.$reset('_all_')}>$reset[_all_]</Button>
            <Button color='warning' className='float-left ml-2' onClick={this.handlerDisable}>Disable</Button>
            <Button color='primary' className='float-right' onClick={this.handlerSubmit}>Submit</Button>
          </div>
        </ReactFormTotal>
      </section>
    )
  }
}

export default SimpleExample
