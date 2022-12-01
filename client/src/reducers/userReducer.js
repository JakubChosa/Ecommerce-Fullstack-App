import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "../context/actions";
import { initialState } from "../context/userContext";

const reducer = (state, action) => {
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  throw new Error(`no such action ${action.type}`);
};
export default reducer;
