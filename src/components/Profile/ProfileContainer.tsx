import Profile from './Profile';
import React, {  useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileThunkCreator, actions, getStatusThunkCreator, updateStatusThunkCreator } from '../../redux/reducers/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types';
import { useLocation, useParams } from 'react-router';
// import {  useLocation, useParams } from '@reach/router';


type StatePropsType = {
    logUserId: number,
    profile: ProfileType,
    status: string    
};

type DispatchPropsType = {    
    getProfileThunkCreator: (userId: number) => void,
    getStatusThunkCreator: (userId: number) => void,
    updateStatusThunkCreator: () => void   
};

type PropsType = StatePropsType & DispatchPropsType;

const ProfileContainer: React.FC<PropsType> = (props) => {

    let location = useLocation();  
    // let { userId } = useParams();
    let params = useParams();
    
    
    let userId = 4;  

    useEffect(() => {        
        // let { userId } = useParams();
        if (!userId) {
            userId = props.logUserId;
        }
        props.getProfileThunkCreator(userId);
        props.getStatusThunkCreator(userId);
    }, [location.pathname]);

    return (
        <Profile {...props} profile={props.profile}
            status={props.status} />
    );
};

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profile.profile,
        status: state.profile.status,
        logUserId: state.auth.id,
        isAuth: state.auth.isAuth
    };
};

export default connect(mapStateToProps, {
    setUserProfile: actions.setUserProfile, getProfileThunkCreator,
    getStatusThunkCreator, updateStatusThunkCreator
}
)(ProfileContainer as React.ComponentType);
