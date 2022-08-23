import { StatusBar } from 'expo-status-bar';
import React, {TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import Contact from './screens/Contact'
import Dashboard from './screens/Dashboard'
import Editcontact from './screens/Editcontact'
import { styles } from "./styles/styles"; 
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <TouchableOpacity> 
      <Text style={styles.headerlefticon}>Phone Book</Text> 
    </TouchableOpacity>

  );
}

const App = (props) => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" >
   
      <Stack.Screen name="Dashboard" component={Dashboard}
         options={({ navigation, props }) => ({
          headerStyle: {
            backgroundColor: '#B5153D'
          },
              headerTitle: '',
              headerLeft: 

               (props) => <LogoTitle {...props} />
              ,
              headerRight: () => (
                <TouchableOpacity onPress={() => 
                  navigation.navigate("Contact")} >
                    <MaterialIcons name="add" size={24} color="white" 
                    style={{ padding: 5, marginRight: 7 }}
                    />  
                  </TouchableOpacity>
            
              ),
            })}
        />
        <Stack.Screen name="Contact" component={Contact}
          options={() => ({
            headerShown: true,
            headerBackTitle: 'Back'
          })}
        />
       <Stack.Screen name="Editcontact" component={Editcontact}
          options={({ route }) => ({
            headerShown: true,
            title: 'Edit Contact',
            Autoid: route.params.id,
            headerBackTitle: 'Back'
          })}
        />


        


      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
