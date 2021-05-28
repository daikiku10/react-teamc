import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  setItem,
  deleteItem,
  setTopping,
  deleteTopping,
} from "../actions/index";

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
  const items = useSelector(itemsSelector);
  const toppingsSelector = (state) => state.topping.toppings;
  const toppings = useSelector(toppingsSelector);
  const { item_id } = useParams();
  const itemIdNum = Number(item_id);

  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const handleChange = (e) => {
    Number(e.target.value);
  };

  return (
    <React.Fragment>
      <h2 justify="center">商品詳細</h2>
      {items
        .filter((item) => {
          return item.id === itemIdNum;
        })
        .map((item) => (
          <div>
            <Grid container justify="center">
              <Grid item xs={6} sm={6}>
                <img
                  src=""
                  alt="画像"
                  width="400"
                  height="280"
                  justify="true"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <h3>{item.name}</h3> <br />
                <br />
                <p>{item.text}</p>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <form>
                <p style={{ fontWeight: "bold" }}>サイズ </p>
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="responsibleCompany"
                    defaultChecked
                  />
                  <span className="price">&nbsp;М&nbsp;</span>&nbsp;&nbsp;
                  {item.price}円(税抜)
                </label>
                <label className="radio-inline">
                  <input type="radio" name="responsibleCompany" />
                  <span className="price">&nbsp;Ｌ</span>&nbsp;&nbsp;
                  {item.price2}円(税抜)
                </label>
                <br />

                <span style={{ fontWeight: "bold" }}>数量：</span>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  数量を選択してください
                </span>
                <br />
                <TextField
                  id="outlined-number"
                  type="number"
                  defaultValue="1"
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

                <label htmlFor="topping">
                  <p style={{ fontWeight: "bold" }}>
                    トッピング ※1ヶにつき　少なめ200円、普通量300円（税抜）
                  </p>
                </label>
                <label>
                  オニオン:　少なめ
                  <input type="checkbox" name="topping" value="1" />
                  　普通量
                  <input type="checkbox" name="topping2" value="1" />
                </label>
                <label>
                  チーズ:　少なめ
                  <input type="checkbox" name="topping" value="2" />
                  　普通量
                  <input type="checkbox" name="topping2" value="2" />
                </label>
                <label>
                  ピーマン:　少なめ
                  <input type="checkbox" name="topping" value="3" />
                  　普通量
                  <input type="checkbox" name="topping2" value="3" />
                </label>
                <br />
                <label>
                  ロースハム: 少なめ
                  <input type="checkbox" name="topping" value="4" />
                  　普通量
                  <input type="checkbox" name="topping2" value="4" />
                </label>
                <label>
                  ほうれん草:　少なめ
                  <input type="checkbox" name="topping" value="5" />
                  　普通量
                  <input type="checkbox" name="topping2" value="5" />
                </label>
                <label>
                  ペパロニ: 少なめ
                  <input type="checkbox" name="topping" value="6" />
                  　普通量
                  <input type="checkbox" name="topping2" value="6" />
                </label>
                <br />
                <label>
                  あらびきソーセージ: 少なめ
                  <input type="checkbox" name="topping" value="7" />
                  　普通量
                  <input type="checkbox" name="topping2" value="7" />
                </label>
                <p />

                <h2>
                  ご注文金額合計：{item.price}*個数+トッピング価格　円(税抜)
                </h2>
                <Button
                  onClick={() => handleLink("/cart-item")}
                  variant="contained"
                  color="primary"
                  dark="true"
                >
                  カートに入れる
                </Button>
              </form>
            </Grid>
          </div>
        ))}
    </React.Fragment>
  );
};
export default ItemDetail;
