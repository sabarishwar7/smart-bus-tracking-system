import React,{useState,useEffect} from 'react';
import { useCallback } from 'react';
import{View,Text,StyleSheet,ScrollView,TouchableOpacity,TextInput,RadioButton} from 'react-native';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const SettingsView=({navigation})=>{

    const [userData,setUserData]=useState('')

   
    async function getData(){
    
        
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        
       axios
        .post('http://192.168.41.40:3001/userdata',{token: token})
        
        .then(res =>{console.log(res)
            setUserData(res.data.data)
            
    
         })
    }

useEffect(()=>{
  getData()
},[])





const name=userData.name;
        const busno=userData.busno;
        const usertype=userData.usertype;
        const number=userData.number;


        return (
            <ScrollView
              keyboardShouldPersistTaps={'always'}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 40}}
              ><View style={styles.container}>
                <View style={styles.header}><Text>Profile</Text></View>
                <View style={styles.body}>
                    <Text style={styles.text}>Name:<View styles={styles.value}><Text style={styles.textvalue}>{name}</Text></View> </Text>
                    <Text style={styles.text}>Bus Number:<View styles={styles.value}><Text style={styles.textvalue}>{busno}</Text></View>  </Text>
                    <Text style={styles.text}>User Type:<View styles={styles.value}><Text style={styles.textvalue}>{usertype}</Text></View> </Text>
                    <Text style={styles.text}>Mobile:<View styles={styles.value}><Text style={styles.textvalue}>{number}</Text></View>  </Text>
                </View>
                <View style={styles.footer}>
                  <TouchableOpacity style={styles.button} onPress={()=>
                  {Toast.show("Logged out Successfully")
                    navigation.navigate('Login')}}>
                    <Text style={{color:"red"}}>LOG OUT</Text>
                  </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
          );
        }
        
    


export default SettingsView;

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"column",
        justifyContent: "center",
        paddingLeft:"10%",
        paddingRight:"10%",
        height:'100%',
        width:"100%"
    },
    header:{
      paddingTop:20,
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20,
      borderBottomWidth:1,
      borderBottomColor:"#000"
    },
    body:{
      paddingTop:20,
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20,
      borderBottomWidth:1,
      borderBottomColor:"#000",
      
      borderBlockColor:"red"
    },
    textvalue:{
        fontSize:20,
        color:"#000",
        textAlign: "left",

    },
    value:{
      
      borderBlockColor:"#000",
      borderWidth:"2px"
    },
    footer:{
      paddingTop:20,
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20,
      borderBottomWidth:1,
      borderBottomColor:"#000",
      justifyContent: "center",
      alignItems: "center",
      borderBlockColor:"red"
    }
    });