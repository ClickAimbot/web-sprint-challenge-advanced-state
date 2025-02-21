import React from 'react';
import { connect } from 'react-redux';
import { inputChange, postQuiz, resetForm } from '../state/action-creators';
import Message from './Message';

export function Form(props) {
  const { postQuiz, infoMessage, form, inputChange } = props;
  const { newQuestion, newTrueAnswer, newFalseAnswer } = form;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    inputChange(id, value);
  };

  const onSubmit = (evt, newQuestion, newTrueAnswer, newFalseAnswer) => {
    evt.preventDefault();
    postQuiz(newQuestion, newTrueAnswer, newFalseAnswer)
    resetForm();
  } 

  const isSubmitDisabled = !(newQuestion.trim().length > 0 && newTrueAnswer.trim().length > 0 && newFalseAnswer.trim().length > 0);

  return (
    <div>
      <form id="form" onSubmit={(evt) => {onSubmit(evt, form.newQuestion, form.newTrueAnswer, form.newFalseAnswer)}}>
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
    </div>
  );
}
const mapStateToProps = (state) => ({
  infoMessage: state.infoMessage,
  form: state.form,
});

const mapDispatchToProps = (dispatch) => ({
  postQuiz: (newQuestion, newTrueAnswer, newFalseAnswer) => dispatch(postQuiz(newQuestion, newTrueAnswer, newFalseAnswer)),
  inputChange: (id, value) => dispatch(inputChange(id, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);

