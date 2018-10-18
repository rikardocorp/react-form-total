import React, {Component} from 'react';
import ReactFormTotal from 'react-form-total'
import {Button} from 'reactstrap'
import {required, maxLength} from '../../assets/validity/validators/'

const inputs = {
  __group_1: {
    input1: {
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
      }
    },
    input2: {
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
      options: [{id:1, label: 'React'}, {id:2, label: 'Vuejs'}, {id:3, label: 'Angular'}]
    },
    rules: {
      required
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
      options: [{id:1, label: 'React'}, {id:2, label: 'Vuejs'}, {id:3, label: 'Angular'}]
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
      value: [{id:1, label: 'React', key: 1}, {id:2, label: 'Vuejs', key: 2}, {id:3, label: 'Angular', key: 3}]
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
        options: [{value: 'Python', color: 'warning'}, {value: 'Javascript', color: 'danger'}, 'React']
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
        color: 'success',
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
    },
  }

}

class SimpleExample extends Component {
  state = {
    form: {
      name: 'form',
    }
  }

  inputFormHandler = (forname, callbackControls) => {
    this.setState(state =>{
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
          <Button color='secondary' className='float-left' onClick={() => this.state.form.$reset()}>$reset</Button>
          <Button color='warning' className='float-left ml-2' onClick={() => this.state.form.$touch()}>$touch</Button>
          <Button color='primary' className='float-right' onClick={this.handlerSubmit}>Submit</Button>
        </div>
      </ReactFormTotal>
    );
  }
}

export default SimpleExample;
