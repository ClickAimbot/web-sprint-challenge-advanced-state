import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators';
import Message from './Message';

function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer, infoMessage, fetchQuiz, postAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerClick = (answerId) => {
    selectAnswer(answerId);
  };

  const handleSubmitAnswer = (e, quizId, answerId) => {
    e.preventDefault();
    postAnswer(quizId, answerId);
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
            {quiz.answers.map((answerId) => (
              <div
                key={answerId.answer_id}
                className={`answer ${selectedAnswer === answerId ? 'selected' : ''}`}
                onClick={() => handleAnswerClick(answerId)} 
              >
                {answerId.text}
                <button>
                  {selectedAnswer === answerId ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <button id="submitAnswerBtn" onClick={(e) => {handleSubmitAnswer(e, quiz.quiz_id, selectedAnswer.answer_id)}} disabled={selectedAnswer === null}>
            Submit answer
          </button>
        </>
      ) : (
        'Loading next quiz...'
      )}
      <Message message={infoMessage} /> 
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
  postAnswer: (quizId, answerId) => dispatch(postAnswer(quizId, answerId)),
  selectAnswer: (answerId) => dispatch(selectAnswer(answerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
