// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store/store";

// Screens
import { Categories } from './src/screens/Categories';
import { Productlist } from './src/screens/Productlist';
import { Productdetail } from './src/screens/Productdetail';
import { Cart } from './src/screens/Cart';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

// Navigation setup
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProductStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Categories" component={Categories} />
    <Stack.Screen name="Productlist" component={Productlist} />
    <Stack.Screen name="Productdetail" component={Productdetail} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  const cartItemCount = useSelector(state => state.cart.totalItems);
  const user = useSelector(state => state.user.user);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Products" 
        component={ProductStack} 
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" size={size} color={color} />)
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarLabel: 'My Cart',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="shopping-cart" size={size} color={color} />),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : null,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={user ? UserProfileScreen : SignInScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="person" size={size} color={color} />)
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
    <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ title: 'User Profile' }} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
