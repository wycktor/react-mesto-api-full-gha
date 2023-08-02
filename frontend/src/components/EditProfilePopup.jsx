import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__error name-error" />
      <input
        className="popup__input popup__input_type_about"
        type="text"
        name="about"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        value={about || ''}
        onChange={handleChangeAbout}
        required
      />
      <span className="popup__error about-error" />
    </PopupWithForm>
  );
}
