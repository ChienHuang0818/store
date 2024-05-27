import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // 以 Ionicons 为例

export const Button = ({ onPress, title, iconName }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
         {iconName && <Icon name={iconName} size={20} color={colors.black} />}
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      
      paddingVertical: 8,   // 垂直方向的内边距
      paddingHorizontal: 12, // 水平方向的内边距
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.grey,
      alignSelf: 'flex-start',
    },
    buttonText: {
      marginLeft: 5,
      fontSize: 18,
      color: colors.black,
    },
  });
  
  