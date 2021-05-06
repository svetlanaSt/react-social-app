import { Field, reduxForm } from 'redux-form'
import { maxLenghthCreator, requiredInput } from '../../utils/validation';
import { Element } from '../common/FormsControls/TextArea';
import { connect } from 'react-redux';
import { loginThunkCreator } from '../../redux/reducers/auth-reducer';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const onSubmit = (formData) => {
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

let LoginForm = (props) => {
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
        <   Field name="rememberMe" component={Input} type="checkbox" />remember me
                </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default connect(mapStateToProps, { loginThunkCreator })(Login);
