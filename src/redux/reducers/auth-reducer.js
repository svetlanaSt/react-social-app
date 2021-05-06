import { stopSubmit } from "redux-form";
import { authMe, login, logout } from "../../api/api";

const SET_USERS_DATA = 'auth/SET_USERS_DATA';

let initialState = {
  email: null,
  id: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const setUserData = (email, id, login, isAuth) => ({
  type: SET_USERS_DATA,
  data: { email, id, login, isAuth }
});

export const authThunkCreator = () => (dispatch) => {
  return authMe()
    .then(data => {
      if (data.resultCode === 0) {
        let { email, id, login } = data.data;
        dispatch(setUserData(email, id, login, true));
      }
    })
};

export const loginThunkCreator = (email, password, rememberMe) => {
  return (dispatch) => {
    login(email, password, rememberMe)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(authThunkCreator());
        } else {
          dispatch(stopSubmit('login', { _error: 'Email or password is wrong' }));
        }
      })
  }
};

export const logoutThunkCreator = () => {
  return (dispatch) => {
    logout()
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setUserData(null, null, null, false));
        }
      })
  }
};

export default authReducer;