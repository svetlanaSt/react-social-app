import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { AppStateType } from "../redux/redux-store";
import React from "react";


let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    };
};

type MapPropsType = {
    isAuth: boolean
};

export function authRedirect<WPS> (Component: React.ComponentType<WPS>)  {

    const AuthRedirectComponent: React.FC<MapPropsType> = (props) => {
        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Redirect to={'/login'} />
        return <Component {...restProps as WPS} />
    }
    let ConnectedAuthRedirectComponent = connect<MapPropsType, undefined, WPS, AppStateType>(mapStateToPropsForRedirect)(AuthRedirectComponent);

    return ConnectedAuthRedirectComponent;
};