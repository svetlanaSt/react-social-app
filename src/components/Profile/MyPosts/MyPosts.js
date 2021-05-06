import s from './myPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { requiredInput, maxLenghthCreator } from '../../../utils/validation';
import { Element } from '../../common/FormsControls/TextArea';


const MyPosts = React.memo((props) => {  
  let postsMessage = props.posts.map(post => <Post key={post.id} message={post.text} />);

  const onSubmit = (formData) => {
    props.addPostMessage(formData.post);
    formData.post = '';
  };

  return (
    <div className={s.postWrapp}>
      <h3>My posts</h3>
      <MyPostForm onSubmit={onSubmit} {...props} />
      { postsMessage}
    </div>
  );
});

const maxLength = maxLenghthCreator(10);
const TextArea = Element("textarea");

let MyPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="post" component={TextArea}
          validate={[requiredInput, maxLength]} />
      </div>

      <div>
        <button className={s.postBtn}>Add Post</button>
      </div>
    </form>
  );
};

MyPostForm = reduxForm({
  form: 'posts'
})(MyPostForm);

export default MyPosts;