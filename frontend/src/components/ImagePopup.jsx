function ImagePopup(props) {
  return (
    <div
      className={`popup popup-${props.name} ${Object.keys(props.card).length && 'popup_opened'}`}
    >
      <div className={`popup__container-${props.name}`}>
        <button
          onClick={props.onClose}
          aria-label="Закрыть"
          className="popup__close-button hover-link"
        ></button>
        <img className={`popup__${props.name}`} src={props.card.link} alt={`${props.card.name}`} />
        <h2 className="popup__subtitle">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
