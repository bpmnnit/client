import gs from '../apis/gs';
import history from '../history';
import { 
  CREATE_SURVEY,
  FETCH_SURVEYS,
  FETCH_SURVEY,
  EDIT_SURVEY,
  DELETE_SURVEY,
} from "./types";

export const createSurvey = formValues => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await gs.post('/surveys/new', { ...formValues, userId });

  dispatch({ type: CREATE_SURVEY, payload: response.data });
  history.push('/surveys');
};

export const fetchSurveys = (page, size) => async dispatch => {
  const response = await gs.get('/surveys', { params: { page, size } });
  dispatch({ type: FETCH_SURVEYS, payload: response.data });
};

export const fetchSurvey = (id) => async dispatch => {
  const response = await gs.get(`/surveys/${id}`);
  dispatch({ type: FETCH_SURVEY, payload: response.data });
};

export const editSurvey = (id, formValues) => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await gs.patch(`/surveys/edit/${id}`, { ...formValues, userId });
  dispatch({ type: EDIT_SURVEY, payload: response.data });
  history.push('/surveys');
};

export const deleteSurvey = (id) => async dispatch => {
  await gs.delete(`/surveys/delete/${id}`);
  dispatch({ type: DELETE_SURVEY, payload: id });
  history.push('/surveys');
};