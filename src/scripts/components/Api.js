export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.body = config.body;
  }
  getInfo() {
    return fetch(this.url, {
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

   updateUserInfo(user) {
    return fetch(this.url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  updateAvatar(user) {
    return fetch(this.url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: user.avatar,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  newCard(card) {
    return fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  deleteCard(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  likeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }

  deleteLikeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error(`ошибочка ${res.status}`));
    })
    .catch(err => Promise.reject(err));
  }
}
