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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
  const [array, setArray] = useState(items);
  const [sortItem1, setSortItem1] = useState("");
  const [sortItem2, setSortItem2] = useState("");
  const [mozi, setMozi] = useState("");
  const [resultState, setResultState] = useState(false);
  const [karamozi, setKaramozi] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItem());
    return () => {
      dispatch(deleteItem());
    };
  }, [dispatch]);
  useEffect(() => {
    setArray(items);
  }, [items]);
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
  const handleSortByAscend = () => {
    const sample1 = [...items]
    sample1.sort((a, b) => {
      return a.priceM - b.priceM;
    });
    setArray(sample1);
  };
  const handleSortByDescend = () => {
    const sample = [...items]
    sample.sort((a, b) => {
      return b.priceM - a.priceM;
    });
    setArray(sample);
  };
  // const [sort, setSort] = useState("1")
  // const changeSort = (e) => {
  //   setSort(e.target.value)
  // }
  // const sortReset = () => {
  //   const modosu =
  // }
  // items.sort(function (a, b) {
  //   return a.value - b.value;
  // });
  return (
    <div>
      {/* <button onClick={handleSortByAscend}>値段が低い順</button>
      <button onClick={handleSortByDescend}>値段が高い順</button> */}
      {/*  <button onClick={sortReset}>標準</button> */}
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
                  <Link to={`/item-detail/${item.id}`} style={{ fontSize: 20 }}>
                    {item.name}
                  </Link>
                  <p style={{ fontSize: 16 }}>
                    Mサイズ {item.priceM.toLocaleString()}円(税込)
                  </p>
                  <p style={{ fontSize: 16 }}>
                    Lサイズ {item.priceL.toLocaleString()}円(税込)
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Home;