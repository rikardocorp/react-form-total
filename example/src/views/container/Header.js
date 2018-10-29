import React, {Component} from 'react'
import {Navbar, Container, Row, Col, NavbarToggler, UncontrolledCollapse, Nav, NavItem, NavLink} from 'reactstrap'
import GitHubButton from 'react-github-button'
import 'react-github-button/assets/style.css'

class Header extends Component {
  saveRef = (ref) => this.containerNode = ref
  componentDidMount () {
    const {clientWidth = 0, clientHeight = 0} = this.containerNode
    this.props.measure(clientWidth, clientHeight)
  }
  render() {
    return (
      <header ref={this.saveRef}>
        <Navbar dark expand='md'>
          <NavbarToggler id='toggler' />
          <UncontrolledCollapse toggler='#toggler' navbar>
            <Nav className='m-auto' navbar>
              <NavItem>
                <NavLink href='/components/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/components/'>Props</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/components/'>Inputs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/components/'>FormGroup</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/components/'>Advanced</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://www.npmjs.com/package/react-form-total'>NPM</NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Navbar>
        <Container className='mt-5 banner'>
          <Row className='d-flex justify-content-center'>
            <Col sm={12} md={11}>
              <h1 className='font-weight-bold'>React Form Total <span>v2</span></h1>
              <p className='lead w-75'>This is a component to build a complete form, with validations and different types of inputs, using objects in JSON format.</p>
              <GitHubButton type='stargazers' size='large' namespace='rikardocorp' repo='react-form-total' />
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}

export default Header
