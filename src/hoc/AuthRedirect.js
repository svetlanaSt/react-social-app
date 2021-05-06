import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';


let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    };
};

export const authRedirect = (Component) => {
    const AuthRedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to={'/login'} />
        return <Component {...props} />
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);

    return ConnectedAuthRedirectComponent;
};