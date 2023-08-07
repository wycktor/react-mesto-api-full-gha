import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

export default function EditProfilePopup(props) {
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormAndValidation({
    name: '',
    about: ''
  });

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, props.isOpen]);

  useEffect(() => {
    resetForm({ name: currentUser.name, about: currentUser.about });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: values.name,
      about: values.about
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
      isValid={isValid}
    >
      <input
        className={`popup__input ${errors.name && 'popup__input-error'}`}
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values.name || ''}
        onChange={handleChange}
        required
      />
      <span className={`${errors.name && 'popup__error_visible'}`}>{errors.name}</span>
      <input
        className={`popup__input ${errors.about && 'popup__input-error'}`}
        type="text"
        name="about"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        value={values.about || ''}
        onChange={handleChange}
        required
      />
      <span className={`${errors.about && 'popup__error_visible'}`}>{errors.about}</span>
    </PopupWithForm>
  );
}
