import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import ENV from '../../env';
import { timeDifference } from '../../helpers/timeDifference';
import VerifiedUser from '../../constants/VerifiedUser';
import Colors from '../../constants/Colors';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import * as postsActions from '../../store/actions/posts';


const Comment = (props) => {

    const { comment, userId, postId } = props;
    const [imageUri, setImageUri] = useState('')
    const dispatch = useDispatch();


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const deleteComment = async () => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this comment? This cannot be undone.',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(postsActions.uncommentPost(postId, comment));
                            showMessage({
                                message: `Your comment was deleted.`,
                                type: "warning",
                                duration: 3000,
                                icon: { icon: "warning", position: 'left' }
                            });
                        } catch (error) {
                            Alert.alert(
                                'Error, cannot delete this comment',
                                error.message,
                                [{ text: 'Okay' }]
                            );
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.image}
                    source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${comment.postedBy._id}?${new Date(comment.postedBy.updated)}` }}
                    onError={onImageErrorHandler}
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.row}>

                    <View style={styles.column}>
                        <View>
                            <Text style={styles.name}>
                                {comment.postedBy.name + " "}
                                {
                                    VerifiedUser.verifiedUsersId.includes(comment.postedBy._id) && <Octicons name="verified" size={16} color={Colors.brightBlue} />
                                }
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.time}>
                                {timeDifference(new Date(), new Date(comment.created))}
                            </Text>
                        </View>
                    </View>

                </View>

                <View style={styles.row} >
                    <Text style={styles.comment}>{comment.text}</Text>
                    {comment.postedBy._id === userId && (
                        <TouchableOpacity
                            style={styles.rightAligned}
                            onPress={deleteComment}
                        >
                            <MaterialCommunityIcons
                                name="delete"
                                size={20}
                                color={Colors.heartColor}
                            />
                        </TouchableOpacity>
                    )}
                </View>
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
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 10,
        flex: 1,
        backgroundColor: Colors.commentColor,
        padding: 8,
        borderBottomStartRadius: 8,
        borderTopEndRadius: 8,
    },
    image: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    time: {
        fontSize: 11,
        color: "#505050",
        fontFamily: 'MuseoModerno-Light',
        // color: '#fff',
        marginTop: -5,
    },
    name: {
        fontFamily: 'MuseoModerno-SemiBold',
        fontSize: 13,
        fontWeight: "bold",
        // color: '#fff'
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
        fontFamily: 'MuseoModerno-Regular',
        // color: '#fff',
    },
    rightAligned: {
        position: 'absolute',
        right: 0
    }
});

export default Comment;