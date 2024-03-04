import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as postActions from '../../store/actions/posts';
import ImgPicker from '../../components/app/ImgPicker';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const AddPostScreen = (props) => {

    const [clearPickedImage, setClearPickedImage] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');
    const [imageSize, setImageSize] = useState(0);
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescFocused, setIsDescFocused] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 });

    const dispatch = useDispatch();


    const clearForm = () => {
        setClearPickedImage(true);
        setTitle('');
        setBody('');
        setBase64Data('');
        setImageType('');
        setIsLoading(false);
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { position.coords.latitude, position.coords.longitude })
        } else {
            async function getLocation() {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    showMessage({
                        message: "Location not enabled. Please enable location to post.",
                        type: "danger",
                        duration: 3000,
                        icon: { icon: "danger", position: 'left' }
                    });
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                console.log(location);
                showMessage({
                    message: "Location enabled.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            }

            // Call the function to get the location
            getLocation();

        }
        return () => {
            unsubscribe();
        };
    }, [clearForm])

    const validatePost = () => {
        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        console.log(sizeInKb);
        // if(sizeInKb > 2000){
        //     showMessage({
        //         message: "Image size should be less than 150KB.",
        //         type: "danger",
        //         duration: 3000,
        //         icon: { icon: "danger", position: 'left' }
        //     });
        //     return false;
        // }


        if (!title || title.length === 0) {
            showMessage({
                message: "Please enter a title.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!body || body.length === 0) {
            showMessage({
                message: "Please enter a body.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (base64Data.length === 0) {
            showMessage({
                message: "Please select an image to post.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }

    const createPost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            console.log("VALID POST")
            try {
                await dispatch(postActions.createPost(title, body, base64Data, imageType));
                clearForm();
                props.navigation.navigate('AllPosts')
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }

    const imagePickedHandler = (base64, imageType, imageSize) => {
        setBase64Data(base64);
        setImageType(imageType);
        setImageSize(imageSize);
        console.log(imageSize);
    }

    return (
        <ScrollView  >
            <KeyboardAvoidingView style={styles.screen} behavior="padding" >
                <View style={styles.container}>
                    <ImgPicker
                        onImageTaken={imagePickedHandler}
                        clearPickedImage={clearPickedImage}
                    />
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Where is this pati located?</Text>
                    </View>
                    <View style={styles.noImagePreview} >
                        <MapView
                            style={styles.map}
                            followsUserLocation={true}
                            showsUserLocation={true}
                            initialRegion={location}
                        >

                        </MapView>
                        {/* <Text style={styles.noPreviewText}>Choose Pati First</Text> */}
                    </View>
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Title</Text>
                    </View>
                    <View style={isTitleFocused ? styles.inputContainerActive : styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Short summary of pati"
                            underlineColorAndroid='transparent'
                            value={title}
                            onFocus={() => setIsTitleFocused(true)}
                            onBlur={() => setIsTitleFocused(false)}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Description</Text>
                    </View>
                    <View style={isDescFocused ? styles.inputContainerActive : styles.inputContainer}>
                        <TextInput style={styles.descriptionInput}
                            placeholder="Why do you think this is a good Puneri Pati?"
                            underlineColorAndroid='transparent'
                            multiline
                            numberOfLines={4}
                            value={body}
                            onFocus={() => setIsDescFocused(true)}
                            onBlur={() => setIsDescFocused(false)}
                            onChangeText={(text) => setBody(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={createPost}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.loginText}>
                                Submit Pati
                            </Text>
                        )}

                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


export const screenOptions = {
    headerTitle: 'Create Post',
    headerShown: false,
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'left',
        alignItems: 'left',
        marginTop: 20,
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'start',
        width: '100%'
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
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },
    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 2
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 8,
        color: Colors.primary
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'start',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainerActive: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'start',
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        height: 36,
        marginLeft: 10,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 10,
        textAlignVertical: 'top'
    },
    descriptionInput: {
        height: 90,
        marginLeft: 10,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 10,
        marginTop: 8,
        textAlignVertical: 'top'
    },

    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
        width: '100%',
        borderRadius: 8,
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

        elevation: 10,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold'
    },
    noImagePreview: {
        width: '100%',
        height: 210,
        // borderWidth: 1,
        borderRadius: 10,
        // borderColor: "#d2d2d2",
        // backgroundColor: Colors.commentColor,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noPreviewText: {
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        color: Colors.primary
    },
    map: {
        height: 200,
        width: '100%',
        margin: 0,
        position: 'relative',
        borderRadius: 10,
    }
})

export default AddPostScreen;