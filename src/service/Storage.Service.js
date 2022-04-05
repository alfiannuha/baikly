const TOKEN_KEY = "access_token"
const USER = "access_user"

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
  //Token
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  getUser() {
    return localStorage.getItem(USER)
  },
  saveToken(accessToken, accessUser) {
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(USER, accessUser)
  },
  saveUser(accessUser){
    localStorage.setItem(USER, accessUser)
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER)
  },
  removeUser() {
    localStorage.removeItem(USER)
  },
  //User
  getUser() {
    return localStorage.getItem(USER)
  },
  
}

export { TokenService }