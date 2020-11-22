export function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }

  export function storeCurrentUserToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }
  
  export function getCurrentUserToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
  }
  
  export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  export function clearCurrentUserToken() {
    localStorage.removeItem('token');
  }