
import React, {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator, 
Alert, StyleSheet } from 'react-native';
import { Button, TextInput, IconButton,
 } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as base from "../api/api";
//import styles from './css/Contact'


function Contact(props) {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [phoneNo, setPhoneno] = useState('');
const [isloading, setIsloading] = useState(false);

   const start = () => {
     
   if(firstName == "" || lastName == "" || phoneNo == "")
   {
         alert('Insert the Required Fields')
   }
   else{
   setIsloading(true)  
    var data = {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo
    }
    fetch(base.BASE_URL + '/addcontact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          console.log(responseJson.message);
           if(responseJson.message == 'success')
           {
            props.navigation.navigate('Dashboard');
           }
           else{
            setIsloading(false)
           }
     }
        else {
            setIsloading(false)
        }
      }).catch((error) => {
        console.error(error);
      });

   }
   }


   return (
      <View style={styles.inputContainer}>
       {
            isloading == true ?
            <View style={styles.spinner}>
            <ActivityIndicator size={32}/>
            </View>
       :
        <View style={styles.inputContainer}>
            <TextInput
               label="First Name"
               leading={props =>
                  <FontAwesome5 name='user-alt' size={15} color='black' />}
               value={firstName}
               onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
               label="Last Name"
               leading={props =>
                  <FontAwesome5 name='user-alt' size={15} color='black' />}
               value={lastName}
               onChangeText={(text) => setLastName(text)}
            />
               <TextInput
               label="Phone No"
               leading={props =>
                  <FontAwesome5 name='phone-alt' size={15} color='black' />}
               value={phoneNo}
               onChangeText={(text) => setPhoneno(text)}
            />
             <Button 
            title='Save' style={{ marginTop: 7 }}
            onPress={() => start()}
         />
          </View>
       }
        
        
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
    },
    inputContainer: {
      padding: 5,
      margin: 5
    },
    input: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'gray',
      padding: 10
    },
   spinner: {
      flex: 1,
      flexDirection: 'column',
      alignContent: "center",
      justifyContent: "center"
    }

})
export default Contact;