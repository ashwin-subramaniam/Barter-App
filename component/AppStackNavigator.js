import React from 'react';
import {CreateAppStackNavigator} from 'react-navigation-stack';
import {UserDetailsScreen} from '../screens/UserDetailsScreen';
import {HomeScreen} from '../screens/HomeScreen';

export const AppStackNavigator = CreateAppStackNavigator({
   itemDonateList:{
       screen : HomeScreen,
       navigationOptions:{
           headerShown: false
       }
   },
   UserDetails:{
       screen: UserDetailsScreen,
       navigationOptions:{
           headerShown: false
       }
   },

},
{
  initialRootName: 'itemDonateList'
})