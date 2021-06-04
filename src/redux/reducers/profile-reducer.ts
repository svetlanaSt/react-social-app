import { Dispatch } from "react";
import { getProfile, getStatus, ResponseType, updateStatus } from "../../api/api";
import { PostType, ProfileType } from '../../types';

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';


let initialState = {
  posts: [
    { id: 1, text: 'Hello' },
    { id: 2, text: 'Wat`s up?' }
  ] as Array<PostType> ,
  profile: null as null | ProfileType,
  status: '' as string
};

export type ProfileStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): ProfileStateType => {
  switch (action.type) {
    case ADD_POST: 

      let newPost = {
        id: 3,
        text: action.text
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
};

type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;

type ActionsTypes = ReturnType<InferValueTypes<typeof actions>>;

export const actions = {
  addPostMessageActionCreator: (text: string) => ({
    type: ADD_POST,
    text
  } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile
  } as const),
  setUserStatus: (status: string) => ({
    type: SET_USER_STATUS,
    status
  } as const)
};

export const getProfileThunkCreator = (userId: number) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    getProfile(userId)
      .then((data: ProfileType) => {
        dispatch(actions.setUserProfile(data));
      })
  }
};

export const getStatusThunkCreator = (userId: number) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    getStatus(userId)
      .then((data: string) => {
        dispatch(actions.setUserStatus(data));
      })
  }
};

export const updateStatusThunkCreator = (status: string) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    updateStatus(status)
      .then((data: ResponseType) => {
        if (data.resultCode === 0) {
          dispatch(actions.setUserStatus(status));
        }
      })
  }
};

export default profileReducer;
