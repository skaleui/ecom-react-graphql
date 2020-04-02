export const HOST = window.location.hostname || process.env.REACT_APP_HOST|| 'localhost';
export const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || '1337';
export const PROTOCOL = process.env.REACT_APP_PROTOCOL ||  + 'http';
export const API_URL = PROTOCOL + '://' + HOST + ':' + GRAPHQL_PORT; 
