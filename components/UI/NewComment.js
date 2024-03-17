import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Alert
} from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import ENV from '../../env';
import { timeDifference } from '../../helpers/timeDifference';
import VerifiedUser from '../../constants/VerifiedUser';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as postsActions from '../../store/actions/posts';


const NewComment = (props) => {

    const { comment, deleteCommentHandler, userId, postId } = props;
    const [imageUri, setImageUri] = useState('')
    const [text, setText] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const deleteComment = () => {
        deleteCommentHandler(comment);
    }

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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { }}>
                <Image
                    style={styles.image}
                    source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${userId}?${new Date(comment?.postedBy.updated)}` }}
                    onError={onImageErrorHandler}
                />
            </TouchableOpacity>

            <View style={isFocused ? styles.content_focused : styles.content}>
                <KeyboardAvoidingView style={styles.row}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Leave a comment"
                            value={text}
                            onChangeText={(value) => setText(value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <View
                            style={[styles.postButtonContainer, styles.column]}
                        >
                            <TouchableOpacity
                                onPress={createCommentHandler}
                            >
                                {isRefreshing ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <MaterialCommunityIcons
                                        name="send"
                                        size={20}
                                        color={Colors.heartColor}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 16,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    content: {
        marginLeft: 10,
        flex: 1,
        backgroundColor: Colors.newCommnetColor,
        padding: 8,
        borderRadius: 8,
        borderColor: Colors.newCommentBorderColor,
        borderWidth: 2,
        // borderTopEndRadius: 8,
    },
    content_focused: {
        borderColor: Colors.heartColor,
        borderWidth: 2,
        marginLeft: 10,
        flex: 1,
        backgroundColor: Colors.newCommnetColor,
        padding: 8,
        borderRadius: 8,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginTop: 6,
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 13,
        fontWeight: "bold",
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
    comment: {
        marginTop: 8,
    },
    inputContainer: {
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'left',
        marginLeft: 4,
    },

    postButtonContainer: {
        position: 'absolute',
        right: 4,
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end,'
    },
    inputs: {
        display: 'flex',
        fontFamily: 'MuseoModerno-Light',
        fontSize: 12,
    },
});

export default NewComment;