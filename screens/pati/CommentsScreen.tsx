import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import Comment from '../../components/UI/Comment';
import { useSelector } from 'react-redux';

import ENV from '../../env';
import { StyledText } from '../../components/UI/typography/StyledText';
import { Separator } from '../../components/UI/utility/Separator';
import { CustomImage } from '../../components/UI/image/CustomImage';
import { Post } from '../../store/models/Posts';
import NewComment from '../../components/UI/NewComment';

export const CommentsScreen = (props: { route: any; }) => {

    const [post, setPost] = useState({ comments: [] } as unknown as Post);

    const { route } = props;
    const postId = route.params.postId;
    const userId = route.params.userId;

    const posts = useSelector((state: any) => state.posts.allPosts);
    const postIndex = posts.findIndex((post: Post) => post._id === postId);
    const comments = post.comments;

    useEffect(() => {
        setPost(posts[postIndex]);
    }, [])

    return (
        <View style={styles.container} >
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 10 }} >
                <CustomImage
                    containerStyle={styles.cardImageContainer}
                    style={styles.cardImage}
                    source={{ uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date()}` }}
                    alt={post.title}
                />

                <StyledText varient='title' text={post.title} />
                <StyledText varient='subTitle' text={post.body} />

                <Separator varient='primary' />

                {comments.map(comment => (<Comment comment={comment} userId={userId} postId={postId} key={comment._id} />))}
            </ScrollView>

            <NewComment comment={comments[0]} userId={userId} postId={postId} />
        </View>
    );
};

export const screenOptions = ({ route }: { route: any }) => ({
    title: `Comments for ${route.params.title}`
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff",
        position: 'relative',
        flexDirection: 'column',
        flexGrow: 1
    },

    cardImageContainer: {
        backgroundColor: '#c2c2c2',
        display: 'flex',
        height: 275,
        marginVertical: 10
    },
    cardImage: {
        flex: 1,
    }
});