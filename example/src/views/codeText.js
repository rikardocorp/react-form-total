export const gettingStarted = `
import React, {Component} from "react"
import RkForm from "react-form-total"

const inputs = {
  input1: {
    label: {
      labelText: "Input1"
    },
    input: {
      type: "text",
      placeholder: "Test Input1"
    }
  }
}

class Test extends Component {
  render() {
    return (
      <RkForm inputs={inputs}>
        <div><p>Here you can place the buttons</p></div>
      </RkForm>
    )
  }
}

export default Test
`.trim()
