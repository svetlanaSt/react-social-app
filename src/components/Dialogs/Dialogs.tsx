import DialogItem from './DialogItem/DialogItem';
import s from './dialogs.module.css';
import DialogUser from './DialogUser/DialogUser';
import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Element } from '../common/FormsControls/TextArea';
import { requiredInput, maxLenghthCreator } from '../../utils/validation';
import { connect } from 'react-redux';
import { UserType } from '../../types';


type PropsType = {
  users: Array<UserType>,
  messages: Array<{message: string}>,
  addMessage: (text: string) => void
};

const Dialogs: React.FC<PropsType> = (props: any) => {

  let dialogUser = props.users.map((user: UserType, i: number) => <DialogUser key={i} name={user.name} id={user.id} />);
  let dialogItem = props.messages.map((m: {message: string}, i: number) => <DialogItem key={i} message={m.message} />);

  const handleSubmit = (formData: any) => {  
    let text = formData.dialogs;
    props.addMessage(text);

    formData.dialogs = '';
  };

  return (
    <div className={s.dialogsConteiner}>
      <div> {dialogUser} </div>
      <div className={s.dialogsItemsConteiner}>
        {dialogItem}
        <DialogForm onSubmit={handleSubmit} {...props} />
      </div>
    </div>
  );
}

const maxLength = maxLenghthCreator(10);
const TextArea = Element("textarea");

type FormProps = { 
  onSubmit: (formData: any) => void
};

const DialogForm: React.FC<FormProps & InjectedFormProps<PropsType, FormProps>> = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <Field name="dialogs" component={TextArea} validate={[requiredInput, maxLength]} />
      </div>
      <div>
        <button className={s.postBtn}>Add Post</button>
      </div>
    </form>
  );
};

const form = reduxForm<PropsType, FormProps>({
  form: 'posts'
})(DialogForm);

export default connect(null)(form);


