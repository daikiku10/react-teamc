import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Button,} from '@material-ui/core';
import { BrowserRouter as Router, Route, useHistory} from 'react-router-dom';

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
  const history = useHistory();
  const handleLink = path => history.push(path)
  const classes = useStyles();

  return(
    <>
    <div className={classes.root}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} onClick={() => handleLink('/')}>
              ラクラクピザ
            </Typography>
            <Route>
              <Button color="inherit" onClick={() => handleLink('/cart-item')}>ショッピングカート</Button>
              <Button color="inherit" onClick={() => handleLink('/order-history')}>注文履歴</Button>
              <>
                <Button color="inherit">ログアウト</Button>
                <Button color="inherit">ログイン</Button>
              </>
            </Route>
          </Toolbar>
        </AppBar>
      </Router>
    </div>
    </>
  )
}

export default Header