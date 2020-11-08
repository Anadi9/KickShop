/* eslint-disable prettier/prettier */
import React, { useEffect, useState, Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { ThemeContext } from '../theme/theme-context';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';


export default function HomeScreen({ navigation }) {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const themeContext = React.useContext(ThemeContext);

  const logout = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.replace('Login');
      });
  };

  async function onAuthStateChanged(User) {
    await setUser(User);
    if (initializing) {
      setInitializing(false);
    }
    console.log(user);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '899815932795-01n1ru2s2ec3v8gs6sipe8v2ghufuqcv.apps.googleusercontent.com',
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) { return null; }

  const navigateRegister = () => {
    navigation.navigate('Register');
    };

    const navigateLogin = () => {
        navigation.navigate('Login');
      };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="FootStore" alignment="center"/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {user ?
          (
            <Fragment>
              <Text>Welcome {user.email}</Text>
              <Button style={{ marginVertical: 4 }} onPress={() => logout()}>Logout</Button>
            </Fragment>
          )
          :
          <Fragment>
          <Button style={{ marginVertical: 4 }} onPress={navigateRegister}>Register</Button>
          <Button style={{ marginVertical: 4 }} onPress={navigateLogin}>Login</Button>
            </Fragment>
        }
              <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
      </Layout>
    </SafeAreaView>
  );
}
