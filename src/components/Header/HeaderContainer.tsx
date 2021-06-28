import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { actions, logoutThunkCreator } from '../../redux/reducers/auth-reducer';
import { AppStateType } from '../../redux/redux-store';


type PropsType = {
  isAuth: boolean,
  login: string,
  setUserData: (email: string | null, id: number | null, login: string | null, isAuth: boolean) => void,
  logoutThunkCreator: () => void
};

class HeaderContainer extends React.Component<PropsType> {

  render() {
    return (
      <Header {...this.props} />
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  };
};

export default connect(mapStateToProps, { setUserData: actions.setUserData, logoutThunkCreator })(HeaderContainer);


