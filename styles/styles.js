import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
headerlefticon:{
padding: 13, 
   color: '#ffffff', 
   fontSize: 14
},
box: {
    width: '80%',
    height: 150,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 9
  },
  /* Contact form */
  contactfromcontainer: {
   flex: 1
 },
 inputContainer: {
   padding: 10,
   margin: 10
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
   
});

export { styles }