import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';


import * as ImagePicker from 'expo-image-picker';
import { showMessage } from "react-native-flash-message";

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            if (!props.editImage) {
                setPickedImage()
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])

    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions()

    const takeImageHandler = async (type) => {
        let image;
        try {
            if (type === 'gallery') {
                image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 1,

                    allowsMultipleSelection: false,
                    mediaTypes: 'Images',
                });
            } else {
                if (cameraStatus) {
                    if (
                        cameraStatus.status === ImagePicker.PermissionStatus.UNDETERMINED ||
                        (cameraStatus.status === ImagePicker.PermissionStatus.DENIED && cameraStatus.canAskAgain)
                    ) {
                        const permission = await requestCameraPermission()
                        if (permission.granted) {
                            image = await ImagePicker.launchCameraAsync({
                                allowsEditing: true,
                                base64: true,
                                // aspect: [16, 9],
                                quality: 1,
                                mediaTypes: 'Images'
                            });
                        }
                    } else if (cameraStatus.status === ImagePicker.PermissionStatus.DENIED) {
                        await Linking.openSettings()
                    } else {
                        image = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            base64: true,
                            // aspect: [16, 9],
                            quality: 1,
                            mediaTypes: 'Images'
                        });
                    }
                }

            }
            if (!image.cancelled) {
                setPickedImage(image.assets[0]);
                console.log(image.assets[0].fileName);
                // let res = image.uri.split('.');
                // let imageExtenstion = res[res.length - 1];
                // let imageType = `${image.type}/${imageExtenstion}`;

                props.onImageTaken(image.assets[0].base64, image.assets[0].mimeType, image.assets[0].fileSize);

            }
        } catch (error) {
            console.log("Image Error -", error)
        }
    };

    return (
        <View style={styles.imagePicker} >
            <View style={pickedImage ? styles.imagePreview : styles.noImagePreview} >
                {!pickedImage ? (
                    <Text style={styles.noPreviewText}>No Pati Chosen</Text>
                ) : (
                    <Image
                        style={styles.image}
                        source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}
                    />
                )}
            </View>

            <View style={{ flexDirection: 'row' }} >
                <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton, styles.endMargin]}
                    onPress={takeImageHandler.bind(this, 'gallery')}
                >
                    <Text style={styles.loginText}>
                        Open Gallery
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton, styles.startMargin]}
                    onPress={takeImageHandler.bind(this, 'camera')}
                >
                    <Text style={styles.loginText}>
                        Open Camera
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'start',
        marginBottom: 10,
    },
    noImagePreview: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#d2d2d2",
        backgroundColor: Colors.commentColor,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noPreviewText: {
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        color: Colors.primary,
        fontFamily: 'MuseoModerno-Light',
    },
    imagePreview: {
        width: "100%",
        aspectRatio: 1,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.commentColor,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#c2c2c2'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    buttonContainer: {
        height: 36,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        width: '49%',
        borderRadius: 8,
        backgroundColor: 'transparent',
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    loginButton: {
        backgroundColor: 'transparent',
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
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'MuseoModerno-SemiBold',
    },
    endMargin: {
        marginEnd: '1%',
    },
    startMargin: {
        marginStart: '1%',
    }
});

export default ImgPicker;