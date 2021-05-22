import { getUsers } from "../../api/api";
import { followUser, unFollowUser } from '../../api/api';
import { UserType } from "../../types";

const TOGGLE_FOLLOW = 'user/TOGGLE_FOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'user/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'user/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'user/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as any
};

export type UserStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): UserStateType => {
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
          : state.followingInProgress.filter((id: number) => id !== action.id)
      };
    default:
      return state;
  }
};

type ToggleFollowActionType = {
  type: typeof TOGGLE_FOLLOW,
  userId: number,
  payload: any
};

export const toggleFollow = (userId: number, payload: any): ToggleFollowActionType => ({
  type: TOGGLE_FOLLOW,
  userId,
  payload
});

type SetUsersActionType = {
  type: typeof SET_USERS,
  users: Array<UserType>
};

export const setUsersAC = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users
});

type SetTotalCountActionType = {
  type: typeof SET_TOTAL_COUNT,
  totalCount: number
};

export const setTotalCountAC = (totalCount: number): SetTotalCountActionType => ({
  type: SET_TOTAL_COUNT,
  totalCount
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
};


export const setCurrentPageAC = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
};

export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType=> ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

type  ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean,
  id: number
};

export const toggleFollowingProgressAC = (isFetching: boolean, id: number):  ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  id
});

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
  return (dispatch: any) => {
    dispatch(toggleIsFetchingAC(true));
    getUsers(currentPage, pageSize)
      .then((response: any)=> {
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(response.items));
        dispatch(setTotalCountAC(500));
      })
  }
};

export const unFollowThunkCreator = (id: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgressAC(true, id));
    unFollowUser(id)
      .then((data: any) => {
        if (data.resultCode === 0) {
          dispatch(toggleFollow(id, false));
        }
        dispatch(toggleFollowingProgressAC(false, id));
      })
  }
};

export const followThunkCreator = (id: number) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgressAC(true, id));
    followUser(id)
      .then((data: any)=> {
        if (data.resultCode === 0) {
          dispatch(toggleFollow(id, true));
        }
        dispatch(toggleFollowingProgressAC(false, id));
      })
  }
};


export default usersReducer;