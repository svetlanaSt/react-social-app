import Profile from './Profile';
import React, {  useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileThunkCreator, setUserProfile, getStatusThunkCreator, updateStatusThunkCreator } from '../../redux/reducers/profile-reducer';
import { withRouter } from 'react-router-dom';


const ProfileContainer = (props) => {

    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = props.logUserId;
        }
        props.getProfileThunkCreator(userId);
        props.getStatusThunkCreator(userId);
    }, [props.location.pathname]);


    return (
        <Profile {...props} profile={props.profile}
            status={props.status} />
    );
};

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        logUserId: state.auth.id,
        isAuth: state.auth.isAuth
    };
};

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUserProfile, getProfileThunkCreator,
    getStatusThunkCreator, updateStatusThunkCreator
}
)(WithUrlDataContainerComponent);
