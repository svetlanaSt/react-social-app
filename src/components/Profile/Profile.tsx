import { ProfileType } from '../../types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';


type PropsType = {
    profile: ProfileType,
    status: string,
    updateStatusThunkCreator: () => void
};

const Profile: React.FC<PropsType> = (props) => {
    if (!props.profile) {
        return <div>Oooops</div>
    }
    return (
        <div className={s.content}>
            <div>
                <img src='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm104-eye-02-1_1_3.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=65&usm=15&vib=3&w=600&s=0e405135551a42cc14cfcf8bcc4b1e4b'></img>
            </div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatusThunkCreator} />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;