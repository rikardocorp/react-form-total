import React, {Component} from 'react';
import ReactFormTotal from 'react-form-total'


const inputs = {
    input1: {
        label: {
          labelText: 'Text Input'
        },
        input: {
            type: 'text'
        }
    },
    input2: {
        label: {
            labelText: 'Number Input'
        },
        input: {
            type: 'number'
        }
    }
}

class SimpleExample extends Component {
    render() {
        return (
            <ReactFormTotal name={'form'} inputs={inputs}>
                <div>Here you can put any button</div>
            </ReactFormTotal>
        );
    }
}

export default SimpleExample;
