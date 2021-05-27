import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser, setItem, setTopping } from '../actions/index';
import firebase from 'firebase';
import Header from './Header';
import Home from './Home';
import CartItem from './CartItem';
import OrderHistory from './OrderHistory';
import OrderComplete from './OrderComplete';
import ItemDetail from './ItemDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    firebase.firestore().collection('items').get().then(snapshot => {
      snapshot.forEach(item => {
        dispatch(setItem(item.data()))
      })
    })
    firebase.firestore().collection('toppings').get().then(snapshot => {
      snapshot.forEach(topping => {
        dispatch(setTopping(topping.data()))
      })
    })
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if(user){
        dispatch(loginUser(user))
      } else {
        dispatch(logoutUser(user))
      }
    })
  })

  return(
    <>
    <Router>
      <Header />
      <Switch>
        <Route path='/order-history' component={OrderHistory} />
        <Route path='/cart-item' component={CartItem} />
        <Route path='/order-complete' component={OrderComplete} />
        <Route path='/item-detail/:item_id' component={ItemDetail} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
    </>

  )
}
export default App;
