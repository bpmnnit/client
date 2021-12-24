import streams from '../apis/streams';
import gs from '../apis/gs';
import history from '../history';
import { 
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_REGION,
  FETCH_REGIONS
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const createRegion = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const timeStamp = new Date();
  const response = await gs.post('/regions/new', { ...formValues, userId, timeStamp });

  dispatch({ type: CREATE_REGION, payload: response.data });
  history.push('/regions');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchRegions = () => async dispatch => {
  const response = await gs.get('/regions');

  dispatch({ type: FETCH_REGIONS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};