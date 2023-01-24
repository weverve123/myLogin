import { View, Text, TextInput,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';

export default function ProfileDetails() {
 
    const [lastName,SetLastName]=useState();
    const [mobNumber,SetmobNumber]=useState();
    const [adress,Setadress]=useState();
    const [cureentUid,setCurrentUid]=useState();
    const [list,setList]=useState();
    const [updateUid,setUpdateUid]=useState();
    useEffect(()=>{
         getUser();
         getDatabase();
    },[cureentUid])

    const getUser=()=>{
        const userData= firebase.auth().currentUser.uid
       console.log(userData);
       setCurrentUid(userData); 
   }  

   
   const getDatabase= async () =>{
    try {
     
      const ref =firestore().collection(cureentUid)
   
      return ref.onSnapshot(qurerySnapshot =>{
        const list=[]
        console.log(qurerySnapshot,"qurerySnapshot")
        qurerySnapshot.forEach((doc)=>{
          const {lastName,mobNumber,adress,id}=doc.data()
        
          list.push({
            id:id,
            lastName,
            mobNumber,
            adress
          })
         console.log(list);
          setList(list)
          setUpdateUid(id)
        }     
        )
       
      }) 
       
    } catch (error) {
      console.log(error);
    }
  }


   const handleProfileData=async()=>{      
    try {   
     if(lastName.length >0 && mobNumber.length >0 && adress.length >0)
     {
       const userData ={
         id:cureentUid,
         lastName:lastName,
         mobNumber:mobNumber,
         adress:adress
      }   
     
      SetLastName('');
      Setadress('');
      SetmobNumber('');

     await firestore().collection(cureentUid).add(updateUid).then(ref =>{
       console.log(ref)
     })
    
     }
     else{
       alert ("Plese enter the task  // id:doc.cureentUid,")  
     }
     } 
    
     catch (error) {
       console.log("error");

    }
    console.log("welcome")
 }

  const handleUpdateProfileData=async()=>{
    console.log("handleUpdateProfileData...")
    try {   
        if(lastName.length >0 && mobNumber.length >0 && adress.length >0)
        {
            const UpdateduserData ={
                id:cureentUid,
                lastName:lastName,
                mobNumber:mobNumber,
                adress:adress
             }   
             SetLastName('');
             Setadress('');
             SetmobNumber('');
        //  await firestore().collection("todos").add(TodoData);     
        await firestore().collection(cureentUid).doc().update(UpdateduserData)
        .then(ref =>{
          // console.log(ref)
        })
        // await firestore().collection("todos").add(TodoData)
        }
        else{
          alert ("Plese enter the task  // id:doc.cureentUid,")  
        }
        } 
       
        catch (error) {
          console.log("error");
    
       }
  }

  return (
    <View style={{flex:1}}>
        <View>
         <View>
            <View style={{justifyContent:"center",alignItems:"center"}}>
              <Text style={{top:40,fontSize:30,fontWeight:"bold",color:"black"}}>Profile Details</Text>
           </View>
           <View style={{justifyContent:"center",alignItems:"center",marginTop:-100}}>
        <FlatList
           data={list}
           renderItem={({item})=>
            <View>
              {/* <View>
                <Text style={styles.userData}>{item.id}</Text>
              </View> */}
              <View>
                <Text style={styles.userData}>{item.lastName}</Text>
              </View>
              <View>
                <Text style={styles.userData}>{item.mobNumber}</Text>
              </View>
              <View>
                <Text style={styles.userData}>{item.adress}</Text>
              </View>
              
           </View>      
          }
          keyExtractor={item => item.id}
        />
       
         </View>
         </View>
        </View>
      <View>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <View style={{height:50,width:170,backgroundColor:"#D3D3D3",left:10}}>
          <TextInput placeholder='Enter your Last name' 
           value={lastName}
            onChangeText={(text)=>{
            SetLastName(text)
          }}
          />
         </View>

         <View style={{height:50,width:170,backgroundColor:"#D3D3D3"}}>
          <TextInput  
          placeholder='Mobile Number'
          keyboardType='numeric'
          value={mobNumber}
          onChangeText={(text)=>{
          SetmobNumber(text)
          }}
          />
         </View>

        </View>

        <View style={{height:50,width:350,backgroundColor:"#D3D3D3",marginTop:20,left:25}}>
            <TextInput placeholder=' Enter Your Address'
              value={adress}
              onChangeText={(text)=>{
             Setadress(text)
              }}
            />
        </View>
   
     </View>
     <View style={{marginTop:30,flexDirection:"row",justifyContent:"space-around"}}>
        <TouchableOpacity
        onPress={()=>handleProfileData()}
        >
            <View style={{justifyContent:"center",alignItems:"center",}}>
                <View style={styles.btnUpdateProfile}>
                    <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>
                    Save Details
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
          onPress={()=>handleUpdateProfileData()}
          >
             <View>
                <View style={styles.btnUpdateProfile}>
                    <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>
                        Update Profile
                        </Text>
                </View>
             </View>
          </TouchableOpacity>
        </View>

     </View>
    </View>

  )
}

const styles = StyleSheet.create({
    btnUpdateProfile:{
        height:50,
        width:150,
        backgroundColor:"#1eb186",
        justifyContent:"center",
        alignItems:"center"
    },
    userData:{
        fontSize:20,
        fontWeight:'bold',
        color:"black"
    }
});