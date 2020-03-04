import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

const Input = ({
  inputRef,
  style,
  placeholder,
  value,
  onChangeText,
  error,
  errorStyle,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  keyboardType,
}) => {
  let _errorStyle = {
    color: '#f00',
    alignSelf: 'flex-start',
    ...errorStyle,
  };

  return (
    <View style={style}>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        keyboardType={keyboardType}
      />
      {error ? <Text style={_errorStyle}>{error}</Text> : null}
    </View>
  );
};

export default Input;
