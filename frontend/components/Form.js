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

    // Dispatch an action to post the new quiz data to the server
    props.postQuiz(formData);

    // Clear the form fields after submission
    setFormData({
      newQuestion: '',
      newTrueAnswer: '',
      newFalseAnswer: '',
    });
  };

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
      <button id="submitNewQuizBtn" type="submit">
        Submit new quiz
      </button>
    </form>
  );
}

const mapDispatchToProps = {
  postQuiz,
};

export default connect(null, mapDispatchToProps)(Form);

