import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/styles/hljs'

import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/general.css'
import './assets/css/react-form-total.css'
import './assets/css/checkbox_radio.css'
import './assets/css/bootstrap_switch.css'
import './assets/css/react-datetime.css'

import Fullpage from './views/container/FullPage'
// import TestForm from './components/Test'
// import moment from 'moment'

export default class App extends Component {
  state = {
    width: null,
    height: null,
    modal: {
      show: false,
      title: '',
      content: ''
    }
  }

  toggle = (content = null, isShow = false) => {
    console.log('content')
    console.log(content)
    console.log(isShow)
    console.log(typeof content)
    const _content = isShow ? content : ''

    this.setState(state => {
      return {
        modal: {
          ...state.modal,
          show: !state.modal.show,
          content: _content
        }
      }
    })
  }

  render () {
    const closeBtn = <button className='close'>&times;</button>
    const codeString = JSON.stringify(this.state.modal.content, null, 3)
    return (
      <React.Fragment>
        <Fullpage toggleModal={this.toggle} />
        <Modal isOpen={this.state.modal.show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Form: Input values</ModalHeader>
          <ModalBody>
            <SyntaxHighlighter className='react-code' style={tomorrow}>{codeString}</SyntaxHighlighter>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}
