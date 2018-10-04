import React from 'react'
import {FormFeedback} from 'reactstrap'
import PropTypes from 'prop-types'

const RkValidate = (props) => {
  let feedBack = null
  if (!props.tooltip || props.show) {
    feedBack = <FormFeedback valid={false} tooltip={props.tooltip}>{props.message}</FormFeedback>
  }

  return (
    <React.Fragment>
      { props.children }
      { feedBack }
    </React.Fragment>
  )
}

RkValidate.propTypes = {
  children: PropTypes.element,
  tooltip: PropTypes.bool,
  show: PropTypes.bool,
  message: PropTypes.string
}

export default RkValidate
