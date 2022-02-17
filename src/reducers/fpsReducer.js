import _ from 'lodash';
import {
  CREATE_FP,
  FETCH_FP,
  FETCH_FPS,
  EDIT_FP,
} from '../actions/types';

const fpsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FPS:
      return { 
        ...state,
        page: action.payload.page,
        size: action.payload.size,
        total: action.payload.total,
        ..._.mapKeys(action.payload.fps, '_id')
      };
    case CREATE_FP:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_FP:
        return { ...state, [action.payload._id]: action.payload };
    case EDIT_FP:
      return { ...state, [action.payload._id]: action.payload };
    default: 
      return state;
  }
};

export default fpsReducer;