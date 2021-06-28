import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLenghthCreator, requiredInput } from '../../utils/validation';
import { Element } from '../common/FormsControls/TextArea';
import { connect } from 'react-redux';
import { loginThunkCreator } from '../../redux/reducers/auth-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
  isAuth: boolean,
   loginThunkCreator: (email: string, password: string, rememberMe: boolean) => void
};

const Login: React.FC<PropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.loginThunkCreator(formData.email, formData.password, formData.rememberMe);
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

const maxLenghth = maxLenghthCreator(50);
const Input = Element("input");



const LoginFormComponent: React.FC<InjectedFormProps>= (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="email" component={Input} type="text" placeholder="email"
          validate={[requiredInput, maxLenghth]} />
      </div>
      <div>
        <Field name="password" component={Input} type="password" placeholder="password"
          validate={[requiredInput, maxLenghth]} />
      </div>
      <div>
        <Field name="rememberMe" component={Input} type="checkbox" />remember me
                </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginForm = reduxForm({
  form: 'login'
})(LoginFormComponent);

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps, { loginThunkCreator })(Login);
