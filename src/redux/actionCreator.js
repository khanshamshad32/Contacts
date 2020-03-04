import * as ActionTypes from './actionTypes';

export const addContact = contact => {
  contact.id = Date.now();
  // console.log('Contact Action Create', contact);

  return {
    type: ActionTypes.ADD_CONTACT,
    payload: {...contact},
  };
};

export const updateContact = contact => {
  // console.log('Contact Action Update', contact);
  return {
    type: ActionTypes.UPDATE_CONTACT,
    payload: {...contact},
  };
};

export const deleteContact = contact => {
  // console.log('Contact Action Delete', contact);
  return {
    type: ActionTypes.DELETE_CONTACT,
    payload: {...contact},
  };
};
