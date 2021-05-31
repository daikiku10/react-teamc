import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser, } from '../actions/index';
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
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        dispatch(loginUser(user))
      } else {
        dispatch(logoutUser())
      }
    })
  },[])

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