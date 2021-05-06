import React from 'react';
import { NavLink } from 'react-router-dom';


const User = (props) => {
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
                        ? <button disabled={props.isfollowingInProgress.some(id => id === props.id)} onClick={() => {
                            props.unFollowThunkCreator(props.id);
                        }}>unFollow</button>
                        : <button disabled={props.isfollowingInProgress.some(id => id === props.id)} onClick={() => {
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


