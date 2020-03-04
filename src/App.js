import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {ContactListRoot} from './components';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="ContactListRoot" options={{title: 'Contacts'}}>
          {props => <ContactListRoot title="Contacts" {...props} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="FavouriteContactListRoot"
          options={{title: 'Favourite Contacts'}}>
          {props => (
            <ContactListRoot favourite title="Favourite Contacts" {...props} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
