import { getProfile, getStatus, updateStatus } from "../../api/api";
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

const profileReducer = (state = initialState, action: any): ProfileStateType => {
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

type AddPostMessageActionType = {
  type: typeof ADD_POST,
  text: string
};

export const addPostMessageActionCreator = (text: string): AddPostMessageActionType => ({
  type: ADD_POST,
  text
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
};

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile
});

type SetUserStatusType = {
  type: typeof SET_USER_STATUS,
  status: string
};

export const setUserStatus = (status: string): SetUserStatusType => ({
  type: SET_USER_STATUS,
  status
});

export const getProfileThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    getProfile(userId)
      .then((data: any) => {
        dispatch(setUserProfile(data));
      })
  }
};

export const getStatusThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    getStatus(userId)
      .then((data: any) => {
        dispatch(setUserStatus(data));
      })
  }
};

export const updateStatusThunkCreator = (status: string) => {
  return (dispatch: any) => {
    updateStatus(status)
      .then((data: any) => {
        if (data.resultCode === 0) {
          dispatch(setUserStatus(status));
        }
      })
  }
};

export default profileReducer;
