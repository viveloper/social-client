import {
  OPEN_POST_SCREAM,
  CLOSE_POST_SCREAM,
  SET_POST_SCREAM_BODY
} from '../types';

const initialState = {
  isPostScreamOpened: false,
  body: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_POST_SCREAM:
      return {
        body: '',
        isPostScreamOpened: true
      };
    case CLOSE_POST_SCREAM:
      return {
        body: '',
        isPostScreamOpened: false
      };
    case SET_POST_SCREAM_BODY:
      return {
        ...state,
        body: action.payload
      };
    default:
      return state;
  }
}
