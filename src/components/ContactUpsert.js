/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Input, Button} from './common';
import * as Color from '../utils/color';
import Store from '../redux/store';
import {addContact, updateContact, deleteContact} from '../redux/actionCreator';

const ContactUpsert = ({navigation, route}) => {
  const contact = route.params?.contact;
  const [avatar, setAvatar] = useState(contact?.avatar);
  const [name, setName] = useState(contact?.name);
  const [mobile, setMobile] = useState(contact?.mobile);
  const [landline, setLandline] = useState(contact?.landline);
  const [favourite, setFavourite] = useState(
    contact ? contact.favourite : false,
  );
  const [error, setError] = useState({});

  const mobileRef = useRef();
  const landlineRef = useRef();

  navigation.setOptions({
    title: contact ? 'Update Contact' : 'Add Contact',
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => setFavourite(!favourite)}
          activeOpacity={0.8}>
          <Image
            style={{height: '100%', aspectRatio: 1}}
            source={{
              uri: favourite ? 'ic_star_selected' : 'ic_star_unselected',
            }}
            resizeMode="center"
          />
        </TouchableOpacity>
      );
    },
  });

  const upsertContact = () => {
    Keyboard.dismiss();
    if (validateInput()) {
      let _contact = {...contact, name, mobile, landline, favourite, avatar};
      let msg;
      if (contact) {
        Store.dispatch(updateContact(_contact));
        msg = 'Contact updated.';
      } else {
        Store.dispatch(addContact(_contact));
        msg = 'Contact added.';
      }
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      }
      navigation.pop();
    }
  };

  const delContact = () => {
    Store.dispatch(deleteContact(contact));
    ToastAndroid.show('Contact deleted.', ToastAndroid.SHORT);
    navigation.pop();
  };

  const validateInput = () => {
    let _error = {};

    if (name.length === 0) {
      _error.name = '*Name is mendatory';
    }

    if (mobile.length === 0) {
      _error.mobile = '*Mobile is mendatory';
    }

    setError(_error);
    return Object.keys(_error).length === 0;
  };

  const showImagePicker = () => {
    ImagePicker.showImagePicker(response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        ToastAndroid.show('User cancelled image picker', ToastAndroid.SHORT);
      } else if (response.error) {
        ToastAndroid.show(`${response.error}`, ToastAndroid.SHORT);
      } else {
        setAvatar(response.uri);
      }
    });
  };

  return (
    <View style={Styles.rootContainerStyle}>
      <TouchableOpacity
        style={Styles.imageContainerStyle}
        activeOpacity={0.6}
        onPress={showImagePicker}>
        <Image
          source={{uri: avatar || 'ic_camera'}}
          style={{flex: 1}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Input
        style={Styles.inputStyle}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        error={error.name}
        returnKeyType="next"
        onSubmitEditing={() => mobileRef.current.focus()}
      />
      <Input
        inputRef={mobileRef}
        style={Styles.inputStyle}
        placeholder="Mobile"
        value={mobile}
        onChangeText={text => setMobile(text)}
        error={error.mobile}
        returnKeyType="next"
        onSubmitEditing={() => landlineRef.current.focus()}
        keyboardType="number-pad"
      />
      <Input
        inputRef={landlineRef}
        style={Styles.inputStyle}
        placeholder="Landline"
        value={landline}
        onChangeText={text => setLandline(text)}
        returnKeyType="done"
        keyboardType="number-pad"
      />

      <Button
        style={Styles.saveButtonStyle}
        title={contact ? 'Update' : 'Save'}
        onPress={upsertContact}
      />
      {contact ? (
        <Button
          style={Styles.saveButtonStyle}
          title="Delete"
          onPress={delContact}
        />
      ) : null}
    </View>
  );
};

const Styles = StyleSheet.create({
  rootContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainerStyle: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    marginBottom: 50,
    overflow: 'hidden',
  },
  inputStyle: {
    maxWidth: 300,
    width: '100%',
    marginBottom: 20,
    backgroundColor: Color.APP_WHITE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.APP_PRIMARY,
    paddingHorizontal: 10,
    fontWeight: '600',
  },
  saveButtonStyle: {
    maxWidth: 200,
    width: '100%',
    marginHorizontal: 40,
    marginBottom: 10,
    backgroundColor: Color.APP_PRIMARY,
  },
});

export default ContactUpsert;
