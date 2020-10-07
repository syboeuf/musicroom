import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    Linking,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

// Import context
import { Context as AuthContext } from '../context/AuthContext';

const MyFormResetPwd = (props) => {
    const { state, resetPwd } = useContext(AuthContext);

    const [email, setEmail] = useState('');

    return (
        <View style={Styles.container}>

            {state.response_msg !== "" ?
                <Text style={Styles.response_msg}>{state.response_msg}</Text>
                : null}

            {state.error_msg !== "" ?
                <Text style={Styles.errMsg}>{state.error_msg}</Text>
                : null}


            <TextInput
                placeholder="Input email"
                style={Styles.input}
                value={email}
                onChangeText={(value) => { setEmail(value) }}
            />

            <TouchableOpacity
                onPress={() => resetPwd({ email })}
                style={Styles.buttonContainer}>
                <Text style={Styles.buttonText} >Reset your password</Text>
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
    socialMedia: {
        marginRight: 10,
        fontSize: 20
    },
    noAccount: {
        color: '#fff',
        fontSize: 13,
        marginTop: 10
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
    errMsg: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'red',
        marginBottom: 10,
        fontSize: 15,
        fontWeight: '500'
    }
})

export default MyFormResetPwd;