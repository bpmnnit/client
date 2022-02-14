import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import regionsReducer from './regionsReducer';
import peoplesReducer from './peoplesReducer';
import streamsReducer from './streamsReducer';
import messageReducer from './messageReducer';
import basinsReducer from './basinsReducer';
import fpsReducer from './fpsReducer';

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  form: formReducer,
  streams: streamsReducer,
  regions: regionsReducer,
  peoples: peoplesReducer,
  basins: basinsReducer,
  fps: fpsReducer
});