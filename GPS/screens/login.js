import { View,Text,TextInput,TouchableOpacity,StyleSheet,Image, TouchableWithoutFeedback, Keyboard ,BackHandler,Alert} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React,{useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import {useFocusEffect} from '@react-navigation/native';
import Toast from "react-native-toast-message";



const LoginView = ({navigation}) => {

    const[number,setNumber]=useState("");
    const[password,setPassword]=useState("");

    const handleSubmit= (e) =>{
       // console.log(number,password)
        const userData={
            number:number,
            password:password
        }
console.log(userData)
        axios
        .post('http://192.168.41.40:3001/login-user',userData)
        .then(res=>{
            if(res.data.status=='OK'){
                AsyncStorage.setItem('keepLoggedIn',JSON.stringify(true))
               AsyncStorage.setItem('token',res.data.data)
           navigation.navigate('Home');
        
                Toast.show("logged in Successfully")
            }
            else{
                Toast.show("Check Credentials")
            }
    })
    }

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
    
      useFocusEffect(
        React.useCallback(() => {
          BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
          };
        },[]),
      );
    


    return(
        <KeyboardAwareScrollView >
    <TouchableWithoutFeedback onPress={()=>(Keyboard.dismiss())} >
        <View style={styles.container}>

            <View style={styles.header}>

                        <Text>LOGO</Text>

                        <TouchableOpacity style={styles.button_signup} onPress={()=> navigation.navigate("Signup")} >
                            <Text style={styles.button_txt}>Sign up</Text>
                        </TouchableOpacity>

            </View>


            <View style={styles.main_container}>
                    
                    <Image ></Image>

                    <View style={styles.login_box}>

                        <Text style={{fontSize:30,marginBottom:30}}>Log in</Text>

                        <TextInput style={styles.input} placeholder="Enter Mobile Number" value={number} onChangeText={text=>
                        setNumber(text)}
                        keyboardType="numeric"/>

                        <TextInput style={styles.input} placeholder="Enter Password" value={password} onChangeText={text=>setPassword(text)} 
                        secureTextEntry={true} autoComplete="password"/>

                        <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                            <Text style={styles.button_txt}>Login</Text>
                        </TouchableOpacity>


                    </View>


            </View>
            
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default LoginView;

const styles = StyleSheet.create({

container:{
    display:"flex",
    flex:1,
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
    width:"100%",
    

},

header:{marginTop:30,
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth:1,
    borderColor:"black",
    width:"100%",
    backgroundColor:"#f5f6fa"
},

main_container:{
    flex:1,
    display:"flex",
    flexDirection: 'column',
    width:"100%",
    justifyContent:"center",  
    alignItems:"center",
},
login_box:{
    marginTop:"40%",
    width:"75%",
    borderRadius:5,
    height:"auto",
    justifyContent:"center",
    alignItems:"center",
},

input:{
    width:"100%",
    height:"px",
    
    justifyContent:"center", 
    borderColor: "black",
    borderWidth:2,
    borderRadius:5,
    margin:10,
    padding:10,
    color:"#000000",
    fontSize:16,
    
},


button:{
    width:"",
    
    backgroundColor:"black",
    justifyContent:"center", 
    borderColor: "black",
    borderWidth:2,
    borderRadius:5,
    margin:20,
    padding:8,
    paddingHorizontal:40,
    

},

button_signup:{
    
    backgroundColor:"black",
    justifyContent:"center", 
    borderColor: "black",
    borderWidth:2,
    borderRadius:5,
    margin:10,
    padding:8,
    paddingHorizontal:20,

},

button_txt:{
    color:"#ffffff",
    justifyContent:"center",
    textAlign: "center",
    fontSize:16,
    fontWeight:"bold",
    padding:5,

},

});