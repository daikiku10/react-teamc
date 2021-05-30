import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { setItem, deleteItem, setTopping, deleteTopping, newCart, addCart, cartSet } from '../actions/index';
import { CART_STATUS_IN } from '../actions/status';

const userSelector = state => state.user.user
const cartSelector = state => state.cart.cart

const ItemDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItem());
    dispatch(setTopping());
      return () => {
        dispatch(deleteItem());
        dispatch(deleteTopping());
      };
  }, []);

  //個数
  const itemsSelector = (state) => state.item.items;
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  const items = useSelector(itemsSelector);
  const { item_id } = useParams();
  const itemIdNum = Number(item_id);
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const [buyNum,setNum] = useState(1)
  const handleChangebuyNum = (e) => {
    setNum(e.target.value)
  }
  const buyNum2 = Number(buyNum)
  
  // カートの中身を持ってくる
  useEffect(() => {
    if(user){
      dispatch(cartSet(user))
    }
  },[user])

 //トッピング
  const toppingsSelector = (state) => state.topping.toppings;
  const allToppings = useSelector(toppingsSelector);
  const [toppings, setToppings] = useState([])

  const handleChangeTopping = (e) => {
    if (e.target.checked) {
      let selectTopping = [...toppings, {id: Number(e.target.value)}]
      setToppings(selectTopping)

    } else if (!e.target.checked) {
      let selectTopping = toppings.filter(value => value !== e.target.value)
      setToppings(selectTopping)
    }
  }
  console.log(toppings)

  //サイズ
  const [size,setSize] = useState('M')
  const addCartBtn = () => {
    const item = {
      id: new Date().getTime().toString(),
      status: 0,
      itemInfo: [{
        itemId: itemIdNum,
        buyNum: buyNum2,
        size: size,
        toppings:toppings
      }]
    }
    console.log(item)
    if(user){
      if(cart === ""){
        dispatch(newCart(user, item))
        handleLink('/cart-item')
      }else{
        const copyCart = cart
        let info = [...copyCart.itemInfo, item.itemInfo[0]]
        let data = {
          id:cart.id,
          orderId:cart.orderId,
          status:CART_STATUS_IN,
          itemInfo:info
        }
        dispatch(addCart(user, data))
        handleLink('/cart-item')
      }
    }
  }
  return (
    <React.Fragment>
      <h2 justify='center'>商品詳細</h2>
        {items.filter((item) => {return item.id === itemIdNum;}).map((item) => (
      <div>
        <Grid container justify='center'>
              <Grid item xs={4} sm={5} >
                <div text-align='center'><img src={`/${item.imagePath}`} style={{ width: 400, height: 300 }}></img></div>
              </Grid>
              <Grid item xs={4} sm={5}>
                <h3>{item.name}</h3> <br />
                <br />
                <p>{item.description}</p>
              </Grid>
        </Grid>
        <Grid container justify='center' >
          <form>
          <p style={{ fontWeight:'bold' }}>サイズ </p>
              <label className='radio-inline'>
                <input type='radio' name='responsibleCompany' value='M' onChange={() => {setSize('M')}} checked={size === 'M'}/>
                <span className='price'>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{item.priceM}円(税抜)
              </label>
              <label className='radio-inline'>
                <input type='radio' name='responsibleCompany' checked={size === 'L'} onChange={() =>  {setSize('L')}}/>
                <span className='price'>&nbsp;Ｌ</span>&nbsp;&nbsp;{item.priceL}円(税抜)
              </label><br />
            <span style={{ fontWeight: 'bold' }}>数量：</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>数量を選択してください</span><br/>
              <TextField
                id='outlined-number'
                type='number'
                defaultValue='1'
                value={buyNum}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                onChange={handleChangebuyNum}
                />
            <label htmlFor='topping'>
                <p style={{ fontWeight: 'bold' }}>トッピング ※1ヶにつき　少なめ200円、普通量300円（税抜）</p>
            </label>
            <ul>
              {allToppings.map((topping, index) => (
                <li key={index}>
                  <label>{topping.name}:　<input type='checkbox' name='topping' value={topping.id} onChange={handleChangeTopping}/></label>
                </li>
              ))}
            </ul>
            <h2>ご注文金額合計：*個数+トッピング価格　円(税抜)</h2>
                <Button onClick={addCartBtn} variant='contained' color='primary' dark='true'>
              カートに入れる
            </Button>
          </form>
        </Grid>
      </div>
        ))}
    </React.Fragment>
  )
}
export default ItemDetail
