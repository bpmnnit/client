import gs from '../apis/gs';
import history from '../history';
import { 
  CREATE_DPR,
  FETCH_DPRS,
  FETCH_DPR,
  EDIT_DPR,
  DELETE_DPR,
} from "./types";

export const createDpr = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await gs.post('/dprs/new', { ...formValues, userId });

  dispatch({ type: CREATE_DPR, payload: response.data });
  history.push('/dprs');
};

export const fetchDprs = (page, size) => async dispatch => {
  const response = await gs.get('/dprs', { params: { page, size } });
  dispatch({ type: FETCH_DPRS, payload: response.data });
};

export const fetchDpr = (id) => async dispatch => {
  const response = await gs.get(`/dprs/${id}`);
  dispatch({ type: FETCH_DPR, payload: response.data });
};

export const editDpr = (id, formValues) => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await gs.patch(`/dprs/edit/${id}`, { ...formValues, userId });
  dispatch({ type: EDIT_DPR, payload: response.data });
  history.push('/dprs');
};

export const deleteDpr = (id) => async dispatch => {
  await gs.delete(`/dprs/delete/${id}`);
  dispatch({ type: DELETE_DPR, payload: id });
  history.push('/dprs');
};