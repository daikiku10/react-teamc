import React, {useEffect} from "react";
import {CART_STATUS_UNPAID, CART_STATUS_PAID, CART_STATUS_UNDELIVERIED, CART_STATUS_DELIVERIDE, CART_STATUS_CANCEL} from '../actions/status';
import {useSelector, useDispatch} from 'react-redux'
import {orderSet, setItem, setTopping, deleteItem, deleteTopping, cartReset, orderReset, orderCancel} from "../actions"
import {List, Divider, ListItem, ListItemAvatar, ListItemText, Button, Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const userSelector = state => state.user.user
const ordersSelector = state => state.cart.orders
const itemsSelector = state => state.item.items
const toppingsSelector = state => state.topping.toppings

const useStyles = makeStyles((theme) => ({
  orderList: {
    background: theme.palette.grey["100"],
    margin: '0 auto',
    padding: 32,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 768
    }
  },
  list: {
    background: '#fff',
    height: 'auto'
  },
  image: {
    objectFit: 'cover',
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96
  },
  text: {
    width: '100%'
  },
  title: {
    flexGrow: 1,
  }
}))

const OrderHistory = () => {
  const classes = useStyles()
  const user = useSelector(userSelector)
  const items = useSelector(itemsSelector)
  const orders = useSelector(ordersSelector)
  const toppings = useSelector(toppingsSelector)
  const dispatch = useDispatch()

  // アイテム・トッピングを持ってくる　
  useEffect(() => {
    dispatch(setItem())
    dispatch(setTopping())
    return () => {
      dispatch(deleteItem())
      dispatch(deleteTopping())
      dispatch(cartReset())
      dispatch(orderReset())
    }
  },[])

  useEffect(() => {
    if(user){
      dispatch(orderSet(user))
    }
  },[user])

  const CancelBtn = (order) => {
    order.status = CART_STATUS_CANCEL
    dispatch(orderCancel(user,order))
  }
  const orders1 = orders.length
  return (
    <React.Fragment>
      <h1 align="center">注文履歴</h1>
      { orders1 > 0 ? (
        <section className="c-section-wrapin">
          {orders.filter((order) => {
            return order.status === CART_STATUS_UNPAID
          }).map((order) => (
          // {orders.map((order,index) => (
            <List className={classes.orderList} key={order.orderId}>
              <div className="module-spacer--small" />
            <div>注文日時：{order.orderDate}</div>
            {order.itemInfo.map((data, index) => (
              <List key={index}>
                {items.filter((item) => {
                  return data.itemId === item.id
                }).map((item) => (
                  <ListItem className={classes.list} key={index}>
                    <ListItemAvatar>
                      <img src={`/${item.imagePath}`} width="200" height="200" style={{objectFit: "cover"}}></img>
                    </ListItemAvatar>
                    <div className={classes.text} />
                    <div className={classes.text}>
                    <ListItemText primary={item.name} />
                    { data.size === "M" ? <ListItemText secondary={"サイズ：M　単価：" + item.priceM + "円"}/> : <ListItemText secondary={"サイズ：L　単価：" + item.priceL + "円"}/>}
                    <ListItemText secondary={"数量：" + data.buyNum + "杯"}/>
                      {data.toppings.map((topping, ind) => (
                        <div key={ind}>
                          {toppings.filter((top) => {
                            return topping.id === top.id
                            }).map((to) => (
                              <div key={ind}>
                                <ListItemText 
                                  secondary={to.name + ' ' +"単価" +  "：" + to.price + "円"}></ListItemText>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </ListItem>
                ))}
              </List>
            ))}
            <div className="module-spacer--extra-extra-small" />
            <Grid container justify="flex-end">
            <Button variant="outlined" onClick={() => CancelBtn(order)}>キャンセル</Button>
            {/* {order.status === CART_STATUS_CANCEL ? <span>キャンセル済み</span> : <Button variant="outlined" onClick={() => CancelBtn(order)}>キャンセル</Button>} */}
            </Grid>
            <p></p>
            <Divider />
            </List>
          ))}
          {orders.filter((order) => {
            return order.status === CART_STATUS_PAID
          }).map((order) => (
            <List className={classes.orderList} key={order.orderId}>
              <div className="module-spacer--small" />
            <div>注文日時：{order.orderDate}</div>
            {order.itemInfo.map((data, index) => (
              <List key={index}>
                {items.filter((item) => {
                  return data.itemId === item.id
                }).map((item) => (
                  <ListItem className={classes.list} key={index}>
                  <ListItemAvatar>
                  <img src={`/${item.imagePath}`} width="200" height="200" style={{objectFit: "cover"}}></img>
                  </ListItemAvatar>
                  <div className={classes.text} />
                  <div className={classes.text}>
                  <ListItemText primary={item.name} />
                    { data.size === "M" ? <ListItemText secondary={"サイズ：M　単価：" + item.priceM + "円"}/> : <ListItemText secondary={"サイズ：L　単価：" + item.priceL + "円"}/>}
                    <ListItemText secondary={"数量：" + data.buyNum + "杯"}/>
                    {data.toppings.map((topping, ind) => (
                      <div key={ind}>
                        {toppings.filter((top) => {
                          return topping.id === top.id
                        }).map((to) => (
                          <div key={ind}>
                            <ListItemText 
                            secondary={to.name + "単価" + " " +"：" + to.price + "円"}></ListItemText>
                          </div>
                        ))}
                      </div>
                    ))}
                    </div>
                  </ListItem>
                ))}
              </List>
            ))}
            <div className="module-spacer--extra-extra-small" />
            <Grid container justify="flex-end">
            <Button variant="outlined" onClick={() => CancelBtn(order)}>キャンセル</Button>
            </Grid>
            <p></p>
            <Divider />
            </List>
          ))}
          {orders.filter((order) => {
            return order.status === CART_STATUS_CANCEL
          }).map((order) => (
            <List className={classes.orderList} key={order.orderId}>
              <div className="module-spacer--small" />
            <div>注文日時：{order.orderDate}</div>
            {order.itemInfo.map((data, index) => (
              <List key={index}>
                {items.filter((item) => {
                  return data.itemId === item.id
                }).map((item) => (
                  <ListItem className={classes.list} key={index}>
                  <ListItemAvatar>
                  <img src={`/${item.imagePath}`} width="200" height="200" style={{objectFit: "cover"}}></img>
                  </ListItemAvatar>
                  <div className={classes.text} />
                  <div className={classes.text}>
                  <ListItemText primary={item.name} />
                    { data.size === "M" ? <ListItemText secondary={"サイズ：M　単価：" + item.priceM + "円"}/> : <ListItemText secondary={"サイズ：L　単価：" + item.priceL + "円"}/>}
                    <ListItemText secondary={"数量：" + data.buyNum + "杯"}/>
                    {data.toppings.map((topping, ind) => (
                      <div key={ind}>
                        {toppings.filter((top) => {
                          return topping.id === top.id
                        }).map((to) => (
                          <div key={ind}>
                            <ListItemText 
                            secondary={to.name + "単価" + ' ' +"：" + to.price + "円"}></ListItemText>
                          </div>
                        ))}
                      </div>
                    ))}
                    </div>
                  </ListItem>
                ))}
              </List>
            ))}
            <div className="module-spacer--extra-extra-small" />
            <Grid container justify="flex-end">
            <span>キャンセル済み</span>
            </Grid>
            <p></p>
            <Divider />
            </List>
          ))}
        </section>
  ):(
    <p align="center">注文履歴がありません</p>
  )}
    </React.Fragment>
  )
}

export default OrderHistory