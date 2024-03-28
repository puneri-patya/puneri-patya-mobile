import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Vibration,
    Appearance,
    useColorScheme,
    Platform
} from 'react-native';


import { showMessage } from "react-native-flash-message";
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView } from 'native-base';
import { InputWithLabel } from '../../components/UI/form/InputWithLabel';
import { Button } from '../../components/UI/form/Button';
import { showErrorMessage, showSuccessMessage } from '../../helpers/ShowMessage';


const AuthScreen = (props) => {

    const [isSignup, setIsSignUp] = useState(false);
    const nameState = useState('');
    const [name, setName] = nameState;
    const emailState = useState('');
    const [email, setEmail] = emailState;
    const passwordState = useState('');
    const [password, setPassword] = passwordState;

    const [isLoading, setIsLoading] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState({});

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
        const errors = [];
        if (isSignup && !name) {
            errors.push('Please enter a valid name.');
        }

        if (isSignup && name && name.length < 2) {
            errors.push('Name should be atleast 2 characters long.');
        }

        if (!emailRegex.test(email.toLowerCase())) {
            errors.push('Please enter a valid email.');
        }

        if (!password || password.length === 0) {
            errors.push('Please enter your password.');
        } else if (isSignup && password.length < 6) {
            errors.push('Password should be atleast 6 characters long.');
        } else if (isSignup && !passwordRegex.test(password)) {
            errors.push('Password should contain atleast 1 number.');
        }

        if (errors.length > 0) {
            showErrorMessage(`${errors.length > 1 ? 'Multiple errors' : 'One error'} found.`, errors.join('\n'));
            setIsLoading(false);
            return false;
        } else {
            return true;
        }
    }

    const AuthHandler = async () => {
        setIsLoading(true);
        if (validateAuthForm()) {
            if (isSignup) {
                try {
                    const msg = await dispatch(authActions.signup(name, email, password, expoPushToken))
                    showSuccessMessage("Signup Success. Please login.");
                    setIsSignUp(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                } catch (error) {
                    showErrorMessage(error.message);
                }
                setIsLoading(false);
            } else {
                try {
                    await dispatch(authActions.signin(email, password, expoPushToken))
                    showSuccessMessage("Welcome to Puneri Patya.com");
                } catch (error) {
                    showErrorMessage(error.message);
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

        msgText: {
            fontSize: 15,
        },

        blackText: {
            color: "black",
            fontWeight: 'bold',
            fontFamily: 'MuseoModerno-SemiBold',
        },

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
                        <InputWithLabel
                            placeholder="Name"
                            label="Name"
                            inputState={nameState}
                            onChangeText={setName} />
                    )}

                    <InputWithLabel
                        placeholder="Email"
                        label="Email"
                        inputState={emailState}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        inputMode='email'
                        autoComplete='email'
                        textContentType='username'
                        importantForAutofill='yes'
                        autoCapitalize='none'
                    />

                    <InputWithLabel
                        placeholder="Password"
                        label="Password"
                        inputState={passwordState}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        textContentType='password'
                        autoComplete='password'
                        importantForAutofill='yes'
                    />
                </KeyboardAvoidingView>
                <View style={{ width: '100%' }}>

                    {!isSignup && (<Button
                        label={"Forgot your password?"}
                        onPress={() => props.navigation.navigate('ForgotPassword')}
                        type='link'
                        isLoading={isLoading}
                        style={{ justifyContent: 'flex-end', marginTop: -10 }} />)}

                    <Button
                        label={isSignup ? "Register" : "Login"}
                        onPress={AuthHandler}
                        variant='primary'
                        round={true}
                        isLoading={isLoading}
                    />

                    <Button
                        label={isSignup ? "Already a user ? Login" : "Don't have an account ? Register"}
                        onPress={() => { setIsSignUp(prevState => !prevState); }}
                        isLoading={isLoading}
                        round={true}
                        variant='secondary' />
                </View>

                {/* {!isSignup && (
                    <View style={styles.titleContainer} >
                        <Image source={require('../../assets/pati.gif')} style={styles.pati} />
                    </View>)} */}
            </LinearGradient>
        </View>
    );
}

export const screenOptions = (navData) => { headerTitle: 'Auth' };

export default AuthScreen;