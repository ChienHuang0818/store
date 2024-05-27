//Productdetail.js
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator,Image,ScrollView } from 'react-native';
import colors from '../constants/colors';
import { Button } from '../components/Button';

import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { fetchProductById } from '../services/apiServices';

export const Productdetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = route.params;  // route.params 包含了传递给该屏幕的所有参数
  
    useEffect(() => {
      const getProduct = async () => {
        try {
            const data = await fetchProductById(id);
            setProduct(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
      };

      getProduct();
    }, [id]);

    const handleAddToCart = () => {
      dispatch(addToCart({ ...product, quantity: 1 })); // 假设每次添加1个
      ;
    };

  
    return (
      <View style={styles.container}>
        
         {loading ? (
      <ActivityIndicator size="large" color={colors.grey} />
    ) : (
      <View>

        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.detailsBox}>

            <Text style={styles.detailText}>Rate: {product.rating?.rate}</Text>
            <Text style={styles.detailText}>Sold: {product.rating?.count}</Text>
            <Text style={styles.detailText}>Price: ${product.price}</Text>
          
        </View>
        <View style={styles.buttonGroup}>
          <Button 
            title="Back" 
            iconName="arrow-back" // 使用Ionicons中的图标名称
            onPress={() => navigation.goBack()} 
          />
          <Button 
            title="Add to Cart" 
            iconName="cart" // 修改为你的购物车图标名称
            onPress={handleAddToCart}  // 这里实现添加到购物车的逻辑
          />
        </View>
  
        <View style={styles.descriptionContainer}>
          <ScrollView>
            <Text style={styles.description}>{product.description}</Text>
          </ScrollView>
        </View>
      
      </View>
    )}
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0, // Adjust the margin as needed
      backgroundColor: colors.white,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center', // Center the header text
    },
    listContainer: {
      alignItems: 'stretch', // Stretch list items to match the container width
    },
    item: {
      backgroundColor: colors.lightBlue,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16, // Adjust horizontal margin to match your design
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.grey,
    },
    title: {
      fontSize: 18,
    },
    image: {
        width: '100%', // 根据你的布局需求调整
        height: 200, // 根据你的布局需求调整
        resizeMode: 'contain',
        marginBottom: 10,
      },
      descriptionContainer: {
        flex: 1,  // 使得容器占满剩余空间
        minHeight: 100, // 这将确保容器至少有100单位的高度
        padding: 5,
        marginVertical: 10,  // 在描述上下添加空间
        marginHorizontal:10,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 0,
        backgroundColor: colors.lightBlue,  // 可以根据你的设计进行修改
      },
      description: {
        fontSize: 16,
        color: colors.black,  // 颜色可以根据需要调整
      },

      detailsBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
        backgroundColor: colors.lightBlue,
      },
   
      detailText: {
        fontSize: 16,
        color: colors.black,
        marginLeft: 5, // Spacing between icon and text
      },

      buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      },
  });
  
  