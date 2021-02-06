import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppTabNavigator} from './component/AppTabNavigator';
import { AppDrawerNavigator } from './component/AppDrawerNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen: {screen: SignupLoginScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
