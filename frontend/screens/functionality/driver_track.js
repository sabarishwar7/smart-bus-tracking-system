import { StyleSheet } from "react-native";
import { View,Text } from "react-native";

const MainView =({props}) => {
    const{busno,latlang}=props.route.params
    console.log(busno,latlang)
  



return ( 
    <View>
        <Text>{`${busno} ${latlang}`}</Text>
    </View>
    );
};






export default MainView;




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


