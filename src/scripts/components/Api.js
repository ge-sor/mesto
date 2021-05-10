export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._body = config.body;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCardsInfo() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }

   updateUserInfo(user) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      })
    })
    .then(res => this._getResponseData(res))
  }

  updateAvatar(user) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar,
      })
    })
    .then(res => this._getResponseData(res))
  }

  newCard(card) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    .then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }

  likeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }

  deleteLikeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
  }
  
}
