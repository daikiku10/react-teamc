import React from "react";
import {useHistory, useParams} from 'react-router-dom';
import {useSelector, connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const itemsSelector = state => state.item.items
const toppingsSelector = state => state.topping.toppings
const item = { id: 1, name: 'とんこつラーメン', text: '詳細内容', price: '700', price2: '800', img: 'items[1].topping' }
//const addCart = () => { console.log('カートへ遷移') }
//const ItemId = () => const { ItemId } = useParams();



const ItemDetail = (props) => {
  const history = useHistory();
  const handleLink = (path) => history.push(path)
  const handleChange = (e) => {Number(e.target.value)}

  const items = useSelector(itemsSelector)
  const toppings = useSelector(toppingsSelector)

  const { params } = props.match
  console.log(params.item_id);
  console.log(itemsSelector);
  //console.log(items[params.item_id]);
  
  return (
    <React.Fragment>
      <h2 justify="center">商品詳細</h2>
      <Grid container justify="center">
        <Grid item xs={6} sm={6}>
            <img src="" alt="画像" width="400" height="280" justify="true" />
        </Grid>

        <Grid item xs={6} sm={6}>
              <h4>{item.name}</h4> <br />
              <br />
          <p>{item.text}</p>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <form>
          <p style={{ fontWeight: 'bold' }}>サイズ </p>
            <label className="radio-inline">
              <input type="radio" name="responsibleCompany" defaultChecked />
              <span className="price">&nbsp;М&nbsp;</span>&nbsp;&nbsp;{item.price}円(税抜)
            </label>
            <label className="radio-inline">
              <input type="radio" name="responsibleCompany" />
              <span className="price">&nbsp;Ｌ</span>&nbsp;&nbsp;{item.price2}円(税抜)
            </label><br />
            
          <span style={{ fontWeight: 'bold' }}>数量：</span>
            <span style={{ color: 'red', fontWeight: 'bold' }}>数量を選択してください</span><br/>
            <TextField
              id="outlined-number"
              type="number"
              defaultValue="1"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              onChange={(e) => { handleChange(e) }}
            />
        
          <label htmlFor="topping">
              <p style={{ fontWeight: 'bold' }}>トッピング ※1ヶにつき　少なめ200円、普通量300円（税抜）</p>
          </label>
            <label>オニオン:　少なめ<input type="checkbox" name="topping" value="1" />　普通量<input type="checkbox" name="topping2" value="" /></label>
            <label>チーズ:　少なめ<input type="checkbox" name="topping" value="2" />　普通量<input type="checkbox" name="topping2" value="" /></label>
            <label>ピーマン:　少なめ<input type="checkbox" name="topping" value="3" />　普通量<input type="checkbox" name="topping2" value="" /></label><br/>
            <label>ロースハム: 少なめ<input type="checkbox" name="topping" value="4" />　普通量<input type="checkbox" name="topping2" value="" /></label>
            <label>ほうれん草:　少なめ<input type="checkbox" name="topping" value="5" />　普通量<input type="checkbox" name="topping2" value="" /></label>
            <label>ペパロニ: 少なめ<input type="checkbox" name="topping" value="6" />　普通量<input type="checkbox" name="topping2" value="" /></label><br />
            <label>あらびきソーセージ: 少なめ<input type="checkbox" name="topping" value="7" />　普通量<input type="checkbox" name="topping2" value="" /></label><p />

          
          <h2>ご注文金額合計：{item.price}*個数+トッピング価格　円(税抜)</h2>
          <Button onClick={() => handleLink('/cart-item')} variant="contained" color="primary" dark="true">
            カートに入れる
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  )
}
const mapStateToProps = state => {
  console.log(state)
}
console.log(document.querySelectorAll)
let input_toppings = document.querySelectorAll("input[name=topping]");
console.log(input_toppings);
const checked_data =[]
  if (0 < input_toppings.length) {
    for(const data of input_toppings) {
      if( data.checked ) {
        checked_data.push(data.value);
      }
    }
  }
console.log(checked_data)

export default connect (mapStateToProps)(ItemDetail);

<script>

</script>