import { View, Text ,StyleSheet,TouchableOpacity,PermissionsAndroid,Image} from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {getStorage} from "firebase/storage";
export default function UplodeImage() {

  const [cameraPhoto,setCameraPhoto]=useState();  
  const [galleryPhoto,setGalleryPhoto]=useState();

  useEffeact(()=>{
    const storeImage=async()=>{
       
    }

    if(galleryPhoto!= null)
    {
      storeImage();
      setGalleryPhoto();
    }

  },[galleryPhoto])

    let options ={
        saveToPhotos:true,
        mediaType:'photo'
    };

    const opeanCamera=async()=>{
       const granted=await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
       );
       if(granted === PermissionsAndroid.RESULTS.GRANTED)
       {
        const result =await launchCamera(options);
        setCameraPhoto(result.assets[0].uri);
        
       }
    }

    const opeanGallery =async()=>{
      const result = await launchImageLibrary(options);
      setGalleryPhoto(result.assets[0].uri);
      // console.log(result.assets[0].uri);
      console.log(result);
    }

  return (
    <View>
    <View style={{justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity
        onPress={opeanCamera}
        >
        <View style={styles.takeImagesbtn}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>UplodeImage</Text>
        </View>
        </TouchableOpacity>
        <View style={{top:60}}>
            <Image style={{height:200,width:200}} source={{uri:cameraPhoto}}/>
        </View>
       </View>

       <View style={{justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity
        onPress={opeanGallery}
        >
        <View style={styles.takeImagesbtn}>
            <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>Open Gallery</Text>
        </View>
        </TouchableOpacity>
        <View style={{top:60}}>
            <Image style={{height:200,width:200}} source={{uri:galleryPhoto}}/>
        </View>
       </View>
    </View> 
  )
}
const styles = StyleSheet.create({
    takeImagesbtn:{
        top:40,
        height:50,
        width:300,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FF4E00",
        borderRadius:10
    }  
})