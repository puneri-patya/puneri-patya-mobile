import React, { useState } from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import ENV from '../../env';
import { useDispatch } from 'react-redux';
import * as postsActions from '../../store/actions/posts';
import { CustomImage } from './image/CustomImage';
import { InputWithButton } from './form/InputWithButton';
import { showErrorMessage } from '../../helpers/ShowMessage';

const NewComment = (props: any) => {

    const { comment, userId, postId } = props;
    const [imageUri, setImageUri] = useState('')
    const textState = useState('');
    const [text, setText] = textState;
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const createCommentHandler = async () => {
        if (text.length === 0) {
            showErrorMessage('Please enter some text', 'Cannot create empty comment');
        } else {
            setIsLoading(true);
            try {
                await dispatch(postsActions.commentPost(postId, text))
            } catch (error: any) {
                showErrorMessage('Sorry. Unable to post your comment', error.message);
            }
            setText('');
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <CustomImage
                style={styles.image as any}
                source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${userId}?${new Date(comment?.postedBy?.updated).getTime()}` }}
                alt='User Image'
                onImageError={onImageErrorHandler}
            />

            <View style={{ paddingHorizontal: 10, paddingEnd: 20 }}>
                <InputWithButton
                    variant="primary"
                    placeholder="Leave a comment"
                    inputState={textState}
                    onChangeText={(value: any) => setText(value)}
                    onPress={createCommentHandler}
                    isLoading={isLoading}
                    label="Post" />
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

    image: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginTop: 6,
    },
});

export default NewComment;