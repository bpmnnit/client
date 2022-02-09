import gs from '../apis/gs';
import history from '../history';
import { 
  CREATE_BASIN,
  FETCH_BASINS,
  FETCH_BASIN,
  EDIT_BASIN,
  DELETE_BASIN
} from "./types";

export const createBasin = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await gs.post('/basins/new', { ...formValues, userId });

  dispatch({ type: CREATE_BASIN, payload: response.data });
  history.push('/basins');
};

export const fetchBasins = (page, size) => async dispatch => {
  const response = await gs.get('/basins', { params: { page, size } });
  dispatch({ type: FETCH_BASINS, payload: response.data });
};

export const fetchBasin = (id) => async dispatch => {
  const response = await gs.get(`/basins/${id}`);
  dispatch({ type: FETCH_BASIN, payload: response.data });
};

export const editBasin = (id, formValues) => async dispatch => {
  const response = await gs.patch(`/basins/edit/${id}`, formValues);
  dispatch({ type: EDIT_BASIN, payload: response.data });
  history.push('/basins');
};

export const deleteBasin = (id) => async dispatch => {
  await gs.delete(`/basins/delete/${id}`);

  dispatch({ type: DELETE_BASIN, payload: id });
  history.push('/basins');
};