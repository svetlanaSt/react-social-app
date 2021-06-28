import React from 'react';
import { NavLink } from 'react-router-dom';
import { FilterStateType } from '../../redux/reducers/users-reducer';
import { UserType } from '../../types';

type PropsType = {
    id: number,
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    user: UserType,
    followingInProgress: Array<number>;
    onPageChanged: (pageNumber: number) => void;  
    unFollowThunkCreator: (id: number) => void;
    followThunkCreator: (id: number) => void;
  };


const User: React.FC<PropsType> = (props) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.id}>
                        <img src={props.user.photos.small || "https://ps.w.org/ultimate-member/assets/icon-256x256.png?rev=2143339"}></img>
                    </NavLink>
                </div>
                <div>
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                            props.unFollowThunkCreator(props.id);
                        }}>unFollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                            props.followThunkCreator(props.id);
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{props.user.name}</div><div>{props.user.status}</div>
                </span>
                <span>
                    <div>{"u.location.city"}</div><div>{"u.location.country"}</div>
                </span>
            </span>
        </div>
    );
};


export default User;


