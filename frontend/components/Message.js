import React from 'react'

export default function Message(props) {
  const { message } = props;
  return <div id="message">{message}</div>
}
