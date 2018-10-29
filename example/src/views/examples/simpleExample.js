import React, {Component} from 'react'
import ReactFormTotal from 'react-form-total'
import {UncontrolledCollapse, Button} from 'reactstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'

const inputs = {
  input1: {
    label: {
      labelText: 'Text Input'
    },
    input: {
      type: 'text',
      placeholder: 'Props Placeholder'
    }
  },
  __group_1: {
    check1: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Prepend',
        color: 'secondary'
      }
    },
    check2: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Append',
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
  },
  input2: {
    label: {
      labelText: 'Number Input'
    },
    input: {
      type: 'number',
      placeholder: 'This is a Number'
    }
  },
  __group_2: {
    check2_1: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Change Label name',
        color: 'secondary'
      }
    },
    check2_2: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Activate lineal row',
        color: 'success'
      }
    },
    check2_3: {
      input: {
        type: 'checkbox',
        style: {fontSize: '0.7em'},
        label: 'Reset All',
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
      placeholder: 'Props Placeholder'
    }
  },
  input2: {
    label: {
      labelText: 'Number Input'
    },
    input: {
      type: 'number',
      placeholder: 'This is a Number'
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

  inputChangedHandler = (formName, name, value) => {
    if (name === 'check1') {
      this.state.form.$changeProps('input1', {_prepend: value ? <span className='input-group-text'><i className='fa fa-user' /></span> : null})
    }
    if (name === 'check2') {
      this.state.form.$changeProps('input1', {_append: value ? 'End' : null})
    }
    if (name === 'check3') {
      const oldPlaceholder = inputs.input1.input.placeholder
      this.state.form.$changeProps('input1', {placeholder: value ? 'Setting new placeholder... ' : oldPlaceholder})
    }

    if (name === 'check2_1') {
      const oldLabelText = inputs.input2.label.labelText
      if (value) {
        this.state.form.$change('check2_3', false)
      }
      this.state.form.$changeExtraProps('input2', {label: {labelText: value ? 'New Label Number' : oldLabelText}})
    }

    if (name === 'check2_2') {
      console.log(name, value)
      if (value) {
        this.state.form.$change('check2_3', false)
      }
      this.state.form.$changeExtraProps('input2', {formGroup: {row: value}})
    }

    if (name === 'check2_3') {
      console.log(name, value)
      if (value) {
        this.state.form.$change('check2_1', false)
        this.state.form.$change('check2_2', false)
      }
      // this.state.form.$changeExtraProps('input2', value ? null : {})
    }
  }

  render() {
    const codeString = code
    return (
      <section>
        <h2 className='clearfix'>Simple Form Example <Button id='toggler' size='sm' className='float-right' color='link'>Show Code</Button></h2>
        <UncontrolledCollapse toggler='#toggler'>
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
          className='w-75 m-auto'
          inputChanged={this.inputChangedHandler}
          inputFormHandler={this.inputFormHandler}>
          <div className='pt-2'><p className='text-muted text-center'>Here you can put any button...</p></div>
        </ReactFormTotal>
      </section>
    )
  }
}

export default SimpleExample
