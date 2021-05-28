import {combineReducers} from 'redux'
import user from './user'
import item from './item'
import topping from './topping'
import cart from './cart'


export default combineReducers({user, item, topping, cart})