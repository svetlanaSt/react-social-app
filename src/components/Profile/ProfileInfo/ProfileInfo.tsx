import { ProfileType } from '../../../types';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import s from './profileInfo.module.css';

type PropsType = {
    profile: ProfileType,
    status: string,
    updateStatus: () => void
};

const ProfileInfo: React.FC<PropsType> = (props) => {
    return (
        <div className={s.description}>
            <div>{props.profile.fullName}</div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
    );
};

export default ProfileInfo;