import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore,disableNetwork, enableNetwork } from 'firebase/firestore';
import { Alert, LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
  //Represents network connectivity status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: "AIzaSyC6PoyxTYsTDpq0P7XTiJhyP4BV8c72U1o",
    authDomain: "chat-app-65dde.firebaseapp.com",
    projectId: "chat-app-65dde",
    storageBucket: "chat-app-65dde.appspot.com",
    messagingSenderId: "261642431553",
    appId: "1:261642431553:web:f55862c20c98eba52deac0"
  };

  //Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
