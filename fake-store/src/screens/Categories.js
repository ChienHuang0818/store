// Categories.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import colors from '../constants/colors';
import { fetchCategories } from '../services/apiServices';
import { capitalizeFirstLetter } from '../utils/stringUtils';

export const Categories = () => {

  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);


  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // 这里使用 navigation.navigate 方法，将类别名称作为参数传递给 ProductList 屏幕
        navigation.navigate('Productlist', { category: item.title });
        
      }}
    >
      <Text style={styles.title}>{capitalizeFirstLetter(item.title)}</Text>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.darkBlue} />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50, // Adjust the margin as needed
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
    fontWeight: 'bold',
  },
});

