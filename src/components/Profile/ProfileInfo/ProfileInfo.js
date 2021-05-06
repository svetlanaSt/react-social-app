import ProfileStatus from '../ProfileStatus/ProfileStatus';
import s from './profileInfo.module.css';


const ProfileInfo = (props) => {
    return (
        <div className={s.description}>
            <div>{props.profile.fullName}</div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
    );
};

export default ProfileInfo;