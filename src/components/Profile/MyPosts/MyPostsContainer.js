import { addPostMessageActionCreator } from '../../../redux/reducers/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';



let mapStateToProps = (state) => {
  return {
    posts: state.profile.posts
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPostMessage(text) {
      dispatch(addPostMessageActionCreator(text));
    }
  };
};


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;