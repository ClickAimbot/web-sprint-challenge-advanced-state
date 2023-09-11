import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postQuiz } from '../state/action-creators';

export function Form(props) {
  const [formData, setFormData] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  });

  const { newQuestion, newTrueAnswer, newFalseAnswer } = formData;

  const onChange = (evt) => {
    // Update the form data when input values change
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // Clear the form fields after submission
      setFormData({
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      });
    } 

    const isSubmitDisabled = !(newQuestion.length > 1 && newTrueAnswer.length > 1 && newFalseAnswer.length > 1);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={newFalseAnswer}
      />
      <button id="submitNewQuizBtn" type="submit" disabled={isSubmitDisabled}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapDispatchToProps = {
  postQuiz,
};

export default connect(null, mapDispatchToProps)(Form);

