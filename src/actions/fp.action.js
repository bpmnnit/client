import gs from '../apis/gs';
import history from '../history';
import { 
  CREATE_FP,
  FETCH_FPS,
  FETCH_FP,
  EDIT_FP,
  DELETE_FP
} from "./types";

export const createFp = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await gs.post('/fps/new', { ...formValues, userId });

  dispatch({ type: CREATE_FP, payload: response.data });
  history.push('/fps');
};

export const fetchFps = (page, size) => async dispatch => {
  const response = await gs.get('/fps', { params: { page, size } });
  dispatch({ type: FETCH_FPS, payload: response.data });
};

export const fetchFp = (id) => async dispatch => {
  const response = await gs.get(`/fps/${id}`);
  dispatch({ type: FETCH_FP, payload: response.data });
};

export const editFp = (id, formValues) => async dispatch => {
  const response = await gs.patch(`/fps/edit/${id}`, formValues);
  dispatch({ type: EDIT_FP, payload: response.data });
  history.push('/fps');
};

export const deleteFp = (id) => async dispatch => {
  await gs.delete(`/fps/delete/${id}`);

  dispatch({ type: DELETE_FP, payload: id });
  history.push('/fps');
};