import useFormAndValidation from '../hooks/useFormAndValidation';

function AuthWithForm(props) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: ''
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onSubmit(values.email, values.password);
  };

  return (
    <div className="login">
      <h2 className="login__title">{props.title}</h2>
      <form className="login__form" name={props.name} onSubmit={handleSubmit}>
        <input
          className={`login__input ${errors.email && 'login__input-error'}`}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ''}
          required
        />
        <span className={`${errors.email && 'login__error_visible'}`}>{errors.email}</span>
        <input
          className={`login__input ${errors.password && 'login__input-error'}`}
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={values.password || ''}
          required
        />
        <span className={`${errors.password && 'login__error_visible'}`}>{errors.password}</span>
        <button
          className={`login__submit hover-link ${!isValid && 'login__submit_disabled'}`}
          type="submit"
        >
          {props.textButton}
        </button>
        {props.children}
      </form>
    </div>
  );
}

export default AuthWithForm;
