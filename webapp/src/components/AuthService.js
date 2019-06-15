export default class AuthService {
  
  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  loggedIn() {
    return !!this.getToken();
  }
}