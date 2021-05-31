import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { cartSet, setTopping, setItem, deleteItem, deleteTopping, cartReset, orderReset, deleteCart,userInfoSet,userInfoReset  } from '../actions/index';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box, Typography, List, ListItemText} from '@material-ui/core';
import Order from '../components/Order'
import {useHistory} from "react-router-dom" 

const userSelector = state => state.user.user
const itemsSelector = state => state.item.items
const cartSelector = state => state.cart.cart
const toppingsSelector = state => state.topping.toppings
const ordersSelector = state => state.cart.orders

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


const CartItem = () => {
  const user = useSelector(userSelector)
  const items = useSelector(itemsSelector)
  const toppings = useSelector(toppingsSelector)
  const cart = useSelector(cartSelector)
  const orders = useSelector(ordersSelector)
  const classes = useStyles();
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0)
  const [toppingPrice, setToppingPrice] = useState(0)

  // アイテム・トッピングを持ってくる
  useEffect(() => {
    dispatch(setItem())
    dispatch(setTopping())
    return () => {
      dispatch(deleteItem())
      dispatch(deleteTopping())
      if(user){
        dispatch(cartReset())
        dispatch(orderReset())
        dispatch(userInfoReset())
      }
    }
  },[])
  
  // カートの中身を持ってくる
  useEffect(() => {
    if(user){
      dispatch(cartSet(user))
      dispatch(userInfoSet(user))
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

  const deleteCartBtn = (index) => {
    let copyCart = cart
    copyCart.itemInfo.splice(index,1)
    dispatch(deleteCart(user,copyCart))
  }

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" color="inherit" noWrap>
          ショッピングカート
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>商品名</StyledTableCell>
                <StyledTableCell align="center">サイズ、価格、数量</StyledTableCell>
                <StyledTableCell align="center">トッピング価格</StyledTableCell>
                <StyledTableCell align="center">小計</StyledTableCell>
                <StyledTableCell align="center">削除</StyledTableCell>
              </TableRow>
            </TableHead>
            
              {cart !== "" ? (
                <TableBody>
                {cart.itemInfo.map((data, index) => (
                      <StyledTableRow>
                        {items.filter((item) => {
                          return data.itemId === item.id
                        }).map((item) => (
                          <>
                            <StyledTableCell component="th" scope="row">
                              <Typography><img src={item.imagePath} width="200" height="200"></img></Typography>
                              <Typography align="center">{item.name}</Typography>
                            </StyledTableCell> 
                            <StyledTableCell align="center">
                              { data.size === "M" ? <Typography>{item.priceM}円、{data.buyNum}杯</Typography> : <Typography>{item.priceL}円、{data.buyNum}杯</Typography> }
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {data.toppings.map((topping) => (
                                <List key={data.id}>
                                  {toppings.filter((top) => {
                                    return topping.id === top.id
                                  }).map((to) => (
                                      <ListItemText>{to.name} : {to.price}円</ListItemText>
                                  ))}
                                </List>
                              ))}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {data.size==="M"? (item.priceM * data.buyNum) : item.priceL * data.buyNum}
                            </StyledTableCell>
                            <StyledTableCell align="center"><Button onClick={() => deleteCartBtn(index)}>削除</Button></StyledTableCell>
                          </>
                        ))
                      }
                      </StyledTableRow>
                      
                      ))} 
                </TableBody>
                ) : (
                    <Typography>カート商品がありません！</Typography>
                )
              }  
            
          </Table>
          <Typography>消費税：{Math.floor((price + toppingPrice) * 0.1 / 1.1)}円</Typography>
          <Typography>合計金額：{price + toppingPrice}円</Typography>
        </TableContainer>
      </Container>
      <Box mt={3} textAlign="center">
        {cart? 
        <Button variant="contained" style = {{width: 300}} color="secondary" onClick={() => {showOrderComponent()}}>{show? "閉じる" : "注文に進む"}</Button>
        : <Button variant="contained" style = {{width: 300}} color="secondary" onClick={() => {handleLink("/")}}>商品一覧に戻る</Button>}
        </Box>
        {show? <Order/> : <></>}
  </>
)
}

export default CartItem

// <Box mt={3} textAlign="center">
// {cart? 
// <Button variant="contained" style = {{width: 300}} color="secondary" onClick={() => {showOrderComponent()}}>{show? "閉じる" : "注文に進む"}</Button>
// : <Button variant="contained" style = {{width: 300}} color="secondary" onClick={() => {handleLink("/")}}>商品一覧に戻る</Button>}
// </Box>
// <>
// {show? <Order/> : <></>}
// </>
// </>
// )
// }