import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setItem, deleteItem } from "../actions/index";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { flexbox } from "@material-ui/system";
import { red } from "@material-ui/core/colors";
import { MicNone } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  cardList: {
    display: "flex",
    // justifyContent: "center",
    flexWrap: "wrap",
    listStyleType: "none",
    padding: "10px 80px",
  },
  card: {
    width: "25%",
    marginTop: "30px",
  },
});

const Home = () => {
  const classes = useStyles();

  const itemsSelector = (state) => state.item.items;
  const items = useSelector(itemsSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItem());
    return () => {
      dispatch(deleteItem());
    };
  }, []);
  useEffect(() => {
    setArray(items);
  }, [items]);

  const [array, setArray] = useState(items);
  const [mozi, setMozi] = useState("");
  const [resultState, setResultState] = useState(false);
  const [karamozi, setKaramozi] = useState(false);
  const searchWord = () => {
    let arr = items.filter((item) => {
      return 0 <= item.name.indexOf(mozi);
    });
    console.log(arr.length);
    const result = arr.length === 0;
    setResultState(result);
    const karaResult = mozi === "";
    setKaramozi(karaResult);
    setArray(arr);
  };

  const clearWord = () => {
    console.log("a");
    setMozi("");
    setResultState(false);
    setArray(items);
    setKaramozi(false);
  };
  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          value={mozi}
          onChange={(e) => setMozi(e.target.value)}
          style={{}}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={searchWord}
          style={{ margin: "0 3px" }}
        >
          検索
          <SearchIcon />
        </Button>
        <Button variant="contained" color="secondary" onClick={clearWord}>
          クリア
          <DeleteIcon />
        </Button>
      </div>

      {resultState && (
        <h2 style={{ textAlign: "center" }}>一致する商品がありません</h2>
      )}
      {karamozi && (
        <h2 style={{ textAlign: "center" }}>検索キーワード空欄です</h2>
      )}

      <ol className={classes.cardList}>
        {array.map((item) => (
          <li key={item.id} className={classes.card}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media}>
                  <Link to={`/item-detail/${item.id}`}>
                    <img
                      style={{ width: 345, height: 200 }}
                      src={item.imagePath}
                      alt="Logo"
                    />
                  </Link>
                </CardMedia>
                <br />
                <CardContent>
                  <Link to={`/item-detail/${item.id}`}>{item.name}</Link>
                  <p>M {item.priceM}円(税抜き)</p>
                  <p>L {item.priceL}円(税抜き)</p>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  お気に入り
                </Button>
              </CardActions>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
