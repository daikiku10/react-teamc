import React, {useEffect} from "react";
import {useHistory, BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
// import Home from './Home';
// import {useDispatch} from 'react-redux';
// import firebase from 'firebase';
// import {CART_STATUS_UNPAID, CART_STATUS_PAID} from '../actions/status';
import {Container, Button, ListItem,} from '@material-ui/core';
// import List from "@material-ui/core/List";
// import {makeStyles} from "@material-ui/core/styles";
// import Divider from "@material-ui/core/Divider";
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const OrderComplete = () => {
  // const classes = useStyles()
  const history = useHistory();
  const handleLink = path => history.push(path);
  
  return(
      <Router>
        <Container maxWidth="sm" textAlign="center">
      <h2>決済が完了しました！</h2>
      <p>この度はご注文ありがとうございます。</p>
      <p>お支払い先は、お送りしたメールに記載してありますのでご確認ください。</p>
      <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
      <Button variant="outlined" style={{ color: "#fff", backgroundColor: "#CF000D"}} onClick={() => handleLink('/')}>
      トップ画面に戻る
      </Button>
      {/* <Button variant="outlined" color="secondary">
        <Link to="/">
      トップ画面に戻る
      </Link>
      </Button> */}
      </Container>
          {/* {orders.map((order,index) => (
          <div key={index}>
            <List>
              <ListItem>
          <ListItemText primary={"注文日時：" + order.orderdate}></ListItemText>
          
          <ListItemText primary={"お支払い金額：" + order.totalprice}></ListItemText>
          </ListItem>
          
          {order.items.map((item,index) => (
              <div key={index}>
                <ListItem>
              <ListItemText primary={"商品ID：" + item.id}></ListItemText>
              
              <ListItemText primary={"数量：" + item.buynum}></ListItemText>
              
              {item.topping.map((topping,index) => (
                <div key={index}>
                  <ListItemText primary={"トッピングID：" + topping.id}></ListItemText>
                </div>
              ))}
              </ListItem>
              </div>
          ))}
          </List>
          </div>
      ))} */}
      {/* <section className="c-section-wrapin">
      <List className={classes.orderList}>
      {orders.map((order,index) => (
          <div key={index} className="module-spacer--small">
      <ListItemText primary={"注文日時：" + order.orderdate}></ListItemText>
      <p>お支払い金額：{order.totalprice}</p>
      {order.items.map((item,index) => {
        
        <ListItem key={index} className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src='../pulic/1.jpg'></img>
        </ListItemAvatar>
        <div className={classes.text}>
        <ListItemText
                primary={"商品名"}
                secondary={"サイズ：" + item.size}
              >商品名</ListItemText>
        <ListItemText
                primary={"数量：" + item.buynum}
              />
        </div>
        </ListItem>
        
      })}
      
      </div>))}
      </List>
    </section> */}
    {/* <Switch>
      <Redirect to="/" component={Home}></Redirect>
    </Switch> */}
      </Router>
  )
}

export default OrderComplete