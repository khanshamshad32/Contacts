import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';

const Button = ({title, style, titleStyle, onPress, loading}) => {
  let _style = {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    ...style,
  };

  let _titleStyle = {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    ...titleStyle,
  };

  return (
    <TouchableOpacity
      style={_style}
      onPress={onPress}
      activeOpacity={loading ? 1 : 0.8}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={_titleStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
