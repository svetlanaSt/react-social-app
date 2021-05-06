import React, { useEffect, useState } from 'react';


const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div >
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'Hello'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true}
                        onChange={onStatusChange}
                        onBlur={deActivateEditMode}
                        value={status}>
                    </input>
                </div>
            }
        </div>
    );
};

export default ProfileStatus;