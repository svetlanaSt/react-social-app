import s from './post.module.css';

const Post = (props) => {  
    return (
        <div className={s.item}>            
            {props.message}     
        </div>     
    );  
  };
  
  export default Post;