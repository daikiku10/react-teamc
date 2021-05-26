import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';

  var firebaseConfig = {
    apiKey: "AIzaSyAq2zCA7CEytSSHitZHNXZVNE6YBTrN2pU",
    authDomain: "react-teamc.firebaseapp.com",
    projectId: "react-teamc",
    storageBucket: "react-teamc.appspot.com",
    messagingSenderId: "583769992858",
    appId: "1:583769992858:web:b3d184fcda55c6dd43b923",
    measurementId: "G-2P5BS2YLRP"
  };
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  // firebase.firestore();

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
