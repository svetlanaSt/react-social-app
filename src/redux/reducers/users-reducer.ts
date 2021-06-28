import { MeResponseDataType, ResponseType } from './../../api/api';
import { AppStateType } from './../redux-store';
import {  getUsers } from "../../api/api";
import { followUser, unFollowUser } from '../../api/api';
import { UserType } from "../../types";
import { Dispatch } from 'react';

const TOGGLE_FOLLOW = 'user/TOGGLE_FOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'user/SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'user/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'user/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_FILTER = 'user/SET_FILTER';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '' as string
  }
};

export type UserStateType = typeof initialState;
export type FilterStateType = typeof initialState.filter;

const usersReducer = (state = initialState, action: ActionsTypes): UserStateType => {
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
    case SET_FILTER:
        return { ...state, filter: action.payload};
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

type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;

type ActionsTypes = ReturnType<InferValueTypes<typeof actions>>;

                    
export const actions = {
   toggleFollow: (userId: number, payload: boolean) => ({
    type: TOGGLE_FOLLOW,
    userId,
    payload
  } as const),
  setUsersAC: (users: Array<UserType>) => ({
    type: SET_USERS,
    users
  } as const),
  setFilterAC: (term: string) => ({
    type: SET_FILTER,
    payload: {term}
  } as const),
  setTotalCountAC: (totalCount: number) => ({
    type: SET_TOTAL_COUNT,
    totalCount
  } as const),
  setCurrentPageAC: (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
  } as const),
  toggleIsFetchingAC: (isFetching: boolean)=> ({
    type: TOGGLE_IS_FETCHING,
    isFetching
  } as const),
  toggleFollowingProgressAC: (isFetching: boolean, id: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    id
  } as const)  
};                   



export const getUsersThunkCreator = (currentPage: number, pageSize: number, term: string) => {
  return (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.setCurrentPageAC(currentPage))
    dispatch(actions.setFilterAC(term));
    getUsers(currentPage, pageSize, term)
      .then((response: Array<UserType>)=> {                  
        dispatch(actions.toggleIsFetchingAC(false));
        dispatch(actions.setUsersAC(response));
        dispatch(actions.setTotalCountAC(500));
      })
  }
};

export const unFollowThunkCreator = (id: number) => {
  return (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    dispatch(actions.toggleFollowingProgressAC(true, id));
    unFollowUser(id)
      .then((data: ResponseType< MeResponseDataType>) => {
        if (data.resultCode === 0) {
          dispatch(actions.toggleFollow(id, false));
        }
        dispatch(actions.toggleFollowingProgressAC(false, id));
      })
  }
};

export const followThunkCreator = (id: number) => {
  return (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    dispatch(actions.toggleFollowingProgressAC(true, id));
    followUser(id)
      .then((data: any)=> {
        if (data.resultCode === 0) {
          dispatch(actions.toggleFollow(id, true));
        }
        dispatch(actions.toggleFollowingProgressAC(false, id));
      })
  }
};


export default usersReducer;