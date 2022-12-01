import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/userReducer";
import { toast } from "react-toastify";
import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from "./actions";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const showAlert = ({ message, type = "error" }) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  const setupUser = async ({ currentUser, path }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/auth/${path}`, currentUser);
      const { user, token } = data;
      dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
      showAlert({
        message: `successfully ${
          path === "login" ? "logged in!" : "created user"
        }`,
        type: "success",
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
      });
      showAlert(error.response.data.msg);
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <UserContext.Provider
      value={{ ...state, showAlert, setupUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext, initialState };
