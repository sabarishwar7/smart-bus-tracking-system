import { View,Text,TextInput,TouchableOpacity,StyleSheet,Image, TouchableWithoutFeedback, Keyboard,} from "react-native";
import React,{useState,UseEffect,useNavigation} from "react";
import Axios from "axios";

import {Picker} from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigate } from "react-router-dom";
import Toast from "react-native-toast-message";


const navigation = useNavigation;


const SignupView = ({navigation}) => {

    const[name,setName]=useState("")
    const[number,setNumber]=useState("");
    const[password,setPassword]=useState("");
    const [usertype, setUsertype] = useState(null);
    const[busno,setBusno]=useState("");
    

const handleSubmit= (e) => { 
    const userdata={
        name:name,
        usertype:usertype,
        busno:busno,
        number:number,
        password:password,
};

    Axios.post('http://192.168.41.40:3001/register',userdata)
    .then(res => {console.log(res.data)
        Toast.show("Registered Successfully")
        navigation.navigate('Login')
    
    })
    .catch(err=>
    Toast.show("User Already Exists")
    );

}


    return(
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={()=>(Keyboard.dismiss())}>
        <View style={styles.container}>

            <View style={styles.header}>

                        <Text>LOGO</Text>

                        <TouchableOpacity style={styles.button_login} onPress={()=> navigation.navigate("Login")}>
                        <Text style={styles.button_txt}>Login</Text>
                        </TouchableOpacity>

            </View>


            <View style={styles.main_container}>
                    
                    <Image ></Image>

                    <View style={styles.signup_box}>
                    
                    <Text style={{fontSize:30,marginBottom:30}}>Sign Up</Text>
                        
                    <View style={styles.input}>
                        <Picker
                        
                            selectedValue={usertype}
                            onValueChange={(itemValue, itemIndex) => {
                              setUsertype(itemValue)
                            }}
                            
                            
                        >
                            <Picker.Item label="Who are you ?" value="null" />
                            <Picker.Item label="Passenger" value="PASSENGER" />
                            <Picker.Item label="Driver" value="DRIVER" />
                        </Picker>
                        </View>
                        
                       

                        <TextInput style={styles.input} placeholder="Enter Your name" value={name} onChangeText={text=>
                        setName(text)}/>

                        <TextInput style={styles.input} placeholder="Enter Bus Number" value={busno} onChangeText={text=>
                        setBusno(text)}/>

                        <TextInput style={styles.input} placeholder="Enter Mobile Number" value={number} onChangeText={text=>
                        setNumber(text)}
                        keyboardType="numeric"/>

                        <TextInput style={styles.input} placeholder="Set Password" value={password} onChangeText={text=>setPassword(text)} 
                        secureTextEntry={true} autoComplete="password"/>

                        <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                            <Text style={styles.button_txt}>Register</Text>
                        </TouchableOpacity>
                        
                       

                    </View>

            </View>
            
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default SignupView;

const styles = StyleSheet.create({

container:{
    display:"flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    height:'100%',
    width:"100%"

},

header:{marginTop:30,
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    
    width:"100%",
    
},

main_container:{
    flex:1,
    flexDirection: 'column',
    width:"100%",
    justifyContent:"center",  
    alignItems:"center",
    marginTop:50,
},
signup_box:{

    width:"75%",
    borderRadius:5,
    height:"auto",
    justifyContent:"center",
    alignItems:"center",
},

input:{
    width:"100%",
    height:"20px",
    
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
    width:"auto",
    
    backgroundColor:"black",
    justifyContent:"center", 
    borderColor: "black",
    borderWidth:2,
    borderRadius:5,
    margin:20,
    padding:8,
    paddingHorizontal:40,
    

},

button_login:{
    
    backgroundColor:"black",
    justifyContent:"center", 
    borderColor: "black",
    borderWidth:2,
    borderRadius:5,
    margin:10,
    padding:8,
    paddingHorizontal:30,

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