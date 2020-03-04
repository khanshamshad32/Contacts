/* eslint-disable prettier/prettier */
import React from 'react';
import renderer from 'react-test-renderer';
import {ContactList, mapStateToProps} from '../ContactList';

const favouriteContacts = [
  {name: 'Ola', id: 3, favourite: true},
  {name: 'Erick', id: 4, favourite: true},
];

const defaultContacts = [
  {name: 'Jack', id: 1},
  {name: 'Zoe', id: 2},
  ...favouriteContacts,
];

describe('Contact List', () => {
  it('mapStateToProp should return all contacts', () => {
    let state = {contacts: [...defaultContacts]};
    expect(mapStateToProps(state, {}).contacts).toEqual(defaultContacts);
  });

  it('should render correctly', () => {
    let tree = renderer.create(<ContactList contacts={defaultContacts} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('Favourite Contact List', () => {
  it('mapStateToProp should return only favourite contacts', () => {
    let state = {contacts: [...defaultContacts]};
    expect(mapStateToProps(state, {favourite: true}).contacts).toEqual(
      favouriteContacts,
    );
  });

  it('should render correctly', () => {
    let tree = renderer.create(
      <ContactList contacts={favouriteContacts} favourite />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
