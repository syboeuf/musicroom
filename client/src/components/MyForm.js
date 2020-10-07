import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Linking,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';

// Import context
import { Context as AuthContext } from '../context/AuthContext';

const MyForm = (props) => {
  const { state, signup, signin, hideMessages, oauth2google, oauth2deezer } = useContext(AuthContext);

  const { name, navigation, isLoggin } = props;
  const [username, setUsername] = useState('');
  const [password, setPasswor] = useState('');
  const [email, setEmail] = useState('');
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleOpenURL = ({ url }) => {
    if (url.indexOf("?deezerToken") === -1) {
      let token = url.substring(url.indexOf("?token=") + 7, url.indexOf("&userId="));
      let userId = url.substring(url.indexOf("&userId=") + 8, url.indexOf("&givenName="));
      oauth2google({ token, userId });
    }
  };

  useEffect(() => {
    // Your code here
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  // TODO Add animation
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 350
    }).start();
  }

  useEffect(() => {
    hideMessages()
  }, [state.error_msg, state.response_msg, navigation]);

  return (
    <View style={Styles.container}>

      {state.error_msg !== "" ?
        <Text style={[Styles.errMsg, startAnimation]}>{state.error_msg}</Text>
        : null}

      {state.response_msg !== "" ?
        <Text style={Styles.response_msg}>{state.response_msg}</Text>
        : null}

      {!isLoggin ?
        <TextInput
          value={username}
          placeholder="Input username"
          style={Styles.input}
          onChangeText={(value) => { setUsername(value) }}
        /> : null}

      <TextInput
        placeholder="Input email"
        style={Styles.input}
        value={email}
        onChangeText={(value) => { setEmail(value) }}
      />

      <TextInput
        placeholder="Input password"
        style={Styles.input}
        secureTextEntry
        value={password}
        onChangeText={(value) => { setPasswor(value) }}
      />

      {!isLoggin ?
        <TouchableOpacity
          onPress={() => signup({ username, email, password })}
          style={Styles.buttonContainer}>
          <Text style={Styles.buttonText} >{name}</Text>
        </TouchableOpacity> :
        <TouchableOpacity
          onPress={() => signin({ email, password })}
          style={Styles.buttonContainer}>
          <Text style={Styles.buttonText} >{name}</Text>
        </TouchableOpacity>}


      {isLoggin ?
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPwd')}
        ><Text style={Styles.noAccount}>
            Forget your password ?
        </Text></TouchableOpacity> : null}


      {isLoggin ?
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        ><Text style={Styles.noAccount}>
            You don't have an account ? Create a new account
        </Text></TouchableOpacity> :

        <TouchableOpacity
          onPress={() => navigation.push('Signin')}
        ><Text style={Styles.noAccount}>
            You have an account ? go to login
        </Text></TouchableOpacity>}

      <Text style={Styles.txtLine}>___________ OR ____________</Text>

      <TouchableOpacity style={Styles.socialBtn}
        onPress={() => Linking.openURL('http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com/auth/google')}>
        <Text style={Styles.buttonText} >
          Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Styles.social42Btn}
        onPress={() => Linking.openURL('http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com/login/42')}>
        <Text style={Styles.buttonText} >
          42 LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    paddingLeft: 20,
    marginBottom: 15
  },

  buttonContainer: {
    backgroundColor: '#27ae60',
    paddingVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  txtLine: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20
  },
  socialBtn: {
    marginTop: 30,
    backgroundColor: '#1f5c9e',
    paddingVertical: 10,
  },
  social42Btn: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    marginBottom: 50,
  },
  socialMedia: {
    marginRight: 10,
    fontSize: 20
  },
  noAccount: {
    color: '#fff',
    fontSize: 13,
    marginTop: 10
  },
  errMsg: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'red',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '500'
  },
  response_msg: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'green',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '500'
  },
})

export default MyForm;