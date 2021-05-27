import React from "react";
import { UserType } from "../../types";
import Paginator from "./Paginator";
import User from "./User";

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number;
  users: Array<UserType>,
  followingInProgress: Array<number>,
  onPageChanged: (pageNumber: number) => void,
  unFollowThunkCreator: (id: number) => void,
  followThunkCreator: (id: number) => void
};

const Users: React.FC<PropsType> = (props) => {
  return (
    <div>
      <Paginator {...props} />
      {props.users.map((user) => (
        <User key={user.id} user={user} id={user.id} {...props} />
      ))}
    </div>
  );
};

export default Users;
