import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { cartSet, setTopping, setItem, deleteItem, deleteTopping } from '../actions/index';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box} from '@material-ui/core';
import { CART_STATUS_IN } from '../actions/status'
import Order from '../components/Order'
import {useHistory} from "react-router-dom" 

const userSelector = state => state.user.user
const itemsSelector = state => state.item.items
const cartSelector = state => state.cart.cart
const toppingsSelector = state => state.topping.toppings

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [carts, setCarts] = useState({
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
  useEffect(() => {
    if(user){
      firebase.firestore().collection(`users/${user.uid}/orders`).get().then(snapshot => {
        snapshot.forEach(item => {
          const data = item.data()
          if(data.status === CART_STATUS_IN){
            dispatch(cartSet(data))
          }
        })
      })
    }
    dispatch(setItem())
    dispatch(setTopping())
    return () => {
      dispatch(deleteItem())
      dispatch(deleteTopping())
    }
  },[])
  
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

  const addCart = () => {
    if(user){
      if(cart === ""){
        firebase.firestore().collection(`users/${user.uid}/orders`).add(carts).then(doc => {
          carts.orderId = doc.id
          dispatch(cartSet(carts))
        })
      }else {
        const copyCart = cart
        let test = [...copyCart.itemInfo, carts.itemInfo[0]]
        let a = {
          orderId:cart.orderId,
          status:CART_STATUS_IN,
          itemInfo:test
        }
        firebase.firestore().collection(`users/${user.uid}/orders`).doc(cart.orderId).update(a).then(() => {
          dispatch(cartSet(a))
        })
      }
    }
  }
  return (
    <>
      <Container maxWidth="md">
        <h1>ショップカート</h1>
        <Button onClick={addCart}>カートへ入れる</Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>商品名</StyledTableCell>
                <StyledTableCell align="center">サイズ、価格（税抜き）、数量</StyledTableCell>
                <StyledTableCell align="center">トッピング価格（税抜き）、数量</StyledTableCell>
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
                        })
                        .map((item) => (
                          <>
                            <StyledTableCell component="th" scope="row">
                              {item.name}
                            </StyledTableCell> 
                            <StyledTableCell align="center">{item.priceM}</StyledTableCell>
                            <StyledTableCell align="center">トッピング価格</StyledTableCell>
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