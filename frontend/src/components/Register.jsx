import { Link } from 'react-router-dom';
import AuthWithForm from './AuthWithForm';

function Register(props) {
  return (
    <AuthWithForm
      name={'register'}
      title={'Регистрация'}
      textButton={'Зарегистрироваться'}
      onSubmit={props.onSubmit}
    >
      <Link to="/sign-in" className="login__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthWithForm>
  );
}

export default Register;
