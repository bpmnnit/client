import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  const { type, payload } = action;

  switch(type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: '' };

    default:
      return state;
  }
}