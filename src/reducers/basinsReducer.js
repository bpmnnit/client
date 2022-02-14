import _ from 'lodash';
import {
  CREATE_BASIN,
  FETCH_BASIN,
  FETCH_BASINS,
  EDIT_BASIN
} from '../actions/types';

const basinsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BASINS:
      return { 
        ...state,
        page: action.payload.page,
        size: action.payload.size,
        total: action.payload.total,
        ..._.mapKeys(action.payload.basins, '_id')
      };
    case CREATE_BASIN:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_BASIN:
        return { ...state, [action.payload._id]: action.payload };
    case EDIT_BASIN:
      return { ...state, [action.payload._id]: action.payload };    
    default: 
      return state;
  }
};

export default basinsReducer;