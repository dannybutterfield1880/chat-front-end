import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import { Fragment } from 'react';
import ChatHome from '../pages/ChatHome'
import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Contacts from '../pages/Contacts'

import Wrapper from './Wrapper'
import Register from "../pages/Register";

const Main = () => (
    <Wrapper>
        <Switch>
        <Route exact path={"/chat/:id"}>
            <Chat />
        </Route>
        <Route exact path={"/contacts"}>
            <Contacts />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/">
            <ChatHome />
        </Route>
        </Switch>
    </Wrapper>
)

export default Main;