import React from 'react';
import { connect } from 'react-redux';
import { followThunkCreator, getUsersThunkCreator, actions, unFollowThunkCreator } from '../../redux/reducers/users-reducer';
import { AppStateType } from '../../redux/redux-store';
import { getPageSize, getUser, getTotalUsersCount, getCurrentPage, getIsFetching, getIsfollowingInProgress } from '../../redux/selectors';
import { UserType } from '../../types';
import Preloader from '../common/Preloader';
import Users from './Users';

type MapStatePropsType = {
  totalUsersCount: number,
  pageSize: number,
  isFetching: boolean,
  currentPage: number,  
  users: Array<UserType>,  
  followingInProgress: Array<number>  
};

type MapDispatchPropsType = {  
  getUsersThunkCreator: (currentPage: number, pageSize: number ) => void,  
  setCurrentPage: (currentPage: number) => void,
  unFollowThunkCreator: (id: number) => void,  
  followThunkCreator:  (id: number) => void
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (p: number) => {
    this.props.setCurrentPage(p);
    this.props.getUsersThunkCreator(p, this.props.pageSize);
  }

  render() {
    return (
      <div>
        {this.props.isFetching &&
          <Preloader />}
        <Users totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}         
          followingInProgress={this.props.followingInProgress}
          unFollowThunkCreator={this.props.unFollowThunkCreator}
          followThunkCreator={this.props.followThunkCreator}
          onPageChanged={this.onPageChanged} />
      </div>
    );
  }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUser(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getIsfollowingInProgress(state)
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
  setCurrentPage: actions.setCurrentPageAC,
  unFollowThunkCreator: unFollowThunkCreator,
  followThunkCreator: followThunkCreator,
  getUsersThunkCreator: getUsersThunkCreator
})(UsersContainer);





