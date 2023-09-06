import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Wheel(props) {
  const { activeCogIndex, handleDownClick, handleUpClick } = props; // Get the activeCogIndex from props

  const renderCogs = () => {
    const cogs = Array.from({ length: 6 });

    // Rotate cogs based on activeCogIndex
    const rotatedCogs = [
      ...cogs.slice(activeCogIndex),
      ...cogs.slice(0, activeCogIndex),
    ];

    return rotatedCogs.map((_, index) => (
      <div
        key={index}
        className={`cog ${index === 0 ? 'active' : ''}`} // Make the first cog active
        style={{ '--i': index }}
      >
        {index === 0 ? 'B' : ''}
      </div>
    ));
  };

  return (
    <div id="wrapper">
      <div id="wheel">{renderCogs()}</div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleDownClick}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleUpClick}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCogIndex: state.wheel, // Get the activeCogIndex from the Redux state
});

const mapDispatchToProps = {
  handleUpClick: actionCreators.moveClockwise,
  handleDownClick: actionCreators.moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
