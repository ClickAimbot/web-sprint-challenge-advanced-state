import React from 'react'
import { connect } from 'react-redux';

export function Quiz(props) {

  return (
    <div id="wrapper">
      {
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An Elephant
                <button>
                  select
                </button>
              </div>
             </div> 
              
            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 
          'Loading next quiz...'
      }
    </div>
  );
}

export default connect()(Quiz)
