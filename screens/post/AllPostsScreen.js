import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Platform, AsyncStorage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as postsActions from '../../store/actions/posts';
import * as usersActions from '../../store/actions/users';
import * as chatActions from '../../store/actions/chat';
import LinearGradient from 'react-native-linear-gradient';


const AllPostsScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refPosts = useRef(null);

    const posts = useSelector(state => state.posts.allPosts);
    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const loadPosts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());
            await dispatch(usersActions.fetchUsers());
            await dispatch(chatActions.fetchChatList());

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



    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', loadPosts);

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [loadPosts])
    // useEffect(() => {
    //     const unsubscribe = navigation.dangerouslyGetParent().addListener('tabPress', e => {
    //         console.log("TAB PRESSED");
    //         if(refPosts.current){
    //             refPosts.current.scrollToIndex({ animated: true, index: 0 });
    //         }
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [])

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
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadPosts} color={Colors.primary} />
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
                <Text>No posts found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <LinearGradient colors={['#ffffff', '#e3e9f2', '#5b94f7', '#bd3a3f']} locations={[0, 0.40, 0.64, 1]} style={styles.container}> */}
                {/* <View style={styles.screen} > */}
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
                        console.log("posts - ", post.index);
                        return (
                            <Card post={post.item} userId={loggedUser._id} toggleLikeHandler={toggleLikeHandler} />
                        )
                    }}
                />

                {/* </View> */}
            {/* </LinearGradient> */}
        </View>
    );
};



export const screenOptions = (navData) => {
    return {
        headerShown: false,
        headerTitle: 'All Patya',
        headerLeft: () => (
            <Ionicons
                name={'menu'}
                size={24}
                color={Platform.OS === 'android' ? '#fff' : Colors.brightBlue}
                style={{ padding: 15, marginLeft: 5 }}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        ),
        // headerRight: () => (
        //     <Ionicons
        //         name={'chatbox'}
        //         size = {24}
        //         color={Platform.OS === 'android' ? '#fff' : Colors.brightBlue}
        //         style={{  padding: 15, marginRight: 5 }}
        //         onPress={() => navData.navigation.navigate('ChatList')}
        //     />
        // )
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
        alignItems: 'center'
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

export default AllPostsScreen;