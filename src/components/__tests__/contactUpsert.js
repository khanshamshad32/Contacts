import React from 'react';
import renderer from 'react-test-renderer';
import ContactUpsert from '../ContactUpsert';

const mockNavigation = {setOptions: jest.fn()};

describe('Contact upsert', () => {
  it('should render correctly for Add Contact.', () => {
    let tree = renderer.create(
      <ContactUpsert route={{}} navigation={mockNavigation} />,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render correctly for Update Contact.', () => {
    let contact = {
      id: 1,
      name: 'Rick',
      mobile: '2233',
      landline: '2211',
      favourite: true,
    };
    let tree = renderer.create(
      <ContactUpsert route={{params: {contact}}} navigation={mockNavigation} />,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
