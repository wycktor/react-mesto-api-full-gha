import { useEffect } from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({
    name: '',
    link: ''
  });

  useEffect(() => {
    if (!props.isOpen) resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      loadingButtonText="Создание..."
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
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.name || ''}
        onChange={handleChange}
        required
      />
      <span className={`${errors.name && 'popup__error_visible'}`}>{errors.name}</span>
      <input
        className={`popup__input ${errors.link && 'popup__input-error'}`}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={values.link || ''}
        onChange={handleChange}
        required
      />
      <span className={`${errors.link && 'popup__error_visible'}`}>{errors.link}</span>
    </PopupWithForm>
  );
}
