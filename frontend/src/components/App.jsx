import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setPopupWithConfirmationOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteConfirmation(card) {
    setDeleteCard(card);
    setPopupWithConfirmationOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setPopupWithConfirmationOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateAvatar(data) {
    setLoading(true);

    api
      .updateAvatar(data.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateUser(userData) {
    setLoading(true);

    api
      .setUserInfo({ name: userData.name, about: userData.about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);

    api
      .createCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setLoading(true);

    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== deleteCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then(res => {
        setLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true });
        api.setToken(res.token);
        localStorage.setItem('jwt', res.token);
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip();
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setRegisterSuccess(true);
        handleInfoTooltip();
        navigate('/sign-in', { replace: true });
      })
      .catch(err => {
        console.log(err);
        setRegisterSuccess(false);
        handleInfoTooltip();
      });
  }

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(res => {
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/', { replace: true });
          api.setToken(jwt);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleSignOut() {
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={email} onSubmit={handleSignOut} loggedIn={loggedIn} />

          <Routes>
            <Route path="/sign-up" element={<Register onSubmit={handleRegister} />} />
            <Route path="/sign-in" element={<Login onSubmit={handleLogin} />} />
            <Route
              path="/*"
              element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteConfirmation={handleCardDeleteConfirmation}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>

          {loggedIn && <Footer />}
          {/* Изменение аватара */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          {/* Редактирование профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          {/* Добавление новой карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          {/* Удаление выбранной карточки */}
          <PopupWithConfirmation
            isOpen={isPopupWithConfirmationOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />

          {/* Просмотр выбранной карточки */}
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            name="image"
            card={selectedCard}
          />

          {/* Авторизация */}
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isRegisterSuccess={isRegisterSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
