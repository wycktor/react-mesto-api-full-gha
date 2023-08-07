import useClosePopup from '../hooks/useClosePopup';
import succes from '../images/union-success.svg';
import fail from '../images/union-fail.svg';

function InfoTooltip(props) {
  useClosePopup(props.isOpen, props.onClose);

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-info-tooltip">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
          aria-label="Закрыть"
        />
        <img
          className="popup__icon"
          src={props.isRegisterSuccess ? succes : fail}
          alt={props.isRegisterSuccess ? 'Регистрация пройдена' : 'Миссия провалена'}
        />
        <h3 className="popup__text">
          {props.isRegisterSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так'}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
