import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initialiseApp } from './redux/reducers/app-reducer.ts';
import Preloader from './components/common/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));


class App extends React.Component {
  catchAllUnHandledRejection = (promiseRejectionEvent) => {
    alert('Some error');
  }

  componentDidMount() {
    this.props.initialiseApp();
  }

  render() {
    if (!this.props.initialised) {
      return <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404</div>} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    initialised: state.app.initialised
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { initialiseApp }))(App);


