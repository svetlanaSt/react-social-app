import DialogItem from './DialogItem/DialogItem';
import s from './dialogs.module.css';
import DialogUser from './DialogUser/DialogUser';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Element } from '../common/FormsControls/TextArea';
import { requiredInput, maxLenghthCreator } from '../../utils/validation';



const Dialogs = (props) => {

  let dialogUser = props.users.map((user, i) => <DialogUser key={i} name={user.name} id={user.id} />);
  let dialogItem = props.messages.map((m, i) => <DialogItem key={i} message={m.message} />);

  const onSubmit = (formData) => {  
    let text = formData.dialogs;
    props.addMessage(text);

    formData.dialogs = '';
  };

  return (
    <div className={s.dialogsConteiner}>
      <div> {dialogUser} </div>
      <div className={s.dialogsItemsConteiner}>
        {dialogItem}
        <DialogForm onSubmit={onSubmit} {...props} />
      </div>
    </div>
  );
}

const maxLength = maxLenghthCreator(10);
const TextArea = Element("textarea");

let DialogForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="dialogs" component={TextArea} validate={[requiredInput, maxLength]} />
      </div>
      <div>
        <button className={s.postBtn}>Add Post</button>
      </div>
    </form>
  );
};

DialogForm = reduxForm({
  form: 'posts'
})(DialogForm);

export default Dialogs;


