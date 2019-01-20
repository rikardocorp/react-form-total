import React, {Component} from 'react';
import ReactFormTotal from 'react-form-total'
import {UncontrolledCollapse, Button} from 'reactstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {required, maxLength} from '../../assets/validity/validators/'

const inputs = {
  __group_1: {
    input1: {
      // style: {background: 'orange'},
      size: {sm: 7},
      label: {
        labelText: 'Text Input'
      },
      input: {
        type: 'text',
        placeholder: 'Input type Text'
      },
      rules: {
        required,
        maxLength: maxLength(5)
      },
      grouping: {
        group1: true
      }
    },
    input2: {
      // className: 'bg-danger',
      size: {sm: 5},
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
        group1: true
      }
    }
  },
  input3: {
    label: {
      labelText: 'MultiSelect Input'
    },
    input: {
      type: 'multiSelect',
      optionValue: 'id',
      optionLabel: 'label',
      options: [{id: 1, label: 'React'}, {id: 2, label: 'Vuejs'}, {id: 3, label: 'Angular'}]
    },
    rules: {
      required
    },
    grouping: {
      group1: true
    }
  },
  input4: {
    label: {
      labelText: 'MultiSelectAdd Input'
    },
    input: {
      type: 'multiSelectAdd',
      optionValue: 'id',
      optionLabel: 'label',
      options: [{id: 1, label: 'React'}, {id: 2, label: 'Vuejs'}, {id:3, label: 'Angular'}]
    },
    rules: {
      required
    }
  },
  input5: {
    label: {
      labelText: 'MultiSelectTag Input'
    },
    input: {
      type: 'multiSelectTag',
      optionValue: 'id',
      optionLabel: 'label',
      value: [{id: 1, label: 'React', key: 1}, {id:2, label: 'Vuejs', key: 2}, {id:3, label: 'Angular', key: 3}]
    }
  },
  input6: {
    label: {
      labelText: 'Datetime Input'
    },
    input: {
      type: 'datetime',
      inputProps: {placeholder: 'Pick a day'}
    },
    rules: {
      required
    }
  },
  __group_2: {
    input7: {
      label: {
        labelText: 'Radio'
      },
      input: {
        type: 'radio',
        color: 'success',
        position: 'left',
        inline: false,
        options: [{label: 'Python', value: 'Py', color: 'warning', position: 'left'}, {label: 'Javascript', value: 'JS', color: 'danger', position: 'left'}, 'React']
      },
      rules: {
        required
      }
    },
    input8: {
      label: {
        labelText: 'Checkbox'
      },
      input: {
        type: 'checkbox',
        label: 'Select 1',
        position: 'left',
        color: 'success'
      }
    },
    input9: {
      label: {
        labelText: 'Switch'
      },
      input: {
        type: 'switch',
        position: 'center',
        onColor: 'danger',
        onText: 'Yes',
        offText: 'NO',
        bsSize: 'small'
      }
    }
  }
}

const functions = `
const _function = {
  $touch: //touch form show requirements,
  $reset: //reset all the form or by groups,
  $isValid: //is validate form ?,
  $disable: //disable all the form or by groups,
  $change: //change Input Value,
  $changeProps: //change Input Props,
  $changeExtraProps: //change label, formGroup and size props
  $getValues: //get inputs values, by key, groups and all values
  $hidden: // hide the input by name, groups or all inputs
}`.trim()

class SimpleExample extends Component {
  state = {
    form: {
      name: 'form'
    }
  }

  inputChangedHandler = (formName, name, value) => {
    console.log(formName, name, value)
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
    const isValid = this.state.form.$isValid()
    const data = this.state.form.$getValues()
    // this.props.toggleModal(data)
    console.log('handlerSubmit')
    console.log(data)
    if (isValid) {
    } else {
      // this.state.form.$touch(true, 'group1', true)
      this.state.form.$touch(true)
    }
    console.log(isValid)
  }

  handlerDisable = () => {
    this.state.form.$disable(null)
    // this.state.form.$disable(true)
  }

  render() {
    const codeString = functions
    return (
      <section>
        <h2 className='clearfix'>Complete Form Example Controlled <Button id='toggler3' size='sm' className='float-right' color='link'>Show Code</Button></h2>
        <UncontrolledCollapse toggler='#toggler3'>
          <React.Fragment>
            <p className='text-secondary pl-3'>Available functions to manage the component and modify the inputs.</p>
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
            <Button color='danger' className='float-left' onClick={() => this.state.form.$reset()}>$reset</Button>
            <Button color='secondary' className='float-left ml-2' onClick={() => this.state.form.$touch()}>$touch</Button>
            <Button color='transparency' className='float-left ml-2' onClick={() => this.state.form.$hidden('group1', null, true)}>$hidden</Button>
            <Button color='warning' className='float-left ml-2' onClick={this.handlerDisable}>$disable</Button>
            <Button color='primary' className='float-right' onClick={this.handlerSubmit}>Submit</Button>
          </div>
        </ReactFormTotal>
      </section>
    )
  }
}

export default SimpleExample;
