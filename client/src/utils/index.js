const CART_KEY = 'cart';
const TOKEN_KEY = 'jwt';
const USER_INFO = 'user';


export const calculatePrice = items => {
  return `$${items
    .reduce((acc, item) => acc + (item.price * item.quantity), 0)
    .toFixed(2)
  }`
}

export const calculateAmount = items => {
  return Number(items
    .reduce((acc, item) => acc + (item.price * item.quantity), 0)
    .toFixed(2));
}

/* cart */

export const setCart = (value, cartKey=CART_KEY) => {
  if(localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
}

export const getCart = (cartKey = CART_KEY) => {
  if(localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }

  return [];
}

export const clearCart = (cartKey = CART_KEY) => {
  if(localStorage) {
    localStorage.removeItem(cartKey);
  }
}

/* Auth */
export const getToken = (tokenKey = TOKEN_KEY) => {
  if(localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
}

export const setToken = (value, tokenKey = TOKEN_KEY) => {
  if(localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }
}

export const clearToken = (tokenKey = TOKEN_KEY) => {
  if(localStorage) {
    localStorage.removeItem(tokenKey);
  }
}

export const getUser = (tokenKey = USER_INFO) => {
  if(localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
}

export const setUser = (value, tokenKey = USER_INFO) => {
  if(localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }
}

export const clearUser = (tokenKey = USER_INFO) => {
  if(localStorage) {
    localStorage.removeItem(tokenKey);
  }
}

export * from './Constants';
export * from './queries';