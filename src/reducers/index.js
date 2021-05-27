import {combineReducers} from 'redux'
import user from './user'
import item from './item'
import topping from './topping'


export default combineReducers({user, item, topping})