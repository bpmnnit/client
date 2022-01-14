import gs from '../apis/gs';
import history from '../history';
import { 
  CREATE_REGION,
  FETCH_REGIONS,
  FETCH_REGION,
  EDIT_REGION,
  DELETE_REGION
} from "./types";

export const createRegion = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const timeStamp = new Date();
  const response = await gs.post('/regions/new', { ...formValues, userId, timeStamp });

  dispatch({ type: CREATE_REGION, payload: response.data });
  history.push('/regions');
};

export const fetchRegions = (page, size) => async dispatch => {
  const response = await gs.get('/regions', { params: { page, size } });
  dispatch({ type: FETCH_REGIONS, payload: response.data });
};

export const fetchRegion = (id) => async dispatch => {
  const response = await gs.get(`/regions/${id}`);
  dispatch({ type: FETCH_REGION, payload: response.data });
};

export const editRegion = (id, formValues) => async dispatch => {
  console.log(id);
  console.log(formValues);
  const response = await gs.patch(`/regions/edit/${id}`, formValues);
  dispatch({ type: EDIT_REGION, payload: response.data });
  history.push('/regions');
};

export const deleteRegion = (id) => async dispatch => {
  await gs.delete(`/regions/delete/${id}`);

  dispatch({ type: DELETE_REGION, payload: id });
  history.push('/regions');
};