import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import "firebase/analytics";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";

const store = createStore(reducer, applyMiddleware(thunk));

var firebaseConfig = {
  apiKey: "AIzaSyAuG9FY3igNI5dEYRz_dpFk6ijDtT5FSS0",
  authDomain: "react-teamc-sab.firebaseapp.com",
  projectId: "react-teamc-sab",
  storageBucket: "react-teamc-sab.appspot.com",
  messagingSenderId: "336882735805",
  appId: "1:336882735805:web:86f19613fff383c6f2f5d4",
  measurementId: "G-W22T1T2YQ3"
};

// var firebaseConfig = {
//   apiKey: "AIzaSyAq2zCA7CEytSSHitZHNXZVNE6YBTrN2pU",
//   authDomain: "react-teamc.firebaseapp.com",
//   projectId: "react-teamc",
//   storageBucket: "react-teamc.appspot.com",
//   messagingSenderId: "583769992858",
//   appId: "1:583769992858:web:b3d184fcda55c6dd43b923",
//   measurementId: "G-2P5BS2YLRP",
// };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
