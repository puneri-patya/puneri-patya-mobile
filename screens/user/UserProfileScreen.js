import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,

} from "react-native";

import { Container, Button } from 'native-base'
var { height, width } = Dimensions.get('window');
import { Octicons } from '@expo/vector-icons';


import Colors from '../../constants/Colors';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';

import { useDispatch, useSelector } from "react-redux";
import ENV from '../../env';
import MenuItem from "../../components/UI/MenuItem";
import { showMessage } from "react-native-flash-message";
import VerifiedUser from "../../constants/VerifiedUser";
import Styles from "../../constants/Styles";


const UserProfileScreen = (props) => {
    const { route } = props;
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];

    let userId;

    if (route.params && route.params.userId) {
        userId = route.params.userId;
    } else {
        userId = useSelector(state => state.auth.user._id);
    }

    const users = useSelector(state => state.users.allUsers);
    const posts = useSelector(state => state.posts.allPosts);
    const currUser = users.filter(u => u._id === userId)[0];
    const currUserPosts = posts.filter(p => p.postedBy._id === userId);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');

    const dispatch = useDispatch();


    const loadUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());
            await dispatch(postsActions.fetchPosts());
        } catch (err) {
            console.log(err);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading]);

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
        return isFollowed;
    }

    const followUserHandler = async () => {
        let user = { ...currUser };
        delete user.created;
        delete user.followers;
        delete user.following;
        // setIsFollowLoading(true);

        if (checkFollow(user._id)) {
            showMessage({
                message: `Your have unfollowed ${user.name}.`,
                type: "warning",
                duration: 3000,
                icon: { icon: "warning", position: 'left' }
            });
            await dispatch(usersActions.unfollowUser(user))
        } else {
            showMessage({
                message: `Your are now following ${user.name}.`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            await dispatch(usersActions.followUser(user))
        }
        // setIsFollowLoading(false);
    }







    const renderSectionOne = () => {
        if (currUserPosts.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: '#c2c2c2', borderTopWidth: 1 }} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }} >No Posts</Text>
                    {currUser._id === loggedInUserId && (
                        <Button
                            style={{ backgroundColor: Colors.brightBlue, padding: 10, borderRadius: 25, marginTop: 15 }}
                            onPress={() => props.navigation.navigate('AddPost')}
                        >
                            <Text style={{ color: '#fff' }} >Create Post</Text>
                        </Button>
                    )}

                </View>
            )
        }
        return currUserPosts.map((post, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => props.navigation.navigate('UserPosts', { userId: userId, postIndex: index, name: currUser.name, fromUserProfile: true })}
                >
                    <View style={styles.thumbnail}>
                        <Image
                            style={styles.image}
                            source={
                                post.updated ? (
                                    { uri: `${ENV.apiUrl}/post/photo/${post._id}?${new Date(post.updated)}` }
                                ) : (
                                    { uri: `${ENV.apiUrl}/post/photo/${post._id}` }
                                )
                            }
                        />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    const renderSection = () => {
        return (
            <>
                <View>
                    <Text style={[Styles.h1, Styles["ms-2"]]}>My Patya</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
                    {renderSectionOne()}
                </View>
            </>
        )
    }


    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }


    return (
        // <Container style={styles.container} >

        <View style={styles.container}>
            {/* <Container style={{ backgroundColor: 'red' }} size='full'
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={loadUsers} />
                }
            > */}
            <View style={{ paddingTop: 20, width: '100%' }}>
                {/** User Photo Stats**/}
                <View style={{ flexDirection: 'row', width: '100%', alignItems: "stretch" }}>
                    {/**User photo takes 1/3rd of view horizontally **/}
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image
                            source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${currUser._id}?${new Date(currUser.updated)}` }}
                            onError={onImageErrorHandler}
                            style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: "#c2c2c2" }}
                        />
                    </View>
                    {/**User Stats take 2/3rd of view horizontally **/}
                    <View style={{ flex: 3, paddingStart: 20, alignItems: 'stretch', width: '100%', justifyContent: 'space-around' }}>
                        {/** Stats **/}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'flex-end'
                            }}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <TouchableComp
                                    // background={ Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#c2c2c2', true) }
                                    onPress={() => props.navigation.navigate(
                                        'UserPosts',
                                        { userId: userId, postIndex: 0, fromUserProfile: true }
                                    )}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <Text style={styles.number} >{currUserPosts.length}</Text>
                                        <Text style={styles.subHeading}>Patya</Text>
                                    </View>
                                </TouchableComp>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <TouchableComp
                                //background={Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#c2c2c2', true)}
                                // onPress={() => props.navigation.navigate(
                                //     'UserStats',
                                //     { activeTab: 0, currUser: currUser }
                                // )}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <Text style={styles.number} >{currUser.followers.length}</Text>
                                        <Text style={styles.subHeading}>Followers</Text>
                                    </View>
                                </TouchableComp>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <TouchableComp
                                    background={Platform.OS === 'ios' ? undefined : TouchableNativeFeedback.Ripple('#c2c2c2', true)}
                                // onPress={() => props.navigation.navigate(
                                //     'UserStats',
                                //     { activeTab: 1, currUser: currUser }
                                // )}
                                >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <Text style={styles.number} >{currUser.following.length}</Text>
                                        <Text style={styles.subHeading}>Following</Text>
                                    </View>
                                </TouchableComp>
                            </View>
                        </View>
                        {/**
                             * Edit profile and Settings Buttons **/}

                        {userId === loggedInUserId ? (
                            <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>
                                <View
                                    style={{ flexDirection: 'row' }}>
                                    <Button
                                        onPress={() => props.navigation.navigate('EditProfile')}
                                        bordered
                                        dark
                                        style={styles.button}
                                    >
                                        <Text style={Styles.whiteText}>Edit Profile</Text>
                                    </Button>
                                </View>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row' }}>
                                    <Button
                                        onPress={followUserHandler}
                                        bordered
                                        dark
                                        style={styles.button}
                                    >
                                        {checkFollow(currUser._id) ? (
                                            <>
                                                {isFollowLoading ? (
                                                    <ActivityIndicator size="small" color="#fff" />
                                                ) : (
                                                    <Text style={Styles.whiteText} >Unfollow</Text>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {isFollowLoading ? (
                                                    <ActivityIndicator size="small" color="#fff" />
                                                ) : (
                                                    <Text style={Styles.whiteText} >Follow</Text>
                                                )}
                                            </>
                                        )}
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        )}
                        {/**End edit profile**/}
                    </View>
                </View>



                <View style={{ paddingBottom: 10, paddingTop: 20 }}>
                    <View style={Styles.row}>
                        <Text style={Styles.underline}></Text>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }} >
                        <Text style={Styles.title}>
                            {currUser.name + " "}
                            {
                                VerifiedUser.verifiedUsersId.includes(currUser._id) && <Octicons name="verified" size={20} color={Colors.brightBlue} />
                            }
                        </Text>

                        {currUser.about && (
                            <Text style={Styles.description}>{currUser.about} </Text>
                        )}
                        {(userId === loggedInUserId) && (
                            <Text style={Styles.description}>{currUser.email}</Text>)}
                    </View>
                    <View style={Styles.row}>
                        <Text style={Styles.underline}></Text>
                    </View>
                </View>
            </View>


            <View style={{ paddingTop: 20 }}>
                {renderSection()}
            </View>
            {/* </Container> */}
        </View>
        // </Container >
    );
}

export const screenOptions = (navData) => {

    const routeParams = navData.route.params ? navData.route.params : {};
    if (!routeParams.name) {
        return {
            headerTitle: routeParams.name ? routeParams.name : "Profile",
            headerRight: () => (
                <MenuItem />
            ),
            headerShown: false,
        }
    } else {
        return {
            title: `${routeParams.name}\'s Profile`
        }
    }


}




const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        //borderWidth: 1,
        width: '100%',
    },
    number: {
        fontSize: 32,
        fontFamily: "MuseoModerno-Black",
        color: Colors.heartColor
    },
    subHeading: {
        fontSize: 14,
        fontFamily: "MuseoModerno-Regular",
        color: Colors.primary,
        marginTop: -10
    },
    button: {
        width: '100%',
        padding: 10,
        borderRadius: 25,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        width: (width) / 4,
        height: (width) / 4,
        marginBottom: 2,
        marginHorizontal: 4
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        backgroundColor: '#c2c2c2',
        borderRadius: 5
    }
});

export default UserProfileScreen;

