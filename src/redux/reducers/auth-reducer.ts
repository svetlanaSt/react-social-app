import { ResponseType, MeResponseDataType } from './../../api/api';
import { ResultCodeEnum } from './../../types';
import { stopSubmit } from "redux-form";
import { authMe, login, logout } from "../../api/api";
import { Dispatch } from 'react';

const SET_USERS_DATA = 'auth/SET_USERS_DATA';


let initialState = {
  email: null as string | null,
  id: null as number | null,
  login: null as  string | null,
  isAuth: false
};

export type AuthStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): AuthStateType => {
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

type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;

type ActionsTypes = ReturnType<InferValueTypes<typeof actions>>;


export const actions = {
  setUserData: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => ({
    type: SET_USERS_DATA,
    data: { email, id, login, isAuth }
  } as const)  
};

export const authThunkCreator = () => (dispatch: Dispatch<ActionsTypes>) => {
  return authMe()
    .then((data:ResponseType<MeResponseDataType>) => {
      if (data.resultCode === ResultCodeEnum.Success) {
        let { email, id, login } = data.data;
        dispatch(actions.setUserData(email, id, login, true));
      }
    })
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean) => {
  return (dispatch: Dispatch<ActionsTypes | ReturnType<typeof stopSubmit> | ReturnType<typeof authThunkCreator>>) => {
    login(email, password, rememberMe)
      .then((data: ResponseType) => {
        if (data.resultCode === ResultCodeEnum.Success) {
          dispatch(authThunkCreator());
        } else {
          dispatch(stopSubmit('login', { _error: 'Email or password is wrong' }));
        }
      })
  }
};

export const logoutThunkCreator = () => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    logout()
      .then((data: ResponseType) => {
        if (data.resultCode === 0) {
          dispatch(actions.setUserData(null, null, null, false));
        }
      })
  }
};

export default authReducer;