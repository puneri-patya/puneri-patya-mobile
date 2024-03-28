import React, { useState } from 'react';

import {
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';

import ENV from '../../env';
import { timeDifference } from '../../helpers/timeDifference';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as postsActions from '../../store/actions/posts';
import { showErrorMessage, showSuccessMessage } from '../../helpers/ShowMessage';
import { CustomImage } from './image/CustomImage';
import { StyledText } from './typography/StyledText';
import { VerifiedBadge } from './typography/VerifiedBadge';
import { IconButton } from './form/IconButton';
import Styles from '../../constants/Styles';
import { YesNoAlert } from './notifications/CustomAlert';

interface CommentProps {
    comment: any;
    userId: string;
    postId: string;
}

export const Comment = (props: CommentProps) => {

    const { comment, postId } = props;
    const [imageUri, setImageUri] = useState('')
    const dispatch = useDispatch();

    const deleteComment = async () => {
        YesNoAlert('Are you sure?', 'Do you really want to delete this comment? This cannot be undone.', async () => {
            try {
                await dispatch(postsActions.uncommentPost(postId, comment));
                showSuccessMessage('Your comment was deleted.');
            } catch (error: any) {
                showErrorMessage("Oops! An error occured.", error.message);
            }
        });

    };

    return (
        <View style={styles.container} key={comment._id}>
            <CustomImage
                style={styles.image}
                source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${comment.postedBy._id}?${new Date(comment.postedBy.updated).getTime()}` }}
                alt='User Image'
            />
            <View style={styles.content}>
                <View style={Styles.row as ViewStyle}>
                    <View style={Styles.column as ViewStyle}>
                        <StyledText text={comment.postedBy.name + ' '} varient='smallTitle'>
                            <VerifiedBadge userId={comment.postedBy._id} />
                        </StyledText>
                        <StyledText text={timeDifference(new Date(), new Date(comment.created))} varient='smallSubTitle' />
                    </View>

                </View>

                <View style={Styles.row as ViewStyle}>
                    <StyledText text={comment.text} varient='normal' />
                    <IconButton
                        iconName='delete'
                        iconSize={20}
                        iconColor={Colors.heartColor}
                        onPress={deleteComment}
                        style={{ ...styles.rightAligned }}
                    />
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

    rightAligned: {
        position: 'absolute',
        right: 0,
        bottom: 0,

    }
});

export default Comment;