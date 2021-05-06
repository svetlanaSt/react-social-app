import React from 'react';
import { connect } from 'react-redux';
import { followThunkCreator, getUsersThunkCreator, setCurrentPageAC, unFollowThunkCreator } from '../../redux/reducers/users-reducer';
import { getPageSize, getUser, getTotalUsersCount, getCurrentPage, getIsFetching, getIsfollowingInProgress } from '../../redux/selectors';
import Preloader from '../common/Preloader';
import Users from './Users';


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (p) => {
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
          unFollow={this.props.unFollow}
          follow={this.props.follow}
          isfollowingInProgress={this.props.isfollowingInProgress}
          unFollowThunkCreator={this.props.unFollowThunkCreator}
          followThunkCreator={this.props.followThunkCreator}
          onPageChanged={this.onPageChanged} />
      </div>
    );
  }
}


let mapStateToProps = (state) => {
  return {
    users: getUser(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isfollowingInProgress: getIsfollowingInProgress(state)
  };
};

export default connect(mapStateToProps, {
  setCurrentPage: setCurrentPageAC,
  unFollowThunkCreator: unFollowThunkCreator,
  followThunkCreator: followThunkCreator,
  getUsersThunkCreator: getUsersThunkCreator
})(UsersContainer);





