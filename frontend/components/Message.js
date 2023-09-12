import React from 'react'
import { connect } from 'react-redux'

export function Message(props) {
  const { message } = props;
  return <div id="message">{message}</div>
}

export default connect((state) => ({ message: state.infoMessage }))(Message)
