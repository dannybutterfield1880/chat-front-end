import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// let string = .substring(1).split('=')[1]
// console.log(string)
// import * as pi from 'pi-network-sdk';
// console.log(window);

/** PiNetworkInstance instance */
// const instance = pi.PiNetworkClient;

// connect();


// async function connect() {
//   console.log('trying to authenticate')
//   try {
//     const user = await instance.Authenticate();
//     console.log(user)

//   } catch (err) {
//     console.log(err);
//   }
  
//   //var parsedData = JSON.parse(decodeURIComponent(string));
// }
//console.log(parsedData)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
