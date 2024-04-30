import React from'react'
import { View,Text,maps, TouchableOpacity,Image, ImageBackground, BackHandler,Alert} from "react-native";
import { StyleSheet } from "react-native";
import MapView,{PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps';
import * as Location from "expo-location"
import {useRef,useEffect, useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapViewDirections from 'react-native-maps-directions';

  import {useFocusEffect} from '@react-navigation/native';
  import Toast from 'react-native-toast-message';

const Homeview =({navigation}) => {
const bus=[{busno:"ABC",location:{latitude:12.922915,longitude:80.127457}},]
const [destination,setDestination]=useState({})
 /*   let driverbus=[]
    const driverloc=[]




const trackbus=()=>{
    if(driverbus.includes(busno)){
        console.log("change")
     let index=driverbus.indexOf(busno)
     loc[index]=driverloc
    /* setDriverloc(loc[index])
     if(driverloc!=loc[index]){
         setDriverloc(loc[index])
         
        
     }


    }
    else{
    driverbus.append(toString(busno))
    loc.append(toString(driverloc))
    console.log("appeded")
    }

}

const trackpath=()=>{
    if(driverbus.includes(busno)){
        let index=driverbus.indexOf(busno)
        origin=latlng
        destination=loc[index]

}
else{
    Toast.show("Bus not found")
}
}*/
const [loc,setLoc]=useState([])
const driverpress=()=>{
    
    axios.post('http://192.168.194.40:3001/locdata',{name,number,busno,latlng})
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
    

    setInterval(driverpress,2000)
   
  

}

const getloc=()=>{
    axios.get('http://192.168.194.40:3001/getlocdata')
        .then(res=>{
         setLoc(res.data.data)})
        .catch(err=>console.log(err))
}




const passpress=()=>{
   

    setDestination(loc.filter((item,index)=>{
        
        if(item.busno==busno){
            return item.location
        }
        else{
            return "Bus not Found"
        }

    }))
}
    







const [latlng,setLatlng] = useState({})
const checkPermission=async()=>{
    const hasPermission=await Location.requestForegroundPermissionsAsync();
    if(hasPermission.status === 'granted'){
        const permission =await askPermission();
        return permission
    }
    return true;
};

const askPermission= async()=>{
    const permission =await Location.requestForegroundPermissionsAsync()
    return permission.status === 'granted';
};

const getLocation = async()=>{
    try {
        const{granted} =await Location.requestForegroundPermissionsAsync();
        if(!granted)return ;
        const {
            coords:{latitude,longitude},
          }= await Location.getCurrentPositionAsync();
        setLatlng({latitude:latitude,longitude:longitude});
        setOrigin(latlng)

        
        }catch(err){

        }

    }

const _map=useRef(1);

useEffect(()=>{
    checkPermission();
    getLocation()
    /*console.log(latlng)*/
,[]})

useEffect(()=>{
    getloc()
    passpress()
},[5000])




const [userData,setUserData]=useState('')

async function getData(){

    
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    
   axios
    .post('http://192.168.194.40:3001/userdata',{token: token})
    
    .then(res =>{console.log(res)
        setUserData(res.data.data)
        

     })
}

const name=userData.name;
        const busno=userData.busno;
        const usertype=userData.usertype;
        const number=userData.number;





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
  useEffect(() => {
    
  }, [10000]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
      
    },[]),
  );

    return ( 
        
        <View >
            <View style={styles.mapview}>
                
                    <MapView style={styles.map} 
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        toolbarEnabled={true}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        zoomEnabled={true}
                        showsTraffic={true}
                        
                    
                    >
                     {/* {
                            bus.map((item,index)=>
                        <MapView.Marker coordinate={item} key= {index.toString()} >
                            <Image 
                            source={require('../assets/bus.png')}
                            style={styles.marker}
                            resizeMode="cover"
                            />
                        </MapView.Marker>
                       
                     )}*/}

                    {
                    (loc.map((item,index)=> 
                                <Marker
                                    coordinate={item.location} key={index.toString()}
                                    d
                                    
                                    >
                                        
                    <Image style={{width:70,height:70,resizeMode:"contain",padding:0,margin:0}} 
                    source={require('../assets/bus.png')}></Image>
                    <Callout style={{width:"fit",height:"fit"}}>
                        <Text>Bus No: {item.busno}</Text>
                        </Callout>
                    </Marker>)
                    )
                    }
                    
                  {/*  <MapViewDirections
    origin={latlng}
    destination={destination}
    
                />*/}
            
                    
                    
                    </MapView>

                       
                
            </View>

            <View style={styles.interface}>
                <View style={styles.option}>
                <TouchableOpacity style={styles.option_btn} onPress={()=> navigation.navigate("Settings",)}>
                    <Ionicons name="settings" size={30} color="black"/>
                        
                </TouchableOpacity>
                <Text style={styles.info_txt}>Hi {name} {userData.usertype==='DRIVER'?"lets drive!":"Be ready"}</Text>
                <TouchableOpacity style={styles.option_btn} >
                    <Ionicons name="chatbubble" size={30} color="black" />
                        
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={usertype=="DRIVER"?()=>driverpress():()=> console.log("user")}>
                    <Text style={styles.button_txt}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
        

        );
};

export default Homeview;




const styles = StyleSheet.create({
container:{
    
    flex:1,
    flexDirection: 'column',
    width:"100%"
},
mapview:{
   width:"100%",
   backgroundColor:"skyblue",
   height:"80%",
   justifyContent:"center",
   alignItems:"center",
   


},
interface: {
    width:"100%",
    height:"20%",
    backgroundColor:"white",
    justifyContent:"space-around",
    alignItems:"center",
    borderTopWidth:1,
   borderTopColor:"black"
    

},
option:{
    width:"100%", 
    display:'flex', 
    flexDirection:"row", 
    justifyContent:"space-between",
    alignItems:"center",
},

option_btn:{
    padding:10,
    borderRadius: 50,
    display:'flex', 
    flexDirection:"row", 
    marginHorizontal:10,
    backgroundColor:"#ffffff",
    borderWidth:1,
    borderColor: "#000",
    shadowColor:"#000000",
    shadowOpacity:0.7,
    elevation:1,
    

    
},

button:{
    
    backgroundColor:"black",
    width:"75%",
    padding:15,
    borderRadius: 10,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
    

},

button_txt:{
    color:"white",
    fontWeight:"bold",
    fontSize:20,

},

info_txt:{
    color:"black",
    fontWeight:"bold",
    fontSize:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

},

container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  }

});


