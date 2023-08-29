import React from 'react';
import { connect, useDispatch } from 'react-redux';
import * as actionCreators from '../state/action-creators';
import { useSelector } from 'react-redux';

export function Wheel(props) {
  const dispatch = useDispatch()
  const handleUpClick = () => {
    dispatch({ type: 'MOVE_CLOCKWISE' })
  }
  const handleDownClick = () => {
    dispatch({ type: 'MOVE_COUNTERCLOCKWISE' })
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}></div>
        <div className="cog" style={{ "--i": 2 }}></div>
        <div className="cog" style={{ "--i": 3 }}></div>
        <div className="cog" style={{ "--i": 4 }}></div>
        <div className="cog" style={{ "--i": 5 }}></div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleDownClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleUpClick}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actionCreators)(Wheel);
