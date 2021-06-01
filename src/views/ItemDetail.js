import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { setItem, deleteItem, setTopping, deleteTopping, newCart, addCart, cartSet } from '../actions/index';
import { CART_STATUS_IN } from '../actions/status';

const userSelector = state => state.user.user
const cartSelector = state => state.cart.cart
const itemsSelector = state => state.item.items;
const toppingsSelector = state => state.topping.toppings;

const useStyles = makeStyles({
  grid: {
  margin: "50px 0 100px 0",
  },

  form: {
    margin: "20px 0 0 0",
    width: "60%"
  }
});

const ItemDetail = () => {
  //console.log('詳細コンポーネント呼び出し')
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItem());
    dispatch(setTopping());
      return () => {
        dispatch(deleteItem());
        dispatch(deleteTopping());
      };
  }, []);

  const user = useSelector(userSelector);
  const items = useSelector(itemsSelector);
  const allToppings = useSelector(toppingsSelector);
  const cart = useSelector(cartSelector);
  const { item_id } = useParams();
  const itemIdNum = Number(item_id);
  const history = useHistory();
  const handleLink = (path) => history.push(path);

  //パラメータに一致したitemをreturn内でitemとして使う
  let item = '';
  items.forEach((i) => {
  if (i.id === itemIdNum) {
    item = i;
    }
  })

  //個数
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
  },[])

 //トッピング
  const [toppings, setToppings] = useState([])
  const handleChangeTopping = (e) => {
    if (e.target.checked) {
      console.log(e.target.value)
      let selectTopping = [...toppings, {id: Number(e.target.value)}]
      setToppings(selectTopping)

    } else if (!e.target.checked) {
      let selectTopping = toppings.filter(value => value.id !== Number(e.target.value))
      setToppings(selectTopping)
    }
  }

  //サイズ
  const [size, setSize] = useState('M')
  const handleChangeSize = (e) => {
    setSize(e.target.value)
  }

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
    //トッピング少な目の数　奇数
  let TopNum1 = 0
  let oddTop = toppings.filter(top =>  top.id % 2 !== 0 )
  TopNum1 = oddTop.length;
    //トッピング多めの数　偶数
  let TopNum2 = 0
  let evenTop = toppings.filter(top => top.id % 2 === 0 )
  TopNum2 = evenTop.length;
  //合計金額  
  let addPrice = item.priceM
  if (size === 'M') {
      addPrice = item.priceM * buyNum2 + ((200 * (TopNum1 * buyNum2)) + ((300 * TopNum2 * buyNum2)))
    } else if (size === 'L') {
      addPrice = item.priceL * buyNum2 + ((200 * (TopNum1 * buyNum2)) + ((300 * TopNum2 * buyNum2)))
    }

  return (
    <React.Fragment>
      <div className={classes.grid}>
        <Grid container justify='center'>
              <Grid item xs={4} sm={5} >
                <div text-align='center'><img src={`/${item.imagePath}`} alt='画像' style={{ width: 400, height: 300 }}></img></div>
              </Grid>
        <Grid item xs={4} sm={5}>
          <span style={{ fontsize:'20px' }} justify='center'>商品詳細</span>
            <h3>{item.name}</h3> <br />
                <p>{item.description}</p>
              </Grid>
        </Grid>
        <Grid container justify='center'>
          <form className={classes.form}>
            <p style={{ fontWeight:'bold' }}>サイズ </p>
              <label>
                <input type='radio' value='M' onChange={(e) => {handleChangeSize(e)}} checked={size === 'M'}/>
                <span className='price'> Ｍ </span>{Number(item.priceM).toLocaleString()}円(税抜)　　
              </label>
              <label>
                <input type='radio' value='L' checked={size === 'L'} onChange={(e) =>  {handleChangeSize(e)}}/>
                <span className='price'>  Ｌ </span>{Number(item.priceL).toLocaleString()}円(税抜)
              </label><p />
            
            <label htmlFor='topping'>
              <p><span style={{ fontWeight: 'bold' }}>トッピング：</span>
              <span style={{ color: 'red', fontWeight: 'bold' }}> ※1ヶにつき200円、多めは300円（税抜）</span></p>
            </label>
              {allToppings.map((topping) => (
                  <label key={topping.id}><input type='checkbox' name='topping' value={topping.id} onChange={(e) => handleChangeTopping(e)}/>{topping.name}   </label>
              ))}
            <br /><br/>
            
            <span style={{ fontWeight: 'bold' }}>数量：</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>数量を選択してください</span><br/>
            <TextField
              id='outlined-number'
              type='number'
              value={buyNum}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              onChange={(e) => { handleChangebuyNum(e) }}
            /><p />
            <h2>ご注文金額合計：{addPrice.toLocaleString()}　円(税抜)</h2>

            <Button onClick={addCartBtn} variant='contained' color='secondary' dark='true'>
            カートに入れる
            </Button>
          </form>
        </Grid>
      </div>
    </React.Fragment>
  )
}
export default ItemDetail