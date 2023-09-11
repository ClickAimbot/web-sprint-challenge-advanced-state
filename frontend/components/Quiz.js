import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';
import Message from './Message';

function Quiz(props) {
  const { quiz, selectedAnswer, infoMessage, fetchQuiz, postAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerClick = (answerId, idx) => {
    // Set selectedAnswer to the clicked answer's index (idx)
    props.postAnswer(quiz.quiz_id, answerId.answer_id, idx);
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
            {quiz.answers.map((answerId, idx) => (
              console.log(selectedAnswer,idx),
              <div
                key={answerId.answer_id}
                className={`answer ${selectedAnswer === idx ? 'selected' : ''}`}
                onClick={() => handleAnswerClick(answerId, idx)} 
              >
                {answerId.text}
                <button>
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
  postAnswer: (quizId, answerId, selectedAnswer) => dispatch(postAnswer(quizId, answerId, selectedAnswer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
