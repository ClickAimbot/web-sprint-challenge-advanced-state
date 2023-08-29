import React from 'react'
import { connect, useSelector } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

export function Quiz(props) {
  const { selectedAnswer } = props;
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2></h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {selectedAnswer}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps, {selectedAnswer, })(Quiz)
