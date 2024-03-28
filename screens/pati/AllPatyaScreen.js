import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';
import * as usersActions from '../../store/actions/users';


const AllPatyaScreen = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refPosts = useRef(null);

    const posts = useSelector(state => state.posts.allPosts);
    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const loadPosts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());
            await dispatch(usersActions.fetchUsers());
            //await dispatch(chatActions.fetchChatList());

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])


    const toggleLikeHandler = async (postId, isLiked) => {
        try {
            if (isLiked) {
                await dispatch(postsActions.unlikePost(postId))
            } else {
                await dispatch(postsActions.likePost(postId))
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }

    useEffect(() => {
        setIsLoading(true);
        loadPosts()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadPosts])

    if (error) {
        return (
            <View style={styles.centered} >
                <Text style={styles.text}>{error}</Text>
                <Button title="Try again" onPress={loadPosts} color={Colors.primary} style={styles.text} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && posts.length === 0) {
        return (
            <View style={styles.centered} >
                <Text style={styles.text}>No patya found. {"\n"}Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <FlatList
                ref={refPosts}
                style={styles.list}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={posts}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                renderItem={(post) => {
                    return (
                        <Card post={post.item} userId={loggedUser._id} toggleLikeHandler={toggleLikeHandler} />
                    )
                }}
            />

        </View>
    );
};



export const screenOptions = () => {
    return {
        headerShown: false,
    };
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "MuseoModerno-SemiBold",
        fontSize: 14,
    },
    text: {
        fontFamily: "MuseoModerno-Regular",
        fontSize: 18,
    },
    list: {
        width: '100%',
    },
    separator: {
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        width: '100%',
    },

})

export default AllPatyaScreen;