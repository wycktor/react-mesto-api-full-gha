import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <nav className="header__nav">
              <p className="header__text">{props.email}</p>
              <button
                className={`header__link ${props.loggedIn ? 'header__link_logged' : ''}`}
                onClick={props.onSubmit}
              >
                Выйти
              </button>
            </nav>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
