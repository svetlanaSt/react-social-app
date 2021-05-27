import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
    status: string,
    updateStatus: (status: string) => void
};



const ProfileStatus: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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