import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import Comment from '../../components/UI/Comment';
import { useSelector, useDispatch } from 'react-redux';

import ENV from '../../env';
import * as postsActions from '../../store/actions/posts';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";
import Styles from '../../constants/Styles';
import { reverseGeocodeAsync } from 'expo-location';

const CommentsScreen = (props) => {

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [post, setPost] = useState({ likes: [], comments: [], latitude: 0, longitude: 0 });

    const { route } = props;
    const postId = route.params.postId;
    const userId = route.params.userId;

    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.allPosts);
    const postIndex = posts.findIndex(post => post._id === postId);
    const comments = post.comments;


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

    const createCommentHandler = async () => {
        if (text.length === 0) {
            Alert.alert(
                'Please enter some text',
                'Cannot create empty comment',
                [{ text: 'Okay' }]
            );
        } else {
            setIsLoading(true);
            try {
                await dispatch(postsActions.commentPost(postId, text))
            } catch (error) {
                Alert.alert(
                    'Error, cannot comment',
                    error.message,
                    [{ text: 'Okay' }]
                );
            }
            setText('');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setPost(posts[postIndex]);
    }, [])

    return (
        <View style={styles.container} >
            <View style={[styles.cardImageContainer, Styles.row]} >
                <Image
                    style={{ ...styles.cardImage }}
                    source={{ uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date()}` }}
                    onLoad={() => setIsImageLoading(false)}
                />
                <ActivityIndicator
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    animating={isImageLoading}
                    size='large'
                    color={Colors.brightBlue}
                />
            </View>
            <View style={Styles.row}>
                <Text style={Styles.title}>{post.title}</Text>
            </View>
            <View style={Styles.row}>
                <Text style={Styles.description}>{post.body}</Text>
            </View>
            <View style={Styles.row}>
                <Text style={Styles.underline}></Text>
            </View>

            <FlatList
                style={styles.root}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={comments}
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
                        <Comment comment={comment} userId={userId} postId={postId} />
                    );
                }}
            />
            <KeyboardAvoidingView style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Leave a comment"
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <View
                        style={styles.postButtonContainer}
                    >
                        <TouchableOpacity
                            onPress={createCommentHandler}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={Styles.button} >Post</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>

        </View>
    );
};


export const screenOptions = ({ route }) => ({
    title: `Comments for ${route.params.title}`
});
//headerTitle: navigation.setOptions({ title: 'Comments' + postId})

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        //marginBottom: 45
    },



    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff",
        position: 'relative',
        // marginTop: 48,
    },
    cardHeader: {
        paddingTop: 16,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1
    },
    inputs: {
        height: 45,
        width: '85%',
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        paddingRight: 20,
        fontFamily: 'MuseoModerno-Light',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '100%',
        height: 45,
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
    postButtonContainer: {
        position: 'absolute',
        right: 0,
        height: 45,
        width: '15%',
        backgroundColor: Colors.primary,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'MuseoModerno-Bold',
    },
    cardImageContainer: {
        backgroundColor: '#c2c2c2',
        display: 'flex',
        height: 275,
        marginVertical: 10
    },
    cardImage: {
        flex: 1,
        // height: 275,
        width: null
    },
    socialBarContainer: {
        flexDirection: 'row',
        marginVertical: 10,
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
});

export default CommentsScreen;