import contactReducer from '../contactReducer';
import * as ActionTypes from '../actionTypes';

const defaultState = {
  // eslint-disable-next-line prettier/prettier
  contacts: [
    {name: 'Jack', id: 1, mobile: 1122},
    {name: 'Bate', id: 2, mobile: 2233},
    {name: 'Rita', id: 3, mobile: 9988},
  ],
};

describe('Contact reducer', () => {
  describe('should add contact', () => {
    it('when the state is undefined', () => {
      let contact = {name: 'Jack'};
      let action = {type: ActionTypes.ADD_CONTACT, payload: {...contact}};
      let state = contactReducer(undefined, action);

      expect(state.contacts.length).toEqual(1);
    });

    it('in sorted order', () => {
      let action = {type: ActionTypes.ADD_CONTACT, payload: {name: 'Anna'}};

      let state = contactReducer(defaultState, action);
      expect(state.contacts[0].name).toEqual('Anna');
    });
  });

  describe('should update contact list', () => {
    it('when contact name is updated', () => {
      let action = {
        type: ActionTypes.UPDATE_CONTACT,
        payload: {name: 'Anna', id: 2},
      };

      let state = contactReducer(defaultState, action);
      expect(state.contacts[0].name).toEqual('Anna');
    });

    it('when mobile and name are updated', () => {
      let action = {
        type: ActionTypes.UPDATE_CONTACT,
        payload: {name: 'Anna', id: 3, mobile: 4455},
      };

      let state = contactReducer(defaultState, action);
      expect(state.contacts[0].name).toEqual('Anna');
      expect(state.contacts[0].mobile).toEqual(4455);
    });
  });
});
