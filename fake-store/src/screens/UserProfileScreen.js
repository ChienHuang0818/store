// src/screens/UserProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../services/fetchService';
import { userSignedIn, userSignedOut } from '../store/userSlice';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('User data:', user);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Name and password cannot be empty');
      return;
    }

    try {
      const updatedUser = await updateUser(token, { name, password });
      dispatch(userSignedIn({ user: { ...updatedUser, email }, token }));
      Alert.alert('Success', 'Profile updated successfully');
      setPassword('');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignOut = () => {
    dispatch(userSignedOut());
    navigation.navigate('SignIn');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user data found. Please sign in again.</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>User Name:</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="New Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  userInfoContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  signOutButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
});

export default UserProfileScreen;
