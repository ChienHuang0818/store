// src/screens/Cart.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { removeFromCart, addToCart } from '../store/cartSlice';

export const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

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
      <Text style={styles.emptyText}>Your shopping cart is empty</Text>
    </View>
  );


  return (
    <View style={styles.container}>
    
      <View style={styles.cartTitle}>
        <Text style={styles.cartTitleText}>Shopping cart</Text>
      </View>
      <FlatList
        data={cart.items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={renderEmptyContainer}  // This will render when the list is empty
      />
      {cart.items.length > 0 && (
        <>
          <Text style={styles.summaryText}>Total Items: {cart.totalItems}</Text>
          <Text style={styles.summaryText}>Total Price: ${cart.totalPrice.toFixed(2)}</Text>
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
    marginTop: 200,  // Adjust this value as needed
  },
  emptyText: {
    fontSize: 20,
  },
  cartTitle: {
    marginHorizontal: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey, // 或者选择其他背景颜色
  },
  cartTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
});