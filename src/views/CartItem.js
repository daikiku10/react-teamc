import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { cartSet, setTopping, setItem, deleteItem, deleteTopping, newCart, addCart, order, orderSet } from '../actions/index';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box, Typography, List, ListItemText} from '@material-ui/core';
import { CART_STATUS_IN } from '../actions/status'
import Order from '../components/Order'
import {useHistory} from "react-router-dom" 

const userSelector = state => state.user.user
const itemsSelector = state => state.item.items
const cartSelector = state => state.cart.cart
const toppingsSelector = state => state.topping.toppings
const ordersSelector = state => state.cart.orders

// ---------------------------------------------
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
// -----------------------------------------------

const CartItem = () => {
  const user = useSelector(userSelector)
  const items = useSelector(itemsSelector)
  const toppings = useSelector(toppingsSelector)
  const cart = useSelector(cartSelector)
  const orders = useSelector(ordersSelector)
  // console.log(orders)
  const classes = useStyles();
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0)
  const [toppingPrice, setToppingPrice] = useState(0)
  const [carts, setCarts] = useState({
    itemId:new Date().getTime().toString(),
    status:0,
    itemInfo:[
      { itemId:2,
        buyNum:3,
        size:"M",
        toppings:[
          {id:3},
          {id:4}
        ]
      }
    ]
  })

  // アイテム・トッピングを持ってくる　
  useEffect(() => {
    dispatch(setItem())
    dispatch(setTopping())
    return () => {
      dispatch(deleteItem())
      dispatch(deleteTopping())
    }
  },[])

  // カートの中身を持ってくる
  useEffect(() => {
    if(user){
      dispatch(cartSet(user))
    }
  },[user])

  // 商品合計金額
  useEffect(() => {
    let price = 0
    if(cart !== ""){
      cart.itemInfo.map(data => (
        items.filter(noodle => { return data.itemId === noodle.id 
        }).map(item => (
          (data.size === "M" ? price += item.priceM : price += item.priceL)
        ))
      ))
    }
    setPrice(price)
  },[cart])
  // トッピング合計金額
  useEffect(() => {
    let toppingPr = 0
    if(cart !== ""){
      cart.itemInfo.map(data => (
        data.toppings.map(topping => (
          toppings.filter(top => {return topping.id === top.id
          }).map(to => (
            toppingPr += to.price
          ))
        ))
      ))
    }
    setToppingPrice(toppingPr)
  },[cart])
  
  const history = useHistory()
  const handleLink = path => history.push(path)
  const login = () => {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(google_auth_provider);
    handleLink("/cart-item");
  };

  const [show, setShow] = useState(false)
  const showOrderComponent = () =>{
    if(user){
      setShow(!show)
    }else{
      login()
    }
  }

  // 「カートに入れる」ボタンを押したとき※商品詳細で使う
  const cartInfo = () => {
    if(user){
      if(cart === ""){
        dispatch(newCart(user, carts))
      }else {
        const copyCart = cart
        let test = [...copyCart.itemInfo, carts.itemInfo[0]]
        let a = {
          itemId: cart.itemId,
          orderId:cart.orderId,
          status:CART_STATUS_IN,
          itemInfo:test
        }
        dispatch(addCart(user, a))
      }
    }
  }
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" color="inherit" noWrap>
          ショッピングカート
        </Typography>
        <Button onClick={cartInfo}>カートへ入れる</Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>商品名</StyledTableCell>
                <StyledTableCell align="center">サイズ、価格（税抜き）、数量</StyledTableCell>
                <StyledTableCell align="center">トッピング価格（税抜き）</StyledTableCell>
                <StyledTableCell align="center">小計</StyledTableCell>
                <StyledTableCell align="center">削除</StyledTableCell>
              </TableRow>
            </TableHead>
            <>
              {cart !== "" ? (
                <TableBody>
                {cart.itemInfo.map((data, index) => (
                      <StyledTableRow key={index}>
                        {items.filter((item) => {
                          return data.itemId === item.id
                        }).map((item) => (
                          <>
                            <StyledTableCell component="th" scope="row">
                              <Typography>{item.name}</Typography>
                              <div><img src={item.imagePath} width="200" height="200"></img></div>
                            </StyledTableCell> 
                            <StyledTableCell align="center">
                              { data.size === "M" ? <Typography>{item.priceM}円、{data.buyNum}杯</Typography> : <>{item.priceL}円、{data.buyNum}杯</> }
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {data.toppings.map((topping, ind) => (
                                <List key={ind}>
                                  {toppings.filter((top) => {
                                    return topping.id === top.id
                                  }).map((to, i) => (
                                    <>
                                      <ListItemText key={i}>{to.name},{to.price}円</ListItemText>
                                    </>
                                  ))}
                                </List>
                              ))}
                            </StyledTableCell>
                            <StyledTableCell align="center">{item.priceM}+トッピング価格</StyledTableCell>
                            <StyledTableCell align="center"><Button>削除</Button></StyledTableCell>
                          </>
                        ))
                      }
                      </StyledTableRow>
                      
                      ))} 
                </TableBody>
                ) : (
                  <>
                    <h2>カート商品がありません！</h2>
                  </>
                )
              }  
            </>
          </Table>
          <h2>消費税：{Math.floor((price + toppingPrice) * 0.1 / 1.1)}円</h2>
          <h2>合計金額：{price + toppingPrice}円</h2>
        </TableContainer>
      </Container>
      <Box mt={3} textAlign="center">
        <Button variant="contained" style = {{width: 300}} color="secondary" onClick={() => {showOrderComponent()}}>{show? "閉じる" : "注文に進む"}</Button>
      </Box>
      <>
      {show? <Order/> : <></>}
      </>
    </>
  )
}

export default CartItem