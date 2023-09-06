import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quiz, selectedAnswer, infoMessage, fetchQuiz, postAnswer } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerClick = (answerId, idx) => {
    // Toggle the selected answer based on its current state
    const newSelectedAnswer = selectedAnswer === idx ? null : idx;
    postAnswer(answerId, newSelectedAnswer);
  
    // Remove the "selected" class from all answers
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((element) => {
      element.classList.remove('selected');
    });
  
    // Add the "selected" class to the clicked answer
    const clickedAnswer = answerElements[idx];
    clickedAnswer.classList.add('selected');
    
    // Update the label of the button for all answers
    answerElements.forEach((element, index) => {
      const button = element.querySelector('button');
      if (newSelectedAnswer === index) {
        button.textContent = 'SELECTED';
      } else {
        button.textContent = 'Select';
      }
    });
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
              <div
                key={answer.id}
                className={`answer ${selectedAnswer === idx ? 'selected' : ''}`}
                onClick={() => handleAnswerClick(answer.id, idx)} 
              >
                {answer.text}
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
  postAnswer: (answerId, selectedAnswer) => dispatch(postAnswer(answerId, selectedAnswer)), // Pass selectedAnswer
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

