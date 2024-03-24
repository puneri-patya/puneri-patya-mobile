import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Vibration,
    // Platform,
    // Alert,
    Appearance,
    useColorScheme,
    Platform
} from 'react-native';


import { showMessage } from "react-native-flash-message";
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import Styles from '../../constants/Styles';
import { KeyboardAvoidingView } from 'native-base';


const AuthScreen = (props) => {

    const [isSignup, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({});
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const dispatch = useDispatch();
    let token;
    let _notificationSubscription;

    // const registerForPushNotificationsAsync = async () => {
    //     if (Constants.isDevice) {
    //         const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    //         let finalStatus = existingStatus;
    //         if (existingStatus !== 'granted') {
    //             const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //             finalStatus = status;
    //         }
    //         if (finalStatus !== 'granted') {
    //             Alert.alert(
    //                 'Failed !',
    //                 'Failed to get push token for push notification!',
    //                 [{ text: 'Okay' }]
    //             );
    //             return;
    //         }
    //         try {
    //             token = await Notifications.getExpoPushTokenAsync();
    //         } catch (err) {
    //             showMessage({
    //                 message: `ERROR - ${err.message}`,
    //                 description: `${err}`,
    //                 type: "danger",
    //                 icon: { icon: "danger", position: 'left' },
    //                 duration: 3000
    //             });
    //         }
    //         console.log(token);
    //         setExpoPushToken(token);
    //     } else {
    //         Alert.alert(
    //             'Error !',
    //             'Must use physical device for Push Notifications',
    //             [{ text: 'Okay' }]
    //         )
    //     }
    //     if (Platform.OS === 'android') {
    //         Notifications.createChannelAndroidAsync('default', {
    //             name: 'default',
    //             sound: true,
    //             priority: 'max',
    //             vibrate: [0, 250, 250, 250],
    //         });
    //     }
    // };

    var isDark = useColorScheme() === 'dark';
    Appearance.addChangeListener(({ colorScheme }) => isDark = colorScheme === 'dark');
    useEffect(() => {
        //registerForPushNotificationsAsync();
        console.log(expoPushToken);
        //_notificationSubscription = Notifications.addListener(_handleNotification);
    }, [])


    const _handleNotification = notification => {
        Vibration.vibrate();
        setNotification(notification);
    };

    const validateAuthForm = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /\d/
        if (isSignup && !name) {
            showMessage({
                message: "Please enter a valid name.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (isSignup && name && name.length < 2) {
            showMessage({
                message: "Please enter a valid name.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (!password || password.length === 0) {
            showMessage({
                message: "Please enter your password.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        if (isSignup && password.length < 6) {
            showMessage({
                message: "Password should be atleast 6 characters long.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;

        }
        if (isSignup && !passwordRegex.test(password)) {
            showMessage({
                message: "Password should contain atleast 1 number.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            setIsLoading(false);
            return false;
        }
        return true;
    }

    const AuthHandler = async () => {
        setIsLoading(true);
        if (validateAuthForm()) {
            if (isSignup) {
                try {
                    const msg = await dispatch(authActions.signup(name, email, password, expoPushToken))
                    showMessage({
                        message: "Signup Success",
                        description: 'Please Login !',
                        type: "success",
                        icon: { icon: "success", position: 'left' },
                        duration: 3000
                    });
                    setIsSignUp(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                } catch (error) {
                    showMessage({
                        message: error.message,
                        type: "danger",
                        icon: { icon: "danger", position: 'left' },
                        duration: 3000
                    });
                }
                setIsLoading(false);
            } else {
                try {
                    await dispatch(authActions.signin(email, password, expoPushToken))
                    showMessage({
                        message: "Welcome to Puneri Patya.com",
                        type: "success",
                        icon: { icon: "success", position: 'left' },
                        duration: 3000
                    });
                } catch (error) {
                    showMessage({
                        message: error.message,
                        type: "danger",
                        icon: { icon: "danger", position: 'left' },
                        duration: 3000
                    });
                    setIsLoading(false);
                }
            }
        }
    };

    const inputChangeHandler = (text, inputField) => {
        if (inputField === 1) {
            setName(text)
        } else if (inputField === 2) {
            setEmail(text)
        } else if (inputField === 3) {
            setPassword(text)
        }
    }

    //const isDark = useColorScheme() === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'red',
            width: '100%',
        },
        gradientContainer: {
            paddingHorizontal: 30
        },
        topComponent: {
            marginTop: 80,
        },
        titleContainer: {
            marginBottom: 20,
        },
        title: {
            fontSize: 42,
            color: '#fff',
            fontWeight: 'bold',

            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 1,
            textShadowColor: 'black',

            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
            textShadowColor: '#ccc',

            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1,
            textShadowColor: 'black',
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
            // borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            // borderBottomWidth: 1,
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
            borderRadius: 25,
            backgroundColor: 'transparent'
        },
        btnForgotPassword: {
            // height: 15,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginBottom: 20,
            width: 300,
            backgroundColor: 'transparent',
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
            backgroundColor: Colors.secondary,

            shadowColor: "#808080",
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity: 0.50,
            shadowRadius: 12.35,

            elevation: 19,
        },
        blackText: {
            color: "black",
            fontWeight: 'bold',
            fontFamily: 'MuseoModerno-SemiBold',
        },
        bgImage: {
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
        },
        pati: {
            resizeMode: 'contain',
            aspectRatio: 1,
        },
        whiteText: {
            color: "white",
            fontWeight: 'bold'
        }
    });


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#ffffff', Colors.cardBackground, '#5b94f7', '#bd3a3f']} locations={[0, 0.60, 0.94, 1]} style={[styles.container, styles.gradientContainer]}>

                <View style={styles.topComponent} >
                    <Text style={styles.msgText}></Text>
                </View>
                <View style={styles.titleContainer} >
                    <Image source={require('../../assets/logo.png')} />
                </View>

                <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                    {isSignup && (
                        <>
                            <View style={Styles.labelContainer} >
                                <Text style={Styles.labelText} >Name</Text>
                            </View>
                            <View style={isNameFocused ? Styles.inputContainerActiveRed : Styles.inputContainerActive}>
                                <TextInput style={Styles.inputs}
                                    placeholder="Name"
                                    underlineColorAndroid='transparent'
                                    value={name}
                                    onChangeText={(text) => inputChangeHandler(text, 1)}
                                    onFocus={() => setIsNameFocused(true)}
                                    onBlur={() => setIsNameFocused(false)}
                                />
                            </View>
                        </>
                    )}

                    <View style={Styles.labelContainer} >
                        <Text style={Styles.labelText} >Email</Text>
                    </View>
                    <View style={isEmailFocused ? Styles.inputContainerActiveRed : Styles.inputContainerActive}>
                        <TextInput style={Styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            inputMode='email'
                            value={email}
                            onChangeText={(text) => inputChangeHandler(text, 2)}
                            autoComplete='email'
                            textContentType='username'
                            importantForAutofill='yes'
                            autoCapitalize='none'
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                        />
                    </View>

                    <View style={Styles.labelContainer} >
                        <Text style={Styles.labelText} >Password</Text>
                    </View>
                    <View style={isPasswordFocused ? Styles.inputContainerActiveRed : Styles.inputContainerActive}>
                        <TextInput style={Styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => inputChangeHandler(text, 3)}
                            textContentType='password'
                            autoComplete='password'
                            importantForAutofill='yes'
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}

                        />
                    </View>

                    {!isSignup && (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('ForgotPassword')}
                            style={styles.btnForgotPassword}
                        >
                            <Text style={styles.blackText}>Forgot your password?</Text>
                        </TouchableOpacity>)}

                    <View style={Styles.buttonContainer} >
                        <TouchableOpacity
                            style={[Styles.buttonContainer, Styles.buttonPrimary]}
                            onPress={AuthHandler}
                        >

                            {isLoading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={Styles.buttonText}>
                                    {isSignup ? "Register" : "Login"}
                                </Text>
                            )}

                        </TouchableOpacity>
                    </View>


                    <View style={Styles.buttonContainer} >
                        <TouchableOpacity
                            style={[Styles.buttonContainer, styles.registerButton]}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState);
                            }}
                        >
                            <Text style={Styles.buttonText} >
                                {isSignup ? "Already a user ? Login" : "Don't have an account ? Register"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                {!isSignup && (
                    <View style={styles.titleContainer} >
                        <Image source={require('../../assets/pati.gif')} style={styles.pati} />
                    </View>)}
            </LinearGradient>
        </View>
    );
}


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Auth',
    }
}




const resizeMode = 'center';










export default AuthScreen;