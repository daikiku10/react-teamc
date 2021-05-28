import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { cartSet, setTopping, setItem, deleteItem, deleteTopping } from '../actions/index';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box} from '@material-ui/core';
import { CART_STATUS_IN } from '../actions/status'
import Order from '../components/Order'

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
  // console.log(cart.itemInfo)
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
    dispatch(setItem())
    dispatch(setTopping())
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
    return () => {
      dispatch(deleteItem())
      dispatch(deleteTopping())
    }
  },[])
  
  const [show, setShow] = useState(false)
  const showOrderComponent = () =>{
    setShow(true)
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
            <TableBody>
              {items.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.priceM}</StyledTableCell>
                  <StyledTableCell align="center">{item.description}</StyledTableCell>
                  <StyledTableCell align="center">{item.imagePath}</StyledTableCell>
                  <StyledTableCell align="center">{item.priceL}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
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