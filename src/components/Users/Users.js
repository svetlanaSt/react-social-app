import React from 'react';
import Paginator from './Paginator';
import User from './User';


const Users = (props) => {
    return (
        <div>
            <Paginator {...props} />
            {
                props.users.map(user => <User key={user.id} user={user} id={user.id} {...props} />)
            }
        </div>
    );
};


export default Users;


