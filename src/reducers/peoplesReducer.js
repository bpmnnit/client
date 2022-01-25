import _ from 'lodash';
import {
  CREATE_PEOPLE,
  FETCH_PEOPLE,
  FETCH_PEOPLES,
  EDIT_PEOPLE
} from '../actions/types';

const peoplesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PEOPLES:
      return { 
        // ...state,
        page: action.payload.page,
        size: action.payload.size,
        total: action.payload.total,
        ..._.mapKeys(action.payload.peoples, '_id')
      };
    case CREATE_PEOPLE:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_PEOPLE:
        return { ...state, [action.payload._id]: action.payload };
    case EDIT_PEOPLE:
      return { ...state, [action.payload._id]: action.payload };    
    default: 
      return state;
  }
};

export default peoplesReducer;