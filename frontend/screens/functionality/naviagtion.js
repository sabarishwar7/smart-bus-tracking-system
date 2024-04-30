import React, { Component } from 'react';
import SignupView from '../signup';
import Homeview from '../home';
import LoginView from '../login';
import SettingsView from '../settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack=createNativeStackNavigator();

const HomeStack =()=>{
    return(
        <Stack.Navigator
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Homeview}/>
            <Stack.Screen name="Settings" component={SettingsView}/>
        </Stack.Navigator>
    )
}


export const CredStack= ()=>{
    return(
        <Stack.Navigator
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginView}/>
            <Stack.Screen name="Signup" component={SignupView} />
            <Stack.Screen name="Home" component={Homeview}/>
            <Stack.Screen name="Settings" component={SettingsView}/>
 
            
        </Stack.Navigator>
    )
}