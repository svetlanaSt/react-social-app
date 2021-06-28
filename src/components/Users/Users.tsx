import React from "react";
import { FilterStateType } from "../../redux/reducers/users-reducer";
import { UserType } from "../../types";
import Paginator from "./Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number;
  users: Array<UserType>,
  followingInProgress: Array<number>,
  onFilterChanged: (filter: FilterStateType) => void
  onPageChanged: (pageNumber: number) => void,
  unFollowThunkCreator: (id: number) => void,
  followThunkCreator: (id: number) => void,
  getUsersThunkCreator: (currentPage: number, pageSize: number, term: string ) => void, 
};

const Users: React.FC<PropsType> = (props) => {
  return (
    <div>
      <UsersSearchForm {...props}/>
      <Paginator {...props} />
      {props.users.map((user) => (
        <User key={user.id} user={user} id={user.id} {...props} />
      ))}
    </div>
  );
};



export default Users;
