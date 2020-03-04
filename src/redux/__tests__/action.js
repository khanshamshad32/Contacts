import {addContact, deleteContact, updateContact} from '../actionCreator';
import * as ActionTypes from '../actionTypes';

describe('Action creator ', () => {
  it('should return action for type ADD_CONTACT', () => {
    expect(addContact({}).type).toEqual(ActionTypes.ADD_CONTACT);
  });

  it('should return action for type UPDATE_CONTACT', () => {
    expect(updateContact({}).type).toEqual(ActionTypes.UPDATE_CONTACT);
  });

  it('should return action for type DELETE_CONTACT', () => {
    expect(deleteContact({}).type).toEqual(ActionTypes.DELETE_CONTACT);
  });
});
