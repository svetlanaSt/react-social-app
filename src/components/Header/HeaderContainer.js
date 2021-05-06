import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setUserData, logoutThunkCreator } from '../../redux/reducers/auth-reducer';


class HeaderContainer extends React.Component {

  render() {
    return (
      <Header {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  };
};

export default connect(mapStateToProps, { setUserData, logoutThunkCreator })(HeaderContainer);

