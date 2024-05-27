// src/components/AuthGuard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthGuard = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You need to log in to access this page.</Text>
        <Button title="Go to Sign In" onPress={() => navigation.navigate('SignIn')} />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e0e0e0',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  }
});

export default AuthGuard;
