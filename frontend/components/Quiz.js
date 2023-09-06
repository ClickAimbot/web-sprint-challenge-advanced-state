import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quiz, selectedAnswer, infoMessage, fetchQuiz, postAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerClick = (answerId) => {
    postAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    postAnswer(selectedAnswer);
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            {quiz.answers.map((answer, idx) => (
              <div key={answer.id} className={`answer ${selectedAnswer === idx ? 'selected' : ''}`}>
                {answer.text}
                <button onClick={() => handleAnswerClick(answer.id)}>
                  {selectedAnswer === idx ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <button id="submitAnswerBtn" onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}
      <div id="infoMessage">{infoMessage}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
  infoMessage: state.infoMessage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuiz: () => dispatch(fetchQuiz()),
  postAnswer: (answerId) => dispatch(postAnswer(answerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
