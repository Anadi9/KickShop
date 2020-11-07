/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
      <DrawerItem title="Home" />
      <DrawerItem title="Login" />
      <DrawerItem title="Register" />
    </Drawer>
  );

  export const DrawerNavigator = () => (
    <Navigator drawerContent={props => <DrawerContent {...props}/>}>
    <Screen name="Home" component={HomeScreen}/>
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen}/>
    </Navigator>
  );

  export const SideDrawer = () => (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
);
