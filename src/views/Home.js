import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setItem, deleteItem } from "../actions/index";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // fontSize: 100,
  },
  media: {
    height: 220,
  },
  cardList: {
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none",
    boxSizing: "borderBox",
    // justifyContent: "center",
    // padding: "10px 80px",
    // margin: "20px",
    // border: "unset",
    // textAlign: "center",
  },
  card: {
    width: "25%",
    marginTop: "30px",
    fontSize: "2px",
  },
  input: {
    margin: "30px 5px 0 0",
  },
  buttonSearch: {
    margin: "45px 5px 0 0",
  },
  buttonClear: {
    margin: "45px 5px 0 0",
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
    setArray(items);
    let arr = items.filter((item) => {
      return 0 <= item.name.indexOf(mozi);
    });
    const result = arr.length === 0;
    setResultState(result);
    const karaResult = mozi === "";
    setKaramozi(karaResult);
    setArray(arr);
    if (arr.length === 0) {
      setArray(items);
    }
  };

  const clearWord = () => {
    setMozi("");
    setResultState(false);
    setArray(items);
    setKaramozi(false);
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <TextField
          className={classes.input}
          id="filled-basic"
          label="Search Noodle"
          variant="filled"
          noValidate
          autoComplete="off"
          value={mozi}
          onChange={(e) => setMozi(e.target.value)}
        />
        <Button
          className={classes.buttonSearch}
          variant="contained"
          color="secondary"
          onClick={searchWord}
        >
          検索
          <SearchIcon />
        </Button>
        <Button
          className={classes.buttonClear}
          variant="contained"
          color="secondary"
          onClick={clearWord}
        >
          クリア
          <DeleteIcon />
        </Button>
        {/* </form> */}
      </div>

      {resultState && (
        <h2 style={{ textAlign: "center" }}>一致する商品がありません</h2>
      )}
      {karamozi && (
        <h2 style={{ textAlign: "center" }}>検索キーワードが空欄です</h2>
      )}

      <ol className={classes.cardList}>
        {array.map((item) => (
          <li key={item.id} className={classes.card}>
            {/* <Grid item xs={12}> */}
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
                <CardContent>
                  <Link to={`/item-detail/${item.id}`}>{item.name}</Link>
                  <p
                  // style={{ fontSize: 20 }}
                  >
                    Mサイズ {item.priceM.toLocaleString()}円(税抜き)
                  </p>
                  <p>Lサイズ {item.priceL.toLocaleString()}円(税抜き)</p>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* </Grid> */}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
