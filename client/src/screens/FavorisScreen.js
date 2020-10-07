import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';

// Import context
import { Context as AuthContext } from '../context/AuthContext';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";

const FavorisScreen = (props) => {
    const { deezerToken } = useContext(AuthContext); 

    const isFocused = useIsFocused();
    useEffect(() => {
      if (isFocused) {
        fetchPlaylistes();
      }
    }, [isFocused]);

    return (
        <ScrollView style={Styles.container}>
            <View>

              
                <Card
                    style={Styles.cardStyle}
                    image={require('../assets/favorit.jpg')}
                >
                    <Button
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='FAVORIS' />
                </Card>

            </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282830',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    logoContainer: {
        color: 'white',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#fff',
        marginTop: 20,
        fontWeight: "100",
        fontSize: 23
    },
    myForm: {
        flex: 3
    },

})


export default FavorisScreen;