import gs from '../apis/gs';
import history from '../history';
import { 
  CREATE_PEOPLE,
  FETCH_PEOPLES,
  FETCH_PEOPLE,
  EDIT_PEOPLE,
  DELETE_PEOPLE
} from "./types";

export const createPeople = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const timeStamp = new Date();
  const response = await gs.post('/peoples/new', { ...formValues, userId, timeStamp });

  dispatch({ type: CREATE_PEOPLE, payload: response.data });
  history.push('/peoples');
};

export const fetchPeoples = (page, size) => async dispatch => {
  const response = await gs.get('/peoples', { params: { page, size } });
  dispatch({ type: FETCH_PEOPLES, payload: response.data });
};

export const fetchPeople = (id) => async dispatch => {
  const response = await gs.get(`/peoples/${id}`);
  dispatch({ type: FETCH_PEOPLE, payload: response.data });
};

export const editPeople = (id, formValues) => async dispatch => {
  console.log(id);
  console.log(formValues);
  const response = await gs.patch(`/peoples/edit/${id}`, formValues);
  dispatch({ type: EDIT_PEOPLE, payload: response.data });
  history.push('/peoples');
};

export const deletePeople = (id) => async dispatch => {
  await gs.delete(`/peoples/delete/${id}`);

  dispatch({ type: DELETE_PEOPLE, payload: id });
  history.push('/peoples');
};