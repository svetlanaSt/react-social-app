import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initialiseApp } from './redux/reducers/app-reducer';
import Preloader from './components/common/Preloader';
import { AppStateType } from './redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));


type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initialiseApp: () => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class App extends React.Component<PropsType> {
  catchAllUnHandledRejection = (e: PromiseRejectionEvent) => {
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

let mapStateToProps = (state: AppStateType) => {
  return {
    initialised: state.app.initialised
  };
};

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initialiseApp }))(App);


