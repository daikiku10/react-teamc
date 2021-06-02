import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { cartSet, setTopping, setItem, deleteItem, deleteTopping, cartReset, orderReset, deleteCart,userInfoSet,userInfoReset  } from '../actions/index';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box, Typography, List, ListItemText, IconButton} from '@material-ui/core';
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
  
  const deleteCartBtn = (index) => {
    let copyCart = cart
    copyCart.itemInfo.splice(index,1)
    dispatch(deleteCart(user,copyCart))
  }
  // 商品合計金額
  useEffect(() => {
    let price = 0
    if(cart !== ""){
      cart.itemInfo.map(data => (
        items.filter(noodle => { return data.itemId === noodle.id 
        }).map(item => (
          (data.size === "M" ? price += item.priceM * data.buyNum : price += item.priceL * data.buyNum)
        ))
      ))
    }
    setPrice(price)
  },[cart,deleteCartBtn])
  // トッピング合計金額
  useEffect(() => {
    let toppingPr = 0
    if(cart !== ""){
      cart.itemInfo.map(data => (
        data.toppings.map(topping => (
          toppings.filter(top => {return topping.id === top.id
          }).map(to => (
            toppingPr += to.price * data.buyNum
          ))
        ))
      ))
    }
    setToppingPrice(toppingPr)
  },[cart,deleteCartBtn])
  
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


  return (
    <>
      <Container maxWidth="md">
        <Box mt={3} mb={3}>
          <Typography variant="h4" color="inherit" noWrap align="center">
            ショッピングカート
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead >
              <TableRow >
                <StyledTableCell align="center">商品名</StyledTableCell>
                <StyledTableCell align="center">サイズ、価格、数量</StyledTableCell>
                <StyledTableCell align="center">トッピング価格</StyledTableCell>
                <StyledTableCell align="center">小計</StyledTableCell>
                <StyledTableCell align="center">削除</StyledTableCell>
              </TableRow>
            </TableHead>
            
              {cart !== "" ? (
                <TableBody>
                {cart.itemInfo.map((data, index) => (
                      <StyledTableRow key={index}>
                        {items.filter((item) => {
                          return data.itemId === item.id
                        }).map((item) => (
                          <React.Fragment key={index}>
                            <StyledTableCell component="th" scope="row">
                              <Typography><img src={item.imagePath} width="200" height="200" style={{objectFit: "cover"}}></img></Typography>
                              <Typography align="center">{item.name}</Typography>
                            </StyledTableCell> 
                            <StyledTableCell align="center">
                              { data.size === "M" ? <Typography>{item.priceM}円、{data.buyNum}杯</Typography> : <Typography>{item.priceL}円、{data.buyNum}杯</Typography> }
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {data.toppings.map((topping, ind) => (
                                <List key={ind}>
                                  {toppings.filter((top) => {
                                    return topping.id === top.id
                                  }).map((to) => (
                                      <ListItemText key={ind}>{to.name} : {to.price}円、{data.buyNum}個</ListItemText>
                                  ))}
                                </List>
                              ))}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>【ﾗｰﾒﾝ】</Typography>
                              <Typography>{data.size==="M"? (item.priceM * data.buyNum ) : item.priceL * data.buyNum}円</Typography>
                              <Typography>【ﾄｯﾋﾟﾝｸﾞ】</Typography>
                              {data.toppings.map((topping, ind) => (
                                <React.Fragment key={ind}>
                                  {toppings.filter((top) => {
                                    return topping.id === top.id
                                  }).map((to) => (
                                    <Typography key={ind}>{to.price * data.buyNum}円</Typography>
                                  ))}
                                </React.Fragment>
                              ))}
                            </StyledTableCell>
                            <StyledTableCell align="center"><Button onClick={() => deleteCartBtn(index)} style={{ color: "#fff", backgroundColor: "#CF000D"}}>削除</Button></StyledTableCell>
                          </React.Fragment>
                        ))
                      }
                      </StyledTableRow>
                      
                      ))} 
                </TableBody>
                ) : (
                 <TableBody>
                   <StyledTableRow>
                    <StyledTableCell>カート商品がありません！</StyledTableCell>
                   </StyledTableRow>
                 </TableBody>
                )
              }  
          </Table>
            
          {cart !== "" ? 
          <>
            {cart.itemInfo.length == 0 ? <Typography>カート商品がありません！</Typography> :
            <>
            <Box mt={2} mb={2}>
              <Typography variant="h5" align="center">消費税：{Math.floor((price + toppingPrice) * 0.1 / 1.1)}円</Typography>
              <Typography variant="h5" align="center">合計金額：{price + toppingPrice}円</Typography>
            </Box>

            </>
            }
          </>:<></>
          }
        </TableContainer>
      </Container>
      <Box mt={3} textAlign="center">
        {cart ?
        <>
          {cart.itemInfo.length===0? 
            <Button variant="contained" style = {{width: 300, color: "#fff", backgroundColor: "#CF000D"}} color="secondary" onClick={() => {handleLink("/")}}>商品一覧に戻る</Button>
            :
            <>
            <Button variant="contained" style = {{width: 300, color: "#fff", backgroundColor: "#CF000D"}} color="secondary" onClick={() => {showOrderComponent()}}>{show? "閉じる" : "注文に進む"}</Button>
            {show? <Order/> : <></>}
            </>
          }
        </>
        : 
          <Button variant="contained" style = {{width: 300, color: "#fff", backgroundColor: "#CF000D"}} color="secondary" onClick={() => {handleLink("/")}}>商品一覧に戻る</Button>
        }
        </Box>
    </>
  )
}

export default CartItem
