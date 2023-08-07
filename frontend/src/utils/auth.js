const BASE_URL = 'http://127.0.0.1:3000';

// Запрос к серверу
const getResponse = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  return res.json();
};

// Универсальный метод запроса с проверкой ответа
async function request(url, options) {
  const response = await fetch(`${BASE_URL}/${url}`, options);

  return getResponse(response);
}

export const register = (email, password) => {
  return request('signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
};

export const login = (email, password) => {
  return request('signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
};

export const checkToken = token => {
  return request('users/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  });
};
