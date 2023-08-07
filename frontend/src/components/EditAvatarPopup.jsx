import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

export default function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({
    avatar: ''
  });

  useEffect(() => {
    if (!props.isOpen) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({ avatar: values.avatar });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      placeholder="Ссылка на аватар"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      isLoading={props.isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input ${errors.avatar && 'popup__input-error'}`}
        type="url"
        name="avatar"
        placeholder="Ссылка на фото"
        value={values.avatar || ''}
        onChange={handleChange}
        required
      />
      <span className={`${errors.avatar && 'popup__error_visible'}`}>{errors.avatar}</span>
    </PopupWithForm>
  );
}
