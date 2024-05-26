import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from'react';
import { StyleSheet, Text, View , BackHandler } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupView from './screens/signup';
import Homeview from './screens/home';
import LoginView from './screens/login';
import SettingsView from './screens/settings';
import * as SplashScreen from 'expo-splash-screen';


const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'green',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: 'red',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'red',
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};




const LogNav = () =>{
  const stack = createNativeStackNavigator();
  return(
    <stack.Navigator screenOptions={{headerShown:false}}>
      <stack.Screen name="Login" component={LoginView}/>
      <stack.Screen name="Signup" component={SignupView}/>
      <stack.Screen name="Home" component={Main}/>
      
      <stack.Screen name="Settings" component={SettingsView}/>  
    </stack.Navigator>
  )
};

const Main =() =>{
  const stack = createNativeStackNavigator();
  return(
    <stack.Navigator screenOptions={{headerShown:false}}>
      <stack.Screen name="Home" component={Homeview}/>    
      <stack.Screen name="Login" component={LoginView}/>
    </stack.Navigator>
  )
}




export default function App() {

  const [islogged,setIslogged]=useState(false)
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
    setIslogged(data);
    
  }

  useEffect(() => {
    getData();
    console.log(islogged);
    setTimeout(() => {
      SplashScreen.preventAutoHideAsync();
    }, 300);
  }, [islogged]);
 


  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

/* 
*/



  return (
    <NavigationContainer>
    {islogged ?  (
      <LogNav />
    ) : (
      <LogNav />
    )}
    
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    width:"100%",
    marginTop:"10px",
  },
});
