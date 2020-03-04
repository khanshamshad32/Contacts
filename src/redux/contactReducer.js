import * as ActionTypes from './actionTypes';

const defaultState = {contacts: new Array(0)};

const contactsReducer = (state = defaultState, action) => {
  // console.log('Reducer ', action);
  switch (action.type) {
    case ActionTypes.ADD_CONTACT: {
      let contacts = [...state.contacts];
      contacts.push(action.payload);
      return {contacts: sortContacts(contacts)};
    }
    case ActionTypes.UPDATE_CONTACT: {
      let contacts = [...state.contacts];
      contacts = contacts.map(item => {
        if (item.id === action.payload.id) {
          return {...action.payload};
        }
        return item;
      });

      return {contacts: sortContacts(contacts)};
    }
    case ActionTypes.DELETE_CONTACT:
      let _contacts = state.contacts.filter(
        item => item.id !== action.payload.id,
      );

      return {contacts: [..._contacts]};

    default:
      return state;
  }
};

const sortContacts = contacts => {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  return contacts;
};

export default contactsReducer;
