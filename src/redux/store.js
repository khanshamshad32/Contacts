import {createStore} from 'redux';
import contactsReducer from './contactReducer';

export default createStore(contactsReducer);
