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
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import { useSelector} from "react-redux";
import {Box} from '@material-ui/core';


const Undefine = () => {
  return <div>
    <Box textAlign="center" mt={20}>
    <h1>Not Found</h1>
    <h2>お探しのページが見つかりませんでした。<br></br>URLをご確認の上、再度お試しいただくか、<br></br>上下のナビゲーションより既存ページへアクセスしてください。</h2>
    <Link to="/">トップページに戻る</Link>
    </Box>
  </div>
}

const userSelector = (state) => state.user.user;
const App = () => {
  const user = useSelector(userSelector);
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
      <Header/>
        {user? 
        <>
      <Switch>
        <Route path='/' component={Home} exact />
          <Route path='/item-detail/:item_id' component={ItemDetail} exact />
          <Route path='/cart-item' component={CartItem} exact />
          <Route path='/order-history' component={OrderHistory} exact />
          <Route path='/order-complete' component={OrderComplete} 
          exact />
          <Route><Undefine/></Route>
      </Switch>
        </>
        : 
        <> 
        <Switch>
          <Route path='/item-detail/:item_id' component={ItemDetail} exact/>
          <Route path='/cart-item' component={CartItem} exact/>
          <Route path='/' component={Home} exact />
          <Route><Undefine/></Route>
        </Switch>
        </>
        }
    </Router>
    </>
  )
}
export default App;