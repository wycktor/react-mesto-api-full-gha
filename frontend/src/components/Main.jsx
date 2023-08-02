import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото Жака-Ива Кусто." />
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Обновить аватар"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button hover-link"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          />
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button hover-link"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Галерея">
        <ul className="elements__list">
          {props.cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDeleteConfirmation}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
