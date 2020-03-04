/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {Provider} from 'react-redux';
import ContactList from './ContactList';
import ContactUpsert from './ContactUpsert';
import * as Color from '../utils/color';
import store from '../redux/store';

const Stack = createStackNavigator();

export const ContactListRoot = ({navigation, title, favourite}) => {
  return (
    <Provider store={store}>
      <Stack.Navigator
        initialRouteName="ContactList"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: Color.APP_PRIMARY,
        }}>
        <Stack.Screen
          name={title}
          options={{
            // title: 'Contact List',
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <Image
                    style={{height: '100%', aspectRatio: 1}}
                    source={{uri: 'ic_menu'}}
                    resizeMode="center"
                  />
                </TouchableOpacity>
              );
            },
          }}>
          {props => <ContactList favourite={favourite} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ContactUpsert" component={ContactUpsert} />
      </Stack.Navigator>
    </Provider>
  );
};
