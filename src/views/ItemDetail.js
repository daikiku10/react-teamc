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

  
  const itemsSelector = (state) => state.item.items;
  const user = useSelector(userSelector);
  const cart = useSelector(cartSelector);
  const items = useSelector(itemsSelector);
  const { item_id } = useParams();
  const itemIdNum = Number(item_id);
  const history = useHistory();
  const handleLink = (path) => history.push(path);

  //個数
  const [buyNum,setNum] = useState(1)
  const handleChangebuyNum = (e) => {
    setNum(e.target.value)
  }
  const buyNum2 = Number(buyNum)

  //パラメータに一致したitemをreturn内でitemとして使う
  let item = '';
  items.forEach((i) => {
  if (i.id === itemIdNum) {
    item = i;
  } })	
  
  // カートの中身を持ってくる
  useEffect(() => {
    if(user){
      dispatch(cartSet(user))
    }
  },[])

 //トッピング
  const toppingsSelector = (state) => state.topping.toppings;
  const allToppings = useSelector(toppingsSelector);
  const [toppings, setToppings] = useState([])

  const handleChangeTopping = (e) => {
    if (e.target.checked) {
      let selectTopping = [...toppings, {id: Number(e.target.value)}]
      setToppings(selectTopping)

    } else if (!e.target.checked) {
      let selectTopping = toppings.filter(value => value.id !== Number(e.target.value))
      setToppings(selectTopping)
    }
  }

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
    if(cart === ""){
      dispatch(newCart(user, item))
      handleLink('/cart-item')
    }else {
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
    //トッピング少な目の数
  let TopNum1 = 0
  let oddTop = toppings.filter(top =>  top.id % 2 !== 0 )
  TopNum1 = oddTop.length;
    //トッピング多めの数
  let TopNum2 = 0
  let evenTop = toppings.filter(top => top.id % 2 === 0 )
  TopNum2 = evenTop.length;
  //合計金額  
  let addPrice = item.priceM
  if (size === 'M') {
      addPrice = item.priceM * buyNum2 + ((200 * TopNum1) + (300 * TopNum2))
    } else if (size === 'L') {
      addPrice = item.priceL * buyNum2 + ((200 * TopNum1) + (300 * TopNum2))
    }

  return (
    <React.Fragment>
      <h2 justify='center'>商品詳細</h2>
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
        <Grid container justify='center'>
          <form>
          <p style={{ fontWeight:'bold' }}>サイズ </p>
              <label className='radio-inline'>
                <input type='radio' value='M' onChange={() => {setSize('M')}} checked={size === 'M'}/>
                <span className='price'>&nbsp;М&nbsp;</span>&nbsp;&nbsp;{item.priceM}円(税抜)
              </label>
              <label className='radio-inline'>
                <input type='radio' checked={size === 'L'} onChange={() =>  {setSize('L')}}/>
                <span className='price'>&nbsp;Ｌ</span>&nbsp;&nbsp;{item.priceL}円(税抜)
              </label><p />
            <span style={{ fontWeight: 'bold' }}>数量：</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>数量を選択してください</span><br/>
              <TextField
                id='outlined-number'
                type='number'
                defaultValue='1'
                value={buyNum}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                onChange={handleChangebuyNum}
            /><p/>
          </form>
        </Grid>
      <Grid container justify='center' margin='spacing' xs={4} sm={5} >
        <Grid item justify='center' xs={4} sm={10} >
          <form>
            <label htmlFor='topping'>
              <p><span style={{ fontWeight: 'bold' }}>トッピング：</span>
              <span style={{ color: 'red', fontWeight: 'bold' }}> ※1ヶにつき　200円、多めは300円（税抜）</span></p>
            </label>
              {allToppings.map((topping, index) => (
                  <label><input type='checkbox' name='topping' value={topping.id} onChange={() => handleChangeTopping}/>{topping.name}</label>
              ))}
            <h2>ご注文金額合計：{addPrice}　円(税抜)</h2>
            <Button onClick={addCartBtn} variant='contained' color='primary' dark='true'>
            カートに入れる
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default ItemDetail