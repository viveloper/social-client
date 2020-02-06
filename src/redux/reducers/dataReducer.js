import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM
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
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const newScreams = state.screams.map(scream =>
        scream.screamId === action.payload.screamId ? action.payload : scream
      );
      return {
        ...state,
        screams: newScreams
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
    default:
      return state;
  }
}
