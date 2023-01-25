import { View, Text,StyleSheet,TouchableOpacity, Alert} from 'react-native'
import Todo from './Todo';
import React, { useEffect, useState } from 'react'
import SignIn from './SignIn';
import auth, { firebase } from '@react-native-firebase/auth';
import ProfileDetails from './ProfileDetails';
import UplodeImage from './UplodeImage';

export default function Home({navigation}) {

    const [name,setName]=useState();
    useEffect(() => {
        getUser();
      }, [])

    const handleLogout=async()=>{
        try{ 
            auth() .signOut().then(() => navigation.navigate(SignIn));
            alert("LogOut succssesfully done");
        }

        catch(err)
        {
           console.log(err)
        }
    }
    
   
  
  const getUser=async()=>{
    const userData= await firebase.auth().currentUser.email

    const username=userData.slice(0,5).toUpperCase()
    // console.log(userData);
   setName(username);
 }  

  return (
    <View style={styles.main}>
       <View>
          <Text style={styles.Heading}>Welcome to {name}</Text>
       </View>
  
       <View style={{height:40,backgroundColor:"black",width:200,
                 top:10,justifyContent:"center",alignItems:"center",borderRadius:10,marginBottom:20}}>
         <TouchableOpacity
         onPress={()=>navigation.navigate(ProfileDetails)}
         >
            <View>
                <Text style={{fontSize:20,color:"white",fontWeight:"bold"}}>Update Profile</Text>
            </View>
         </TouchableOpacity>
       </View>
       <View>
        <TouchableOpacity
        onPress={()=>navigation.navigate(Todo)}
        >
        <View style={styles.maketodobtn}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Make Your Todos</Text>
        </View>
        </TouchableOpacity>
       </View>

       <View>
        <TouchableOpacity
        onPress={()=>navigation.navigate(UplodeImage)}
        >
        <View style={styles.takeImagesbtn}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Take Iamge</Text>
        </View>
        </TouchableOpacity>
       </View>

       <View style={styles.logOutBtn}>
         <TouchableOpacity
          onPress={()=>handleLogout()}
         >
            <View>
                <Text style={{fontSize:20,color:"red",fontWeight:"bold"}}>LogOut</Text>
            </View>
         </TouchableOpacity>
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    Heading:{
        fontSize:30,
        fontWeight:'bold',
        color:"red"
    },
    maketodobtn:{
        top:20,
       height:50,
       width:300,
       justifyContent:"center",
       alignItems:"center",
       backgroundColor:"#007FFF",
       borderRadius:10
    },
    logOutBtn:{
        height:40,
        top:60
    },
    takeImagesbtn:{
        top:40,
        height:50,
        width:300,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FF4E00",
        borderRadius:10
    }
});