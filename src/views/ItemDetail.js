import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { setItem, deleteItem, setTopping, deleteTopping } from '../actions/index';

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

  const history = useHistory();
  const handleLink = (path) => history.push(path);

  //パラメータ
  const { item_id } = useParams();
  const itemIdNum = Number(item_id);

  //item
  const itemsSelector = (state) => state.item.items;
  const items = useSelector(itemsSelector);
  let item = '';
  items.forEach((i) => {
    if (i.id === itemIdNum) {
      item = i;
  } })

  //商品個数
  const [buyNum, setNum] = useState(1);
  const handleChangebuyNum = (e) => {
    setNum(e.target.value)
  };
  const buyNum2 = Number(buyNum);

  //トッピング
  const toppingsSelector = (state) => state.topping.toppings;
  const allToppings = useSelector(toppingsSelector);
  const [toppings, setToppings] = useState([]);

  const handleChangeTopping = (e) => {
    if (e.target.checked) {
      let selectTopping = [...toppings, Number(e.target.value)];
      setToppings(selectTopping);

    } else if (!e.target.checked) {
      let selectTopping = toppings.filter(value => value !== Number(e.target.value));
      setToppings(selectTopping);
    }
  };
  console.log(toppings);

  //サイズ
  const [size, setSize] = useState('M')
  const addCartBtn = () => {
    const item = {
      id: new Date().getTime().toString(),
      status: 0,
      itemInfo: [{
        itemId: itemIdNum,
        buyNum: buyNum2,
        size: size,
        toppings: toppings
      }]
    }
    console.log(item)
  }

  //合計金額

  //多め配列
  const topping1 = allToppings.filter(top => top.name.match('多め'))
  //console.log(topping1);

  //多め配列を選択されたトッピング配列と比較して、差分を出す
  const top1Count = topping1.filter((top1) => toppings.indexOf(top1.id) == -1 );
  console.log(top1Count) 
  console.log(top1Count.length);　//選択されてない多めの数
  console.log(toppings.length)
  const newToppings = toppings.length

  const topping2 = []
  let addPrice = item.priceM
  // if (size === 'M') { addPrice = item.priceM* 2; }
  if (size === 'M') {
      //if()
        addPrice = item.priceM * buyNum2 + (200 * toppings.length)
    } else if (size === 'L') {
      addPrice = item.priceL * buyNum2 + (200 * toppings.length);
    }
  
  // console.log(toppings.length)
  // console.log(addPrice2);
 
  return (
    <React.Fragment>
      <h2 justify='center'>商品詳細</h2>
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
              <p style={{ fontWeight: 'bold' }}>トッピング ※1ヶにつき 200円、多め300円（税抜）</p>
            </label>
            <ul>
              {allToppings.map((topping, index) => (
                <li key={index}>
                  <label>{topping.name}:　<input type='checkbox' name='topping' value={topping.id} onChange={handleChangeTopping}/></label>
                </li>
              ))}
            </ul>
            <h2>ご注文金額合計：{addPrice} 個数+トッピング価格　円(税抜)</h2>
                <Button onClick={() => {addCartBtn()}} variant='contained' color='primary' dark='true'>
              カートに入れる
            </Button>
          </form>
        </Grid>
      </div>
    </React.Fragment>
  )
}
export default ItemDetail;
