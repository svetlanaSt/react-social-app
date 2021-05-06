import { getProfile, getStatus, updateStatus } from "../../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';

let initialState = {
  posts: [
    { id: 1, text: 'Hello' },
    { id: 2, text: 'Wat`s up?' }
  ],
  profile: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newId = [...state.posts].pop().id;

      let newPost = {
        id: newId + 1,
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

export const addPostMessageActionCreator = (text) => ({
  type: ADD_POST,
  text
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status
});

export const getProfileThunkCreator = (userId) => {
  return (dispatch) => {
    getProfile(userId)
      .then(data => {
        dispatch(setUserProfile(data));
      })
  }
};

export const getStatusThunkCreator = (userId) => {
  return (dispatch) => {
    getStatus(userId)
      .then(data => {
        dispatch(setUserStatus(data));
      })
  }
};

export const updateStatusThunkCreator = (status) => {
  return (dispatch) => {
    updateStatus(status)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setUserStatus(status));
        }
      })
  }
};

export default profileReducer;
