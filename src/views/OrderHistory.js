import React from "react";
import {CART_STATUS_UNPAID, CART_STATUS_PAID, CART_STATUS_UNDELIVERIED, CART_STATUS_DELIVERIDE, CART_STATUS_CANCEL} from '../actions/status';
import firebase from 'firebase';
import {useSelector, useDispatch} from 'react-redux'

const userSelector = state => state.user.user
const cartSelector = state => state.cart.cart

const OrderHistory = () => {
  const user = useSelector(userSelector)
  const cart = useSelector(cartSelector)
  const orders = [
    {status:1,orderdate:'2021-5-28',totalprice:1000,items:[{id:1,buynum:3,size:'M',topping:[{id:1,buynum:3},{id:3,buynum:2}]},
                                                {id:3,buynum:2,size:'L',topping:[{id:5,buynum:1}]}]},
    {status:9,orderdate:'2021-5-27',totalprice:2500,items:[{id:7,buynum:3,size:'M',topping:[{id:1,buynum:3},{id:3,buynum:2}]},
                                                {id:9,buynum:2,size:'L',topping:[{id:5,buynum:1}]}]}]
     
    function Orderhistory(){
      if(orders.length === 0){
        return <p>注文履歴がありません</p>
      }else if(orders.length > 0 ){
          return (
          // <React.Fragment>
          //   {orders.filter((order) => {
          //     return order.status === 1;
          //   }).map((order,index) => {
          //     <div key={index}>
          // <p>注文日時：{order.orderdate}</p>
          // <p>お支払い金額：{order.totalprice}</p>
          // {order.items.map((item,index) => (
          //     <div key={index}>
          //     <p>商品ID：{item.id}</p>
          //     <p>数量：{item.buynum}</p>
          //     {item.topping.map((topping,index) => (
          //       <div key={index}>
          //         <p>トッピングID：{topping.id}</p>
          //       </div>
          //     ))}
          //     </div>
          // ))}
          // <button>キャンセル</button>
          // </div>
          //   })}
          // </React.Fragment>
          // )}
          <React.Fragment>
          {orders.map((order,index) => (
          <div key={index}>
          <p>注文日時：{order.orderdate}</p>
          <p>お支払い金額：{order.totalprice}</p>
          <p>商品画像</p>
          
          {order.items.map((item,index) => (
              <div key={index}>
              <p>商品ID：{item.id}</p>
              <p>数量：{item.buynum}</p>
              {item.topping.map((topping,index) => (
                <div key={index}>
                  <p>トッピングID：{topping.id}</p>

                </div>
              ))}
              </div>
          ))}
          
          <button>キャンセル</button>
          </div>
      ))}
        </React.Fragment>
      )
      // else if(orders.length > 0 ){
        // console.log(orders[count])
    //     return <React.Fragment>
    //       {orders.map((order,index) => (
    //       <div key={index}>
    //       <p>注文日時：{order.orderdate}</p>
    //       <p>お支払い金額：{order.totalprice}</p>
    //       <p>商品画像</p>
          
    //       {order.items.map((item,index) => (
    //           <div key={index}>
    //           <p>商品ID：{item.id}</p>
    //           <p>数量：{item.buynum}</p>
    //           {item.topping.map((topping,index) => (
    //             <div key={index}>
    //               <p>トッピングID：{topping.id}</p>

    //             </div>
    //           ))}
    //           </div>
    //       ))}
    //       </div>
    //   ))}
    //     </React.Fragment>
      }
    }
    
  return (
    <React.Fragment>
      <h1>注文履歴</h1>
      <Orderhistory />
    </React.Fragment>
  )
}

export default OrderHistory