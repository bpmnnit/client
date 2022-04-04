import _ from 'lodash';
import {
  CREATE_SURVEY,
  FETCH_SURVEY,
  FETCH_SURVEYS,
  EDIT_SURVEY,
} from '../actions/types';

const surveysReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { 
        // ...state,
        page: action.payload.page,
        size: action.payload.size,
        total: action.payload.total,
        ..._.mapKeys(action.payload.surveys, '_id')
      };
    case CREATE_SURVEY:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_SURVEY:
        return { ...state, [action.payload._id]: action.payload };
    case EDIT_SURVEY:
      return { ...state, [action.payload._id]: action.payload };
    default: 
      return state;
  }
};

export default surveysReducer;