import React from 'react';
import Header from './Header';
import Home from './Home';
import CartItem from './CartItem';
import OrderHistory from './OrderHistory';
import { BrowserRouter as Router, Switch, Route,} from 'react-router-dom';

const App = () => {
  return(
    <>
    <Router>
      <Header />
      <Switch>
        <Route path='/order-history' component={OrderHistory} />
        <Route path='/cart-item' component={CartItem} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
    </>

  )
}
export default App;
