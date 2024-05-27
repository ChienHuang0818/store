// src/screens/Cart.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, clearCart } from '../store/cartSlice';
import { submitOrder } from '../services/fetchService';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleCheckout = async () => {
    try {
      await submitOrder(user.id, cart.items);
      dispatch(clearCart());
      Alert.alert('Success', 'Order has been placed');
      navigation.navigate('MyOrders');
    } catch (error) {
      Alert.alert('Error', 'Failed to place order');
      console.error('Error placing order:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => dispatch(addToCart(item))}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item))}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyContainer = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your Cart is Empty</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cartTitle}>
        <Text style={styles.cartTitleText}>Shopping Cart</Text>
      </View>
      <FlatList
        data={cart.items}
        renderItem={renderItem}
        keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
        ListEmptyComponent={renderEmptyContainer}
      />
      {cart.items.length > 0 && (
        <>
          <Text style={styles.summaryText}>Total Items: {cart.totalItems}</Text>
          <Text style={styles.summaryText}>Total Price: ${cart.totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Check Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  buttonText: {
    fontSize: 18,
  },
  summaryText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  emptyText: {
    fontSize: 20,
  },
  cartTitle: {
    marginHorizontal: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  cartTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Cart;
