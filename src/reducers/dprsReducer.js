import _ from 'lodash';
import {
  CREATE_DPR,
  FETCH_DPR,
  FETCH_DPRS,
  EDIT_DPR,
} from '../actions/types';

const dprsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DPRS:
      return { 
        // ...state,
        page: action.payload.page,
        size: action.payload.size,
        total: action.payload.total,
        ..._.mapKeys(action.payload.dprs, '_id'),
      };
    case CREATE_DPR:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_DPR:
        return { ...state, [action.payload._id]: action.payload };
    case EDIT_DPR:
      return { ...state, [action.payload._id]: action.payload };
    default: 
      return state;
  }
};

export default dprsReducer;