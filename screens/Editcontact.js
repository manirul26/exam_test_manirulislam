
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator, 
Alert } from 'react-native';
import { Button, TextInput, IconButton,
 } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from "axios";
import * as base from "../api/api";



function Editcontact(props) {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [phoneNo, setPhoneno] = useState('');
const [autoid, setAutoid] = useState(props.route.params.id);
const [isloading, setIsloading] = useState(false);


useEffect(() => {
 getContact();
}, [getContact])

const getContact = () =>{
 axios.get(base.BASE_URL + `/getcontactid/${autoid}`)
   .then(res => {
      setFirstName(res.data[0].firstname);
      setLastName(res.data[0].lastname);
      setPhoneno(res.data[0].phone);
   });
}

   const update = () => {
     
   if(firstName == "")
   {
         alert('Required')
   }
   else{
   setIsloading(true)  
    const data = {
      autoid: autoid,
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo
    }
    fetch(base.BASE_URL + '/updatecontact', {
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
           if(responseJson.message == 'done')
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
      <View style={styles.container}>
       {
            isloading == true ?
            <View style={styles.spinner}>
            <ActivityIndicator size={32}/>
            </View>
       :
        <View style={styles.inputContainer}>
      {/*    <Text>jjj{props.route.params.id}</Text> */}
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
            title='Update'
            onPress={() => update()}
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
export default Editcontact;