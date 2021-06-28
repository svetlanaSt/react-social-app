import s from './myPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { requiredInput, maxLenghthCreator } from '../../../utils/validation';
import { Element } from '../../common/FormsControls/TextArea';
import { PostType } from '../../../types';

type PropsType = {
  posts: Array<PostType>,
  addPostMessage: (post: string) => void
};

const MyPosts: React.FC<PropsType> = React.memo((props) => {  
  let postsMessage = props.posts.map(post => <Post key={post.id} message={post.text} />);

  const handleSubmit = (formData: any) => {
    props.addPostMessage(formData.post);
    formData.post = '';
  };

  return (
    <div className={s.postWrapp}>
      <h3>My posts</h3>
      <PostForm onSubmit={handleSubmit} {...props} />
      { postsMessage}
    </div>
  );
});

const maxLength = maxLenghthCreator(10);
const TextArea = Element("textarea");

type FormProps = { 
  onSubmit: (formData: any) => void
};

const MyPostForm: React.FC<FormProps & InjectedFormProps<PropsType, FormProps>> = (props) => {
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

const PostForm = reduxForm<PropsType, FormProps>({
  form: 'posts'
})(MyPostForm);

export default MyPosts;