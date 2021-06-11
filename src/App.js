import logo from './logo.svg';
import React, { useState, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import styled from 'styled-components'
import Header from './components/Header'
import Nav from './components/Nav'
import Main from './components/Main'
import AuthContext from './contexts/authContext';
import useAuthContextValue from './effects/useAuthContext';

const Pusher = window.Pusher;
const PUSHER_KEY = '2ff60f46671a2c428060';
const PUSHER_CLUSTER = 'eu';

//dev only
Pusher.logToConsole = true;

var pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER 
});

const AppBackground = styled.main`
  background: #151515;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const PUSHER_CONTEXT = {
  pusher
}

export const PusherContext = createContext({});

function App() {
  //TODO create contexts somewhere else
  const authContextValue = useAuthContextValue()
  const { setToken, token } = authContextValue
  
  return (
    <AuthContext.Provider value={authContextValue}>
      <PusherContext.Provider value={PUSHER_CONTEXT}>
        <AppBackground className="App">
          <Router>
            <Header>
              <Nav 
                setToken={setToken}
                isLoggedIn={token}
              />
            </Header>
            <Main />
          </Router>
        </AppBackground>
      </PusherContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
