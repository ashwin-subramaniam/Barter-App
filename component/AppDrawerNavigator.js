import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupLoginScreen from '../screens/SignupLoginScreen';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './customSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen: AppTabNavigator
    },
    Setting:{
        screen: SettingsScreen
    }
},
{
    contentComponent: CustomSideBarMenu
},
{
    initialRootName: 'Home'
}
)

