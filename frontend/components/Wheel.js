import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'; // Import your action creators

function Wheel(props) {
  const { moveClockwise, moveCounterClockwise, wheelState } = props;

  const handleUpClick = () => {
    moveClockwise(); // Dispatch the MOVE_CLOCKWISE action
  };

  const handleDownClick = () => {
    moveCounterClockwise(); // Dispatch the MOVE_COUNTERCLOCKWISE action
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`cog ${index === wheelState ? 'active' : ''}`}
            style={{ "--i": index }}
          >
            {index === wheelState ? 'B' : ''}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleDownClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleUpClick}>Clockwise</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  wheelState: state.wheel, // Map the wheel state to props
});

const mapDispatchToProps = {
  moveClockwise, // Map the moveClockwise action creator to props
  moveCounterClockwise, // Map the moveCounterClockwise action creator to props
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
