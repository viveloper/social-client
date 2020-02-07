import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const newScreams = state.screams.map(scream =>
        scream.screamId === action.payload.screamId ? action.payload : scream
      );
      const newScream = action.payload;
      return {
        ...state,
        screams: newScreams,
        scream: newScream
      };
    case DELETE_SCREAM:
      const targetScreamId = action.payload;
      const deletedScreams = state.screams.filter(
        scream => scream.screamId !== targetScreamId
      );
      return {
        ...state,
        screams: deletedScreams
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
