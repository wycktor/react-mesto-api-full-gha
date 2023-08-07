import AuthWithForm from './AuthWithForm';

function Login(props) {
  return (
    <AuthWithForm name={'login'} title={'Вход'} textButton={'Войти'} onSubmit={props.onSubmit} />
  );
}

export default Login;
