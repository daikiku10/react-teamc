import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setItem, deleteItem } from "../actions/index";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

const Home = () => {
  const itemsSelector = (state) => state.item.items;
  const items = useSelector(itemsSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setItem());
    return () => {
      dispatch(deleteItem());
    };
  }, []);

  const [mozi, setMozi] = useState("");
  const handleSearch = (e) => {
    const kensaku = e.target.previousElementSibling.value;
    setMozi(kensaku);
    console.log(e.target.previousElementSibling.value);
    // dispatch(handleSearch(mozi))
  };
  const clearSearch = () => {
    // console.log("発火");
    const crear = "";
    setMozi(crear);
    // console.log(setMozi);
  };
  return (
    <div>
      <TextField id="standard-search" label="Search field" type="search" />
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        variant="filled"
      />
      <InputBase
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* <input type="text" placeholder="検索"></input> */}

      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          handleSearch(e);
        }}
      >
        検索
        <SearchIcon />
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => clearSearch(mozi)}
      >
        クリア
        <DeleteIcon />
      </Button>

      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item-detail/${item.id}`}>
              <img
                style={{ width: 200, height: 150 }}
                src={item.imagePath}
                alt="Logo"
              />
              {/* <img src={`${process.env.PUBLIC_URL}/1.jpg`} alt="Logo" /> */}
            </Link>
            <br />
            <Link to={`/item-detail/${item.id}`}>{item.name}</Link>
            <p>M {item.priceM}円(税抜き)</p>
            <p>L {item.priceL}円(税抜き)</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
/* <style>
.pic{
  text-align: center;
}
.picture{
  width: 100px;
  height: 150px;
}

.block{
    word-break: break-all;
    width: 30%;
    display: inline-block;
    flex-wrap: wrap;
    justify-content: center;
    text-align: start;
    margin-top: 0%;
    padding-top: 0%;
    vertical-align: top;
    border-style: ridge;
    height: 300px;
}
.itemlist{
  padding-top: 100px;
}
.cd{
  text-align: center;
  return <div>Home Hello</div>
}
</style> */

export default Home;
