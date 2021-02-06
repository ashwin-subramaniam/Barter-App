import React,{Component} from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen'

export const AppTabNavigator = createBottomTabNavigator({
  GetRequests: {
   screen: HomeScreen,
  navigationOptions: {
      tabBarIcon: <Image source={require('../assets/homescreen.png')} style={{width: 20,height: 20}}/>,
      tabBarLabel: "HomeScreen"
    }
},
  AddItems: {
   screen: ExchangeScreen,
   navigationOptions: {
       tabBarIcon: <Image source={require('../assets/exchange.png')} style={{width: 20,height: 20}}/>,
       tabBarLabel: "Exchange"
   } 
} 
})