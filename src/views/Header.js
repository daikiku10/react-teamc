import React from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { cartReset } from "../actions";

const userSelector = (state) => state.user.user;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const user = useSelector(userSelector);
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const classes = useStyles();
  const dispatch = useDispatch();

  const login = () => {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(google_auth_provider);
    dispatch(cartReset());
    handleLink("/");
  };
  const logout = () => {
    firebase.auth().signOut();
    dispatch(cartReset());
    handleLink("/");
  };

  return (
    <>
      <div className={classes.root}>
        <Router>
          <AppBar
            position="static"
            style={{ color: "#fff", backgroundColor: "#CF000D" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                className={classes.title}
                onClick={() => handleLink("/")}
              >
                <img
                  // style={{ width: 345, height: 200 }}
                  src={`${process.env.PUBLIC_URL}/header_logo.png`}
                  alt="Logo"
                />
              </Typography>
              <>{user ? <>{user.displayName}</> : <></>}</>
              <Route>
                <Button
                  color="inherit"
                  onClick={() => handleLink("/cart-item")}
                >
                  ショッピングカート
                </Button>
                <>
                  {user ? (
                    <>
                      <Button
                        color="inherit"
                        onClick={() => handleLink("/order-history")}
                      >
                        注文履歴
                      </Button>
                      <Button color="inherit" onClick={logout}>
                        ログアウト
                      </Button>
                    </>
                  ) : (
                    <Button color="inherit" onClick={login}>
                      ログイン
                    </Button>
                  )}
                </>
              </Route>
            </Toolbar>
          </AppBar>
        </Router>
      </div>
    </>
  );
};

export default Header;
