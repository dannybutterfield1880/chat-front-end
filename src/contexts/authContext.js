import {
    createContext,
} from 'react';

const AUTH_CONTEXT = {
    user: {},
    setUser: () => {},
    token: null,
    setToken: () => {}
  };
  
const AuthContext = createContext(AUTH_CONTEXT)

export default AuthContext