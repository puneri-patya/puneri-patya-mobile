import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Platform, Dimensions, FlatList, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import Comment from '../../components/UI/Comment';
import { useDispatch } from 'react-redux';
import * as postActions from '../../store/actions/posts';
import NewComment from './NewComment';
import { reverseGeocodeAsync } from 'expo-location';
import Styles from '../../constants/Styles';
import { showErrorMessage, showSuccessMessage } from '../../helpers/ShowMessage';
import { CustomImage } from './image/CustomImage';
import { StyledText } from './typography/StyledText';
import { VerifiedBadge } from './typography/VerifiedBadge';
import { Button } from './form/Button';
import { IconButtonWithLabel } from './form/IconButtonWithLabel';
import { YesNoAlert } from './notifications/CustomAlert';

const Card = (props) => {
    const { post, userId } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [imageUri, setImageUri] = useState('')
    const [showFullBody, setShowFullBody] = useState(false);
    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [locationDetails, setLocationDetails] = useState('');

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const getDisplayableDescription = useCallback((txt) => txt.length > 30 ? { val: `${txt.substring(0, 30)}...`, truncated: true } : { val: txt, truncated: false }, []);

    const deleteHandler = (id) => {
        YesNoAlert('Are you sure?', 'Do you really want to delete this pati? This action cannot be undone.', async () => {
            await dispatch(postActions.deletePost(id));
            showSuccessMessage('Your pati was successfully deleted.');
        })
    };

    const checkLike = () => {
        let match = post.likes.indexOf(userId) !== -1;
        return match;
    }

    const checkComment = () => {
        return post.comments.filter(v => v.postedBy._id == userId).length > 0;
    }

    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());

        } catch (err) {
            showErrorMessage('Oops! Something went wrong.', err.message);
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
            const address = [loc[0].name, loc[0].streetNumber, loc[0].street, loc[0].city, loc[0].region, loc[0].country];
            setLocationDetails(address.filter(Boolean).join(', '));
        };
        doIt();
    }, []);

    return (
        <>
            <View style={styles.card}>
                <View style={styles.cardTitleHeader}>
                    <View style={Styles.row}>
                        <CustomImage
                            containerStyle={styles.userIconContainer}
                            style={styles.userIcon}
                            source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${post.postedBy._id}?${new Date(post.postedBy.updated)}` }}
                            onImageError={onImageErrorHandler} />

                        <View style={Styles.column}>
                            <StyledText text={post.postedBy.name + ' '} varient='title'>
                                <VerifiedBadge userId={post.postedBy._id} />
                            </StyledText>

                            <IconButtonWithLabel
                                iconName={`clock-time-three-outline`}
                                label={timeDifference(new Date(), new Date(post.created))}
                                onPress={() => { }}
                                containerStyle={styles.timeDetails}
                                labelStyle={{ ...styles.timeDetails, marginLeft: -6 }}
                                iconColor={Colors.primary}
                                iconSize={12}
                                labelPosition='right' />
                        </View>
                    </View>
                </View>
                <CustomImage
                    containerStyle={styles.cardImageContainer}
                    style={{ ...styles.cardImage, height: imgHeight }}
                    source={{ uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date(post.updated)}` }}
                    onImageError={onImageErrorHandler}
                />

                <View style={styles.cardHeader}>
                    <View style={{ width: '100%' }}>
                        <StyledText text={post.title} varient='title' />
                        <StyledText text={showFullBody ? post.body : getDisplayableDescription(post.body).val} varient='subTitle'>
                            <Text
                                style={{ color: Colors.primary }}
                                onPress={() => setShowFullBody((prevState) => !prevState)}
                            >{getDisplayableDescription(post.body).truncated ? showFullBody ? ' Read Less' : ' Read More' : ''}
                            </Text>
                        </StyledText>

                        <IconButtonWithLabel
                            iconName='map-marker-outline'
                            label={locationDetails}
                            onPress={openMap}
                            style={Styles.location}
                            iconColor={Colors.primary}
                            iconSize={24}
                            labelPosition='right' />
                    </View>

                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                        <View style={styles.socialBarSection}>
                            <IconButtonWithLabel
                                iconName={`${checkLike() ? 'cards-heart' : 'heart-outline'}`}
                                label={post.likes.length}
                                onPress={toggleLike}
                                style={{ ...styles.socialBarLabel, color: checkLike() ? Colors.heartColor : 'black' }}
                                iconColor={Colors.heartColor}
                                iconSize={24}
                                labelPosition='right' />
                        </View>
                        <View style={styles.socialBarSection}>
                            <IconButtonWithLabel
                                iconName={'chat-outline'}
                                label={post.comments.length}
                                onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId, title: post.title })}
                                style={{ ...styles.socialBarLabel, color: checkComment() ? Colors.primary : 'black' }}
                                iconColor={checkComment() ? Colors.primary : 'black'}
                                iconSize={24}
                                labelPosition='right' />
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
                    {post.comments.length > 2 && (
                        <Button
                            label={`View all ${post.comments.length} comments`}
                            onPress={() => navigation.navigate('Comments', { postId: post._id, userId: userId, title: post.title })}
                            type="link"
                            style={{ flex: 1, justifyContent: 'flex-start', marginTop: -8, marginBottom: 0, marginLeft: 45 }} />
                    )}
                    <NewComment userId={userId} postId={post._id} />
                </View>

                {post.postedBy._id === userId && (
                    <View style={styles.postActions} >
                        <IconButtonWithLabel
                            iconName={'square-edit-outline'}
                            label={'Edit This Pati'}
                            onPress={() => navigation.navigate('EditPost', { postId: post._id, title: post.title })}
                            style={{ ...styles.socialBarLabel, color: 'black' }}
                            iconColor={Colors.lightAccent}
                            iconSize={24}
                            labelPosition='right' />

                        <IconButtonWithLabel
                            iconName={'delete'}
                            label={'Delete This Pati'}
                            onPress={deleteHandler.bind(this, post._id)}
                            style={{ ...styles.socialBarLabel, color: 'black' }}
                            iconColor={Colors.heartColor}
                            iconSize={24}
                            labelPosition='right' />
                    </View>
                )}

            </View>

        </>
    );
};

const styles = StyleSheet.create({
    userIconContainer: {
        paddingHorizontal: 10,
    },
    userIcon: {
        height: 32,
        width: 32,
        borderRadius: 32,

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
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImageContainer: {
        backgroundColor: '#c2c2c2',
        flex: 1,
        display: 'flex',
    },
    cardImage: {
        flex: 1,
        width: null
    },

    timeDetails: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 11,
        color: Colors.primary,
        marginTop: -2
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
    postActions: {
        borderTopColor: '#c2c2c2',
        borderTopWidth: 1,
        flexDirection: 'row',
        padding: 15,
    }
})

export default Card;