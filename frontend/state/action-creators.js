// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  INPUT_CHANGE,
  RESET_FORM,
} from './action-types';

export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE,
  }
}
export function moveCounterClockwise(){ 
  return {
    type: MOVE_COUNTERCLOCKWISE,
  }
}
export function selectAnswer(answerId) { 
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerId,
  }
}
export function setMessage(message) { 
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  }
}
export function setQuiz(quizData) { 
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quizData,
  }
}
  
export function inputChange(name, value) { 
  return {
    type: INPUT_CHANGE,
    payload: { name, value },
  }
}
export function resetForm() { 
  return {
    type: RESET_FORM,
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(resetForm());
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data));
      })
      .catch(err => {
        dispatch(setMessage(err));
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quizId, answerId) {
  // console.log(quizId, answerId)
  return function (dispatch) {
    dispatch(resetForm());
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId })
      .then(res => {
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz(res.data));
      })
      .catch(err => {
        // console.log(err)
        dispatch(setMessage(err.message));
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quizData) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', quizData)
      .then(res => {
        dispatch(setMessage(res.data.message));
        dispatch(resetForm());
      })
      .catch(err => {
        dispatch(setMessage(err.message));
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
