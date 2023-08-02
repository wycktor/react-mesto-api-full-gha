import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
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
    >
      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на фото"
        ref={avatarRef}
        required
      />
      <span className="popup__error avatar-error" />
    </PopupWithForm>
  );
}
