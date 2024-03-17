import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';

import { showMessage } from "react-native-flash-message";

import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import LinearGradient from 'expo-linear-gradient';

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const validateAuthForm = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            return false;
        }

        return true;
    }


    const AuthHandler = async () => {
        setIsLoading(true);
        if (validateAuthForm()) {
            try {
                const msg = await dispatch(authActions.forgotPassword(email))
                showMessage({
                    message: msg,
                    type: "success",
                    icon: { icon: "success", position: 'left' },
                    duration: 4000
                });
                setEmail('');
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: { icon: "danger", position: 'left' },
                    duration: 3000
                });
            }
        }
        setIsLoading(false);
    };


    return (
        <View style={styles.container}>
            {/* <LinearGradient colors={['#ffffff', '#e3e9f2', '#5b94f7', '#bd3a3f']} locations={[0, 0.40, 0.64, 1]} style={styles.container}> */}
            <View style={styles.topComponent} >
                <Text style={styles.msgText}></Text>
            </View>
            <View style={styles.titleContainer} >
                <Image source={require('../../assets/logo.png')} />
            </View>
            <View style={styles.padding20} ><Text>&nbsp;</Text></View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
            </View>

            <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={AuthHandler}
            >

                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.whiteText}>
                        Send Password Reset Link
                    </Text>
                )}

            </TouchableOpacity>
            {/* </LinearGradient> */}
        </View>
    );
}


export const screenOptions = (navData) => {
    return {
        headerTitle: (props) => <Text style={styles.headerText}>Reset Password</Text>,
        headerStyle: {
            backgroundColor: '#ffffff',
        },
        headerTintColor: Colors.primary,
    }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'red',
        width: '100%',
    },
    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    successMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4F8A10',
        backgroundColor: "#DFF2BF",
        color: "#4F8A10",
        borderRadius: 25,

    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.primary,

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    registerButton: {
        backgroundColor: Colors.lightPrimary,

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    },
    whiteText: {
        color: "white",
        fontWeight: 'bold'
    },
    padding20: {
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'Brush Script MT',
        backgroundColor: '#ffffff',
        color: Colors.primary,
    }
});


export default ForgotPasswordScreen;