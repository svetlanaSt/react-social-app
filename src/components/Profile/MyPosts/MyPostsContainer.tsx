import { actions } from '../../../redux/reducers/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';



let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profile.posts
  };
};

const MyPostsContainer = connect(mapStateToProps,{
  addPostMessage: actions.addPostMessageActionCreator
})(MyPosts);


export default MyPostsContainer;