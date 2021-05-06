import { getUsers } from "../../api/api";
import { followUser, unFollowUser } from '../../api/api';

const TOGGLE_FOLLOW = 'user/TOGGLE_FOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'user/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'user/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'user/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: action.payload };
          }
          return u;
        })
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_COUNT:
      return { ...state, totalUsersCount: action.totalCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching ?
          [...state.followingInProgress, action.id]
          : state.followingInProgress.filter(id => id !== action.id)
      };
    default:
      return state;
  }
};

export const toggleFollow = (userId, payload) => ({
  type: TOGGLE_FOLLOW,
  userId,
  payload
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users
});

export const setTotalCountAC = (totalCount) => ({
  type: SET_TOTAL_COUNT,
  totalCount
});

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

export const toggleIsFetchingAC = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export const toggleFollowingProgressAC = (isFetching, id) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  id
});

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    getUsers(currentPage, pageSize)
      .then(response => {
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(response.items));
        dispatch(setTotalCountAC(500));
      })
  }
};

export const unFollowThunkCreator = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, id));
    unFollowUser(id)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(toggleFollow(id, false));
        }
        dispatch(toggleFollowingProgressAC(false, id));
      })
  }
};

export const followThunkCreator = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAC(true, id));
    followUser(id)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(toggleFollow(id, true));
        }
        dispatch(toggleFollowingProgressAC(false, id));
      })
  }
};


export default usersReducer;