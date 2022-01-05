import _ from 'lodash';
import {
  CREATE_REGION,
  FETCH_REGION,
  FETCH_REGIONS,
  EDIT_REGION
} from '../actions/types';

const regionsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REGIONS:
      return { 
        // ...state,
        page: action.payload.page,
        size: action.payload.size,
        totalRegions: action.payload.totalRegions,
        ..._.mapKeys(action.payload.regions, '_id')
      };
    case CREATE_REGION:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_REGION:
        return { ...state, [action.payload._id]: action.payload };
    case EDIT_REGION:
      return { ...state, [action.payload._id]: action.payload };    
    default: 
      return state;
  }
};

export default regionsReducer;