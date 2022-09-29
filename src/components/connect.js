export function getUserInfo(groupId, token) {
  return fetch(`https://nomoreparties.co/v1/${groupId}/users/me`, {
    headers: {
      authorization: token
    }
  })
}
export function setUserInfo(groupId, token, name, about) {
  return fetch(`https://nomoreparties.co/v1/${groupId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}
export function getCards(groupId, token) {
  return fetch(`https://nomoreparties.co/v1/${groupId}/cards`, {
    headers: {
      authorization: token
    }
  })
}
export function addedCard(groupId, token, name, link) {
  return fetch(`https://nomoreparties.co/v1/${groupId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}
export function deleteCardOnServer(groupId, token, cardId) {
  return fetch(`https://nomoreparties.co/v1/${groupId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
}
