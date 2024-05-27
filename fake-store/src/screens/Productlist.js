//Productlist.js
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity,StyleSheet, ActivityIndicator,Image } from 'react-native';
import colors from '../constants/colors';
import { Button } from '../components/Button';
import { fetchProductsByCategory } from '../services/apiServices';


export const Productlist = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { category } = route.params;  // route.params 包含了传递给该屏幕的所有参数
  
  useEffect(() => {
    const getProducts = async () => {
      try {
          const data = await fetchProductsByCategory(category);
          setProducts(data);
          setLoading(false);
      } catch (error) {
          setLoading(false);
          console.error(error);
      }
    };

      getProducts();
    }, [category]);// 当 category 改变时，重新运行这个 useEffect


  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}
      onPress={() => {navigation.navigate('Productdetail', { id: item.id });
      }} >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.textContainer}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
        {item.title}
      </Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>{category}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.black} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button 
          title="Back" 
          iconName="arrow-back" // 使用Ionicons中的图标名称
          onPress={() => navigation.goBack()} 
        />
      </View>
        
    </View>
    
  );
};  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0, // 由 marginTop 改为 paddingTop，防止 marginTop 影响子视图布局
      backgroundColor: colors.white,
      
    },
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 10,
      backgroundColor: colors.lightBlue,
      alignItems: 'center', // 垂直居中对齐图片和文本
  },
  textContainer: {
    flex: 1, // 确保文本容器可以伸缩
    marginLeft: 10,
    justifyContent: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
},
    listContainer: {
      alignItems: 'stretch', // Stretch list items to match the container width
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      flexShrink: 1, // 允许文本在必要时收缩 
    },
    price: {
      fontSize: 15,
  },
  buttonContainer: {
    justifyContent: 'center', // 水平居中按钮
    padding: 10,
    width: '100%', 
  },
  backButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
},
backButtonText: {
    fontSize: 18,
    color: colors.black,
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
   

    categoryHeader: {
      marginHorizontal: 16,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grey, // 或者选择其他背景颜色
    },
    categoryHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.black,
    },
  });
  
  
  export default Productlist;