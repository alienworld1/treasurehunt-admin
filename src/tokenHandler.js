function saveToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function deleteToken() {
  localStorage.removeItem('token');
}

export { saveToken, getToken, deleteToken };