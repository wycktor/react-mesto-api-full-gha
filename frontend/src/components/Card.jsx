import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some(like => like === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && 'element__like-button_checked'
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__recycle-button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        onClick={handleClick}
        src={props.card.link}
        alt={`${props.card.name}`}
      />
      <div className="element__content">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes">{[...props.card.likes].length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
