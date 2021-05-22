import { stopSubmit } from "redux-form";
import { authMe, login, logout } from "../../api/api";

const SET_USERS_DATA = 'auth/SET_USERS_DATA';

export type AuthType = {
  email: string | null,
  id: number | null ,
  login: string | null,
  isAuth: boolean
};

let initialState: AuthType = {
  email: null,
  id: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action: any): AuthType => {
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

type DataType = {
  email: string | null,
  id: number | null ,
  login: string | null,
  isAuth: boolean
};

type SetUserDataActionType = {
  type: typeof SET_USERS_DATA,
  data: DataType
};

export const setUserData = (email: string | null, id: number | null, login: string | null, isAuth: boolean): SetUserDataActionType => ({
  type: SET_USERS_DATA,
  data: { email, id, login, isAuth }
});

export const authThunkCreator = () => (dispatch: any) => {
  return authMe()
    .then((data: any) => {
      if (data.resultCode === 0) {
        let { email, id, login } = data.data;
        dispatch(setUserData(email, id, login, true));
      }
    })
};

export const loginThunkCreator = (email: string, password: number, rememberMe: boolean) => {
  return (dispatch: any) => {
    login(email, password, rememberMe)
      .then((data: any) => {
        if (data.resultCode === 0) {
          dispatch(authThunkCreator());
        } else {
          dispatch(stopSubmit('login', { _error: 'Email or password is wrong' }));
        }
      })
  }
};

export const logoutThunkCreator = () => {
  return (dispatch: any) => {
    logout()
      .then((data: any) => {
        if (data.resultCode === 0) {
          dispatch(setUserData(null, null, null, false));
        }
      })
  }
};

export default authReducer;