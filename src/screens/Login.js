/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Icon, Input, Text, TopNavigation, TopNavigationAction, Button, Layout } from '@ui-kitten/components';
import { Image, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';
import Bg from '../assets/bg1.jpg';
import colors from './../theme/themeColors';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';


const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" />
);

const GoogleIcon = (props) => (
  <Icon {...props} name="google" />
);

const FacebookIcon = (props) => (
  <Icon {...props} name="facebook" />
);

function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSubmit = async () => {
    await auth()
   .signInWithEmailAndPassword(email, password)
   .then(() => {
     console.log('User account created & signed in!');
     navigation.replace('Home');
     setEmail('');
   })
   .catch(error => {
     if (error) {
       console.log(error.message);
     }

     if (error.code === 'auth/invalid-email') {
       console.log('That email address is invalid!');
     }

     console.error(error);
   });
  };

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);

      navigation.replace('Home');
      return;
    }
    catch (err) {
      console.log(err.message);
    }
  }

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);
      navigation.replace('Home');
      return;
    }
    catch (err) {
      console.log(err);
    }
  }

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const navigateRegister = () => {
    navigation.navigate('Register');
  };

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <SafeAreaView style={{ flex: 1, margin: 0, padding: 0 }}>
        <TopNavigation title="Log In" alignment="center" accessoryLeft={BackAction}/>
        <Layout style={styles.login} >
                <Image source={Bg} style={styles.topimg} />
                <Text status="danger" category="h4" style={{ marginVertical: 10, fontSize: 25, fontWeight: '700'}}>Welcome Back!</Text>
                <Layout style={styles.inputview}>
                <Input
                  status="danger"
                  size="large"
                  value={email}
                  style={styles.input}
                  label="Email"
                  placeholder="Type your email"
                  onChangeText={text => setEmail(text)}
                />
                <Input
                  status="danger"
                  size="large"
                  value={password}
                  style={styles.input}
                  label="Password"
                  placeholder="Type your password"
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={text => setPassword(text)}
            />
            <Button style={styles.button} size="large" appearance="outline" status="success" onPress={()=>handleSubmit()}>
                     LOGIN
                   </Button>
          </Layout>
          <Text >OR</Text>
          <Layout>
          <Button
          style={styles.button}
          size="large"
          appearance="filled"
          status="danger"
          accessoryLeft={GoogleIcon}
          onPress={() => onGoogleButtonPress()}>Login with Google</Button>
          <Button
          style={styles.button}
          size="large"
          appearance="filled"
          status="info"
          accessoryLeft={FacebookIcon}
          onPress={() => onFacebookButtonPress()}>Login with Facebook</Button>
          </Layout>
          <Text style={{marginTop: 20}} >Do not have an account?</Text>
          <Button appearance="ghost" status="basic" onPress={navigateRegister} >Register</Button>
        </Layout>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
},
topimg: {
    width: '100%',
    height: '25%',
},
inputview: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: '100%',
},
input: {
  marginVertical: 5,
  marginHorizontal: '10%',
},
button: {
marginVertical: 10,
marginHorizontal: '10%',
},
});

export default LoginScreen;
