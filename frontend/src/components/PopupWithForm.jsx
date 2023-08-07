import useClosePopup from '../hooks/useClosePopup';

function PopupWithForm(props) {
  useClosePopup(props.isOpen, props.onClose);

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          aria-label="Закрыть"
          className="popup__close-button hover-link"
        />
        <form
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className={`popup__submit hover-link ${!props.isValid && 'popup__submit_disabled'}`}
            type="submit"
          >
            {props.isLoading ? props.loadingButtonText : props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
