import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import * as Colors from '../utils/color';

export const ContactList = ({navigation, contacts, favourite}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={Styles.itemContainerStyle}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ContactUpsert', {
            contact: item,
          });
        }}>
        <View style={Styles.itemImageContainerStyle}>
          <Image
            source={{uri: item.avatar || 'ic_account'}}
            resizeMode="cover"
            style={Styles.itemImageStyle}
          />
        </View>
        <Text style={Styles.itemNameStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // console.log('Contact List Render', contacts);

  return (
    <>
      <FlatList
        style={Styles.rootContainerStyle}
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        extraData={contacts}
        bounces={true}
        bouncesZoom={true}
      />
      {!favourite ? (
        <TouchableOpacity
          style={Styles.addButtonStyle}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ContactUpsert');
          }}>
          <Image
            style={Styles.addButtonImageStyle}
            source={{uri: 'ic_add'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export const mapStateToProps = ({contacts}, {favourite}) => {
  // console.log('mapStateToProps contacts', contacts);

  if (favourite) {
    contacts = contacts.filter(item => item.favourite);
  }

  return {contacts};
};

const Styles = StyleSheet.create({
  rootContainerStyle: {
    backgroundColor: Colors.APP_WHITE,
  },
  itemContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 80,
    marginVertical: 3,
    marginLeft: 30,
  },
  itemImageContainerStyle: {
    height: 50,
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.APP_GREY,
  },
  itemImageStyle: {
    flex: 1,
  },
  itemNameStyle: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.BLACK_ACTIVE,
  },
  addButtonStyle: {
    position: 'absolute',
    right: 30,
    bottom: 40,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  addButtonImageStyle: {
    flex: 1,
  },
});

export default connect(mapStateToProps)(ContactList);
