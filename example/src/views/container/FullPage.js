import React, {Component} from 'react'
import { Link, Element } from 'react-scroll'
import { StickyContainer, Sticky } from 'react-sticky'
import { Nav, NavItem, Container, Row, Col } from 'reactstrap'
import {gettingStarted} from '../codeText'
// import Highlight from 'react-highlight'
import '../../../node_modules/highlight.js/styles/atom-one-light.css'
import Header from './Header'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/styles/hljs'

import SimpleExample from '../../views/examples/simpleExample'
import SimpleExampleControlled from '../../views/examples/simpleExampleControlled'
import CompleteExample from '../../views/examples/completeExample'

const styleCode = tomorrow
class FullPage extends Component {
  state = {
    width: null,
    height: null,
    modal: {
      show: '',
      title: '',
      content: ''
    }
  };

  measure = (clientWidth, clientHeight) => {
    this.setState({
      width: clientWidth,
      height: clientHeight
    })
  };

  toggleModal = (data) => {
    console.log('toggleModal')
    console.log(data)
    this.props.toggleModal(data, true)
  }

  render() {
    const {height} = this.state
    return (
      <StickyContainer>
        <Header measure={this.measure} />

        <Container className='mt-5'>
          <Row className='d-flex justify-content-center'>
            <Col sm={4} md={3} lg={3} className='content-menu'>
              <Sticky topOffset={height + 15}>
                {({ style, isSticky, wasSticky, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                  if (isSticky) style = {...style, marginTop: '30px'}
                  return (
                    <div style={style} className='sidebar'>
                      <Nav vertical>
                        <NavItem>
                          <Link activeClass='active' className='test1' to='test0' offset={-50} spy={true} smooth={true} duration={500} >Welcome</Link>
                        </NavItem>
                        <NavItem>
                          <Link activeClass='active' className='test1' to='test1' offset={-50} spy={true} smooth={true} duration={500} >Requirements</Link>
                        </NavItem>
                        <NavItem>
                          <Link activeClass='active' className='test2' to='test2' offset={-50} spy={true} smooth={true} duration={500} >Getting Started</Link>
                        </NavItem>
                        <NavItem>
                          <Link activeClass='active' className='test3' to='test3' offset={-50} spy={true} smooth={true} duration={500} >Simple Example</Link>
                        </NavItem>
                        <NavItem>
                          <Link activeClass='active' className='test4' to='test4' offset={-50} spy={true} smooth={true} duration={500} >Example Controlled</Link>
                        </NavItem>
                        <NavItem>
                          <Link activeClass='active' className='test4' to='test5' offset={-50} spy={true} smooth={true} duration={500} >Complete Example</Link>
                        </NavItem>
                      </Nav>
                    </div>
                  )
                }}
              </Sticky>
            </Col>
            <Col sm={8} md={8} lg={8} className='content-element'>
              <Element name='test0'>
                <section>
                  <h2>Welcome</h2>
                  <p className='lead'>Each of the examples below is and interactive example of react-form-total based in reacstrap.
                    This form generator contains validations and fantastic components of other authors such as:</p>
                  <ul>
                    <li><a target='_blank' href='https://github.com/YouCanBookMe/react-datetime'>react-datetime</a>: ^2.15.0</li>
                    <li><a target='_blank' href='https://github.com/JedWatson/react-select'>react-select</a>: ^2.1.0</li>
                    <li><a target='_blank' href='https://github.com/Julusian/react-bootstrap-switch'>react-bootstrap-switch</a>: ^15.5.3</li>
                    <li><a target='_blank' href='https://github.com/chenglou/react-radio-group'>react-radio-group</a>: ^3.0.3</li>
                  </ul>
                  <p className='lead'>
                    This ones integrated in a single component, to facilitate the construction of forms and optimize the rendering of views.
                  </p>
                  <p>To contribute, or open an issue, check out the source code on <a target='_blank' href='https://github.com/rikardocorp/react-form-total'>Github</a></p>
                </section>
              </Element>

              <Element name='test1'>
                <section>
                  <h2>Requirements</h2>
                  <p className='lead'>You need install the next packages:</p>
                  <SyntaxHighlighter className='react-code' style={styleCode}>
{`$ npm install reactstrap --save\t
$ npm install bootstrap --save\t
$ npm install react-select --save\t
$ npm install react-datetime --save\t
$ npm install react-radio-group --save\t
$ npm install react-bootstrap-switch --save\t`}
                  </SyntaxHighlighter>
                </section>
              </Element>

              <Element name='test2'>
                <section>
                  <h2>Getting Started</h2>
                  <p>Package is instalable via npm</p>
                  <SyntaxHighlighter className='react-code' style={styleCode}>
                    {`$ npm install react-form-total --save`}
                  </SyntaxHighlighter>
                  <br />
                  <p className='lead'>
                    We recommend you import the following styles.
                  </p>
                  <SyntaxHighlighter className='react-code' style={styleCode}>
{`import 'bootstrap/dist/css/bootstrap.min.css'\t
import 'font-awesome-4.7.0/css/font-awesome.min.css'\t
import 'react-form-total/dist/assets/css/react-form-total.css'\t
import 'react-form-total/dist/assets/css/checkbox_radio.css'\t
import 'react-form-total/dist/assets/css/bootstrap_switch.css'\t
import 'react-datetime/css/react-datetime.css'\t`}
                  </SyntaxHighlighter>
                  <p className='lead'>Import the default export and render in your component:</p>
                  <SyntaxHighlighter className='react-code' style={styleCode}>{gettingStarted}</SyntaxHighlighter>
                </section>
              </Element>
              <Element name='test3'>
                <SimpleExample styleCode={styleCode} />
              </Element>
              <Element name='test4'>
                <SimpleExampleControlled toggleModal={this.toggleModal} styleCode={styleCode} />
              </Element>
              <Element name='test5'>
                <CompleteExample toggleModal={this.toggleModal} styleCode={styleCode} />
              </Element>
            </Col>
          </Row>
        </Container>
      </StickyContainer>
    )
  }
}

export default FullPage
