class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Запрос к серверу
  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }

  // Универсальный метод запроса с проверкой ответа
  async _request(url, options) {
    const response = await fetch(`${this._baseUrl}/${url}`, options);

    return this._getResponse(response);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request('users/me', { headers: this._headers });
  }

  // Редактирование профиля
  setUserInfo(data) {
    return this._request('users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return this._request('cards', { headers: this._headers });
  }

  // Добавление новой карточки
  createCard(data) {
    return this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // Переключение лайка карточки
  changeLikeCardStatus(_id, isLiked) {
    return isLiked ? this.deleteLike(_id) : this.setLike(_id);
  }

  // Установка лайка карточки
  setLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  // Снятие лайка карточки
  deleteLike(cardId) {
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  // Обновление аватара пользователя
  updateAvatar(avatar) {
    return this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    });
  }
}

// Экземпляр класса для работы с API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c3367b9b-848a-482d-8f8f-edea2d03159c',
    'Content-Type': 'application/json'
  }
});

export default api;
