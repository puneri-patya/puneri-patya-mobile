import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions, FlatList, KeyboardAvoidingView, TextInput, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import Comment from '../../components/UI/Comment';
import { useDispatch } from 'react-redux';
import * as postActions from '../../store/actions/posts';
import { showMessage } from "react-native-flash-message";
import VerifiedUser from '../../constants/VerifiedUser';
import NewComment from './NewComment';
import { reverseGeocodeAsync } from 'expo-location';
import Styles from '../../constants/Styles';

const Card = (props) => {
    const { post, userId, fromUserProfile } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const liked = post.likes.indexOf(userId) !== -1;

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState('')
    const [showFullBody, setShowFullBody] = useState(false);
    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [locationDetails, setLocationDetails] = useState('');

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }


    const getDisplayableDescription = (txt) => txt.length > 30 ? { val: `${txt.substring(0, 30)}...`, truncated: true } : { val: txt, truncated: false };

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this post?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(postActions.deletePost(id))
                        showMessage({
                            message: "Your post was successfully deleted.",
                            type: "success",
                            icon: { icon: "success", position: 'left' },
                            duration: 3000
                        });
                    }
                }
            ]
        )
    };

    const checkLike = () => {
        let match = post.likes.indexOf(userId) !== -1;
        return match;
    }

    const checkComment = () => {
        //console.log('post.comments', post.comments)
        let match = post.comments.filter(v => v.postedBy._id == userId).length > 0;
        return match;
    }

    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());

        } catch (err) {
            Alert.alert(
                'Error',
                error.message,
                [{ text: 'Okay' }]
            );
        }
        setIsRefreshing(false);
    }, [dispatch])

    const toggleLike = async () => {
        props.toggleLikeHandler(post._id, checkLike());
    }
    const openMap = () => {
        const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${post.latitude},${post.longitude}`;
        const label = post.title;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    useEffect(() => {
        let imageUrl = `${ENV.apiUrl}/post/photo/${post._id}?${new Date(post.updated)}`;
        Image.getSize(imageUrl, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width
            const scaleFactor = width / screenWidth
            const imageHeight = height / scaleFactor
            setImgWidth(screenWidth);
            setImgHeight(imageHeight);
        })

    }, [])

    useEffect(() => {
        const doIt = async () => {
            const loc = await reverseGeocodeAsync({ latitude: post.latitude, longitude: post.longitude });
            console.log('loc', loc)
            const address = [loc[0].name, loc[0].streetNumber, loc[0].street, loc[0].city, loc[0].region, loc[0].country];
            setLocationDetails(address.filter(Boolean).join(', '));
        };
        doIt();
    }, []);


    return (
        <View>
            <View style={styles.card}>
                <View style={styles.cardTitleHeader}>
                    <View style={styles.row}>
                        <View style={[styles.row, styles.userIconContainer]}>
                            <Image
                                style={styles.userIcon}
                                source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${post.postedBy._id}?${new Date(post.postedBy.updated)}` }}
                                onError={onImageErrorHandler}
                            />
                        </View>
                        <View style={styles.column}>
                            <View>
                                <Text
                                    style={styles.userName}
                                    onPress={() => navigation.navigate('UserProfile', { userId: post.postedBy._id, name: post.postedBy.name })}
                                >
                                    {`${post.postedBy.name}`}
                                    {
                                        VerifiedUser.verifiedUsersId.includes(post.postedBy._id) && <Octicons name="verified" size={18} color={Colors.brightBlue} />
                                    }
                                </Text>
                            </View>
                            <View style={[styles.row, styles.timeDetails]}>
                                <Ionicons
                                    name={'time-outline'}
                                    size={14}
                                    style={[styles.timeDetails, styles.timeIcon]}
                                />
                                <Text style={styles.timeDetails}> {timeDifference(new Date(), new Date(post.created))} </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.cardImageContainer} >
                    <Image
                        style={{ ...styles.cardImage, height: imgHeight }}
                        source={{ uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date(post.updated)}` }}
                        onLoad={() => setIsImageLoading(false)}
                    />
                    <ActivityIndicator
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        animating={isImageLoading}
                        size='large'
                        color={Colors.brightBlue}
                    />
                </View>
                <View style={styles.cardHeader}>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.title}>{post.title || ""}</Text>
                        <View>
                            <Text style={styles.description}>
                                {!showFullBody ? post.body : getDisplayableDescription(post.body).val}
                                <Text
                                    style={{ color: Colors.primary }}
                                    onPress={() => setShowFullBody((prevState) => !prevState)}
                                >{getDisplayableDescription(post.body).truncated ? showFullBody ? ' Read More' : ' Read Less' : ''}
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={Styles.locationContainer}
                            onPress={openMap}
                        >
                            <Ionicons
                                name={`location-outline`}
                                size={24}
                                style={{ marginRight: 5 }}
                                color={Colors.primary}
                            />
                            <Text style={Styles.location}> {locationDetails} </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={toggleLike}
                            >
                                <Ionicons
                                    name={`heart-${checkLike() ? 'sharp' : 'outline'}`}
                                    size={24}
                                    style={{ marginRight: 5 }}
                                    color={Colors.heartColor}
                                />
                                <Text style={[styles.socialBarLabel, { color: checkLike() ? Colors.heartColor : 'black' }]}> {post.likes.length} </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                            >
                                <Ionicons
                                    name="chatbox-outline"
                                    size={24}
                                    style={{ marginRight: 5 }}
                                    color={checkComment() ? Colors.primary : 'black'}
                                />
                                <Text style={[styles.socialBarLabel, { color: checkComment() ? Colors.primary : 'black' }]}> {post.comments.length} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }} >
                    <FlatList
                        style={styles.root}
                        onRefresh={loadPosts}
                        refreshing={isRefreshing}
                        data={post.comments.sort((a, b) => new Date(b.created) - new Date(a.created)).filter((k, i) => i < 2)}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator} />
                            )
                        }}
                        keyExtractor={(item) => {
                            return item._id;
                        }}
                        renderItem={(item) => {
                            const comment = item.item;
                            return (
                                <Comment comment={comment} userId={userId} postId={post._id} />
                            );
                        }}
                    />
                    <NewComment userId={userId} postId={post._id} />

                </View>

                {post.comments.length > 2 && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId })}
                    >
                        <Text style={styles.commentBar}>{`View all ${post.comments.length} comments`}</Text>
                    </TouchableOpacity>
                )}
                {post.postedBy._id === userId && (

                    <View style={styles.postActions} >
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => navigation.navigate('EditPost', { postId: post._id })}
                            >
                                <MaterialCommunityIcons
                                    name="square-edit-outline"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                    color={Colors.lightAccent}
                                />
                                <Text style={styles.socialBarLabel}>Edit This Pati</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.socialBarSection}>
                            <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={deleteHandler.bind(this, post._id)}
                            >
                                <MaterialCommunityIcons
                                    name="delete"
                                    size={20}
                                    style={{ marginRight: 5 }}
                                    color={Colors.heartColor}
                                />
                                <Text style={styles.socialBarLabel}>Delete This Pati</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    userIconContainer: {
        // paddingEnd: 20,
        paddingHorizontal: 10,
    },
    userIcon: {
        height: 30,
        width: 30,
        borderRadius: 30,

    },
    card: {
        elevation: 3,
        shadowColor: 'black',

        shadowOffset: {
            width: 2,
            height: 5
        },
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: Colors.cardBackground,
        margin: 4,
        borderColor: Colors.cardBorder,
        borderWidth: 1,
        borderRadius: 8

    },
    cardTitleHeader: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    cardHeader: {
        paddingTop: 16,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,

    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    commentBar: {
        paddingHorizontal: 10,
        paddingBottom: 15,
        paddingTop: 5,
        fontFamily: 'MuseoModerno-Light',
    },
    cardImageContainer: {
        backgroundColor: '#c2c2c2',
        flex: 1,
        display: 'flex',
        // height: 275 
    },
    cardImage: {
        flex: 1,
        // height: 275,
        width: null
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start'
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start'
    },

    /******** card components **************/
    userName: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 16,
        marginTop: -5
    },
    timeDetails: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 11,
        color: Colors.primary,
        marginTop: -2
    },
    timeIcon: {
        marginTop: 2
    },
    title: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 16,
        flex: 1,
    },
    description: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 13,
        color: "#888",
        flex: 1,
        marginVertical: 5,
        marginTop: -2,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row',
        flex: 1,
    },

    /******** social bar ******************/
    socialBarContainer: {
        flexDirection: 'row'
    },
    socialBarSection: {
        marginRight: 20
    },
    socialBarLabel: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 14,
        marginLeft: 0,
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postActions: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 15,
    }
})

export default Card;