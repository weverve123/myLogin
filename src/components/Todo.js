import { View, Text,TextInput, TouchableOpacity, StyleSheet,FlatList,} from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
// import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'


export default function Todo() {

  const [task,setTask]=useState();
  const [list,setList]=useState();
  const [cureentUid,setCurrentUid]=useState();
  const [updateUid,setUpdateUid]=useState();
  // const ref= firestore().collection('todos')
  
  useEffect(()=>{

    getDatabase();
     getUser();

  },[cureentUid]);


  const getDatabase= async () =>{
    try {
     
      const ref =firestore().collection(cureentUid)
     // console.log(ref)
      return ref.onSnapshot(qurerySnapshot =>{
        const list=[]
        console.log(qurerySnapshot,"qurerySnapshot")
        qurerySnapshot.forEach((doc)=>{
          const {task}=doc.data()
          list.push({
            id:doc.id,
            task,
          })
          // if(cureentUid === toDosid){
          // setList(list)
          // }
          setList(list)
        }     
        )
       
      }) 
       
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdd=async()=>{      
     try {   
      if(task.length >0)
      {
        const TodoData ={
          id:cureentUid,
          task:task
       }   
       setTask('');
      //  await firestore().collection("todos").add(TodoData);     
      await firestore().collection(cureentUid).add(TodoData).then(ref =>{
        console.log(ref)
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

  const getUser=()=>{
     const userData= firebase.auth().currentUser.uid
   // console.log(userData);
    setCurrentUid(userData);

    // getAuth().getUser(uid).then((userRecord) => {
    //      console.log(userRecord);
    // }) 
}  

   const handleDelete=(item)=>{
    try {
       firestore().collection(cureentUid).doc(item.id).delete().then((data) => {
    // console.log('User deleted!',data);
    console.log();
    });
    }
     catch (error) {
       
      console.log(error)
    }
    
   }

  const handleEdit=(item)=>{
      
    // console.log("This is edit",item)
    setTask(item.task)
    setUpdateUid(item.id)
  }

 const hadleSave=async()=>{

   console.log("This is save");  
   
   try {   
    if(task.length >0)
    {
      const TodoData ={
        id:cureentUid,
        task:task
     }   
     setTask('');
    //  await firestore().collection("todos").add(TodoData);     
    await firestore().collection(cureentUid).doc(updateUid).update(TodoData)
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
    <View style={styles.main}>
      <View style={{width:320,
        backgroundColor:"#D3D3D3",
        height:40,}}>
        <TextInput placeholder='Enter Your Task'
         value={task}
         onChangeText={(text)=>setTask(text)}
        />
      </View>  
      
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity 
         onPress={()=>handleAdd()}
        >
         <View style={styles.addBtn}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"bold",color:"white"}}>
                Add Todo
            </Text>
         </View>
        </TouchableOpacity>

        <View>
          <TouchableOpacity
          onPress={()=>hadleSave()}
          >
            <View style={styles.saveBtn}>
              <Text style={{fontFamily:"bold",fontSize:20,color:"white"}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
      <View>
        <FlatList
           data={list}
           renderItem={({item})=>
           <View style={{top:10}}>
            {/* <TouchableOpacity
            onPress={()=>handleDelete(item)}
 
            >  */}

            <View style={{flexDirection:"row",justifyContent:'space-between'}}>
              <View>
                <Text style={styles.listTodo}>{item.task}</Text>
              </View>

              <View>
              <Text> <AntDesign name="delete" size={30} color="#900" 
              onPress={()=>handleDelete(item)}
              />
               </Text> 
               </View>

               <View>
              <Text> <AntDesign name="edit" size={30} color="#900" 
              onPress={()=>handleEdit(item)}
              />
               </Text> 
               </View>

           </View> 
           {/* </TouchableOpacity> */}
           </View>
           
          }
          keyExtractor={item => item.id}
        />
       

      </View>
    </View>

  )
}

const styles = StyleSheet.create({
    main:{
      top:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:40
    },
    addBtn:{
        height:40,width:200,backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",marginTop:20,
        borderRadius:10,
        top:10
    },
    listTodo:{
      fontSize:25,
      fontWeight:'bold',
      color:'black',
      paddingBottom:10,
    
    },
    saveBtn:{
      height:40,width:100,backgroundColor:"green",
      top:30,
      justifyContent:"center",alignItems:"center",
      borderRadius:10,
      left:10
    }
})