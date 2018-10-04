import React from 'react'
import {required, email, maxValue} from './assets/validity/validators/index'

export const test = {
  name: 'test',
  url: '',
  post: {
    input1: null,
    input2: 'Valor iniciado Input2',
    input3: null,
    input4: null,
    input5: null,
    input6: null,
    input7: null,
    input8: null,
    input9: null,
    input10: null,
    input11: null,
    input12: null,
    input13: null,
    input14: null
  },
  inputs: {
    input1: {
      formGroup: {
        row: false,
        labelSize: {sm: 4, md: 6},
        inputSize: {sm: 4, md: 6}
      },
      label: {
        labelText: 'Input1',
        className: ''
      },
      input: {
        type: 'text',
        // disabled: true,
        placeholder: 'Test Input1',
        _prepend: '@',
        _append: '@'
      },
      rules: {
        required
      }
    },
    input2: {
      formGroup: {
        row: false,
        labelSize: {sm: 4, md: 6},
        inputSize: {sm: 4, md: 6}
      },
      label: {
        labelText: 'Input2',
        className: ''
      },
      input: {
        type: 'number',
        // disabled: true,
        placeholder: 'Test Input2',
        value: 5,
        _prepend: '@'
        // _append: '@'
      },
      rules: {
        required,
        maxValue: maxValue(12)
      }
    },
    __group_1: {
      input3: {
        formGroup: {
          row: false,
          labelSize: {sm: 4, md: 6},
          inputSize: {sm: 8, md: 6}
        },
        label: {
          labelText: 'User'
        },
        input: {
          type: 'text',
          placeholder: 'Username'
        },
        rules: {
          required
        }
      },
      input4: {
        formGroup: {
          row: false,
          labelSize: {sm: 4, md: 6},
          inputSize: {sm: 4, md: 6}
        },
        label: {
          labelText: 'Email'
        },
        input: {
          type: 'email',
          placeholder: 'Email'
        },
        rules: {
          required,
          email
        }
      }
    },
    input5: {
      formGroup: {
        row: false,
        labelSize: {sm: 4, md: 6},
        inputSize: {sm: 8, md: 6}
      },
      label: {
        labelText: 'Input MultiSelect'
      },
      input: {
        type: 'multiSelect',
        placeholder: 'Input MultiSelect',
        // isMulti: true,
        isDisabled: false,
        optionValue: 'id',
        optionLabel: 'label1',
        menuIsOpen: undefined,
        // optionDisabled: (option) => option.user !== 'inge',
        options: [
          { id: 1, value1: 'chocolate', label1: 'Chocolate', user: 'inge' },
          { id: 2, value1: 'strawberry', label1: 'Strawberry', user: 'inge2' },
          { id: 3, value1: 'vanilla', label1: 'Vanilla', user: 'inge3' }
        ],
        // value: { value1: 'chocolate', label1: 'Chocolate', user: 'inge' }
      },
      rules: {
        required
      }
    },
    input6: {
      formGroup: {
        row: false,
        labelSize: {sm: 4, md: 6},
        inputSize: {sm: 8, md: 6}
      },
      label: {
        labelText: 'Multi Select Add'
      },
      input: {
        _prepend: <span className='input-group-text'><i className='fa fa-rocket text-secondary' /></span>,
        type: 'multiSelectAdd',
        placeholder: 'multi Select Add',
        isMulti: true,
        isDisabled: false,
        optionValue: 'value1',
        optionLabel: 'label1',
        addOption: false,
        menuIsOpen: undefined,
        menuStatic: false,
        // optionDisabled: (option) => (option.user !== 'inge' && option.user !== undefined),
        options: [
          { value1: 'chocolate', label1: 'Chocolate', user: 'inge' },
          { value1: 'strawberry', label1: 'Strawberry', user: 'inge2' },
          { value1: 'vanilla', label1: 'Vanilla', user: 'inge3' }
        ],
        value: [{ value1: 'strawberry', label1: 'Strawberry' }, { value1: 'chocolate', label1: 'Chocolate' }, { value1: 'rick', label1: 'Rick' }]
      },
      rules: {
        required
      }
    },
    input7: {
      label: {
        labelText: 'Multi Select Tag'
      },
      input: {
        type: 'multiSelectTag',
        optionValue: 'value1',
        optionLabel: 'label1',
        // placeholder: "Company",
        isDisabled: false,
        _prepend: '@',
        value: ['rikardocorp', 'rcorp']
      },
      rules: {
        required
      }
    },
    input8: {
      label: {
        labelText: 'DateTime'
      },
      input: {
        type: 'datetime',
        _prepend: <span className='input-group-text'><i className='fa fa-calendar text-secondary' /></span>,
        _append: <span className='input-group-text'><i className='fa fa-calendar-check-o text-secondary' /></span>,
        inputProps: {placeholder: 'Today'},
        returnFormat: 'DD-MM-YYYY HH:mm:ss',
        utc: false,
        validDateRange: {min: 0, max: null},
        // timeConstraints: {
        //   hours: {min: 5, max: 13, step: 2},
        //   minutes: {min: 10, max: 25, step: 8}
        // },
        // value: moment()
        value: '19-09-2018 09:12:19'
        // isValidDate: (currentDate, selectedDate) => { return false}
        // dateFormat: 'DD/MM/YYY',
        // timeFormat: false,
        // className: 'text-center',
        // input: false,
        // open:true,
        // menuStatic: true,
      },
      rules: {
        required
      }
    },
    input9: {
      label: {
        labelText: 'Radio'
      },
      input: {
        type: 'radio',
        className: 'pl-5',
        // style: {'margin-left': '150px'},
        // disabled: true,
        // position: 'right',
        // color: 'success',
        options: [{value: 'Python', color: 'warning'}, {value: 'Javascript', color: 'danger'}, 'React']
        // value: 'Sistema'
      },
      rules: {
        required
      }
    },
    input10: {
      label: {
        labelText: 'Checkbox'
      },
      input: {
        type: 'checkbox',
        label: 'Select 1',
        position: 'left',
        color: 'success',
        className: 'ml-4'
      }
    },
    input11: {
      input: {
        type: 'checkbox',
        label: 'Select 2',
        position: 'left',
        color: 'warning',
        className: 'ml-4'
      }
    },
    input12: {
      input: {
        type: 'checkbox',
        label: 'Select 3',
        position: 'left',
        color: 'info',
        className: 'ml-4'
      }
    },
    __group_2: {
      input13: {
        label: {
          labelText: 'Switch1'
        },
        input: {
          type: 'switch',
          position: 'center',
          // disabled: true,
          onColor: 'primary',
          onText: 'Yes',
          offText: 'NO',
          bsSize: 'small',
          value: 1
        }
      },
      input14: {
        label: {
          labelText: 'Switch2'
        },
        input: {
          type: 'switch',
          position: 'center',
          // disabled: true,
          onColor: 'danger',
          onText: 'ON',
          offText: 'OFF',
          bsSize: 'small',
          value: true
        }
      }
    }
  }
}
