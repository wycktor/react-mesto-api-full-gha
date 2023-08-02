import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link
    });
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
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__error name-error" />
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__error link-error" />
    </PopupWithForm>
  );
}
