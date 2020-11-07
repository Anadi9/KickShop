/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Icon, Input, Text, TopNavigation, TopNavigationAction, Button, Layout } from '@ui-kitten/components';
import { Image, SafeAreaView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Bg from '../assets/bg1.jpg';
import colors from './../theme/themeColors';

const BackIcon = (props) => (
    <Icon {...props} name="arrow-back" />
);

const GoogleIcon = (props) => (
  <Icon {...props} name="google" />
);

const FacebookIcon = (props) => (
  <Icon {...props} name="facebook" />
);


function RegisterScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSubmit = async () => {
   await auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!', email, password);
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

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
    );

    return (
        <SafeAreaView style={{ flex: 1, margin: 0, padding: 0 }}>
        <TopNavigation title="Register" alignment="center" accessoryLeft={BackAction}/>
        <Layout style={styles.login} >
                <Image source={Bg} style={styles.topimg} />
                <Text status="danger" category="h4" style={{ marginVertical: 10, fontSize: 25, fontWeight: '700'}}>Hello!</Text>
                <Layout style={styles.inputview}>
                <Input
                  status="danger"
                  value={email}
                  style={styles.input}
                  label="Email"
                  placeholder="Type your email"
                  onChangeText={text => setEmail(text)}
                />
                <Input
                  status="danger"
                  value={password}
                  style={styles.input}
                  label="Password"
                  placeholder="Type your password"
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={text => setPassword(text)}
            />
                <Button style={styles.button} appearance="outline" status="success" onPress={()=>handleSubmit()}>
                     REGISTER
                   </Button>
          </Layout>
          <Text >OR</Text>
          <Layout>
             <Button style={styles.button} appearance="filled" status="danger"  accessoryLeft={GoogleIcon} >Regiter with Google</Button>
             <Button style={styles.button} appearance="filled" status="primary" accessoryLeft={FacebookIcon} >Regiter with Facebook</Button>
          </Layout>
          <Text style={{marginTop: 20}} >Already have an account?</Text>
          <Button appearance="ghost" status="warning" onPress={navigateLogin} >Login</Button>
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
    },
    input: {
      marginVertical: 5,
      width: '80%',
  },
  button: {
    marginVertical: 10,
  },
});

export default RegisterScreen;

