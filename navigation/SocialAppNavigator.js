import React from 'react';
import Colors from '../constants/Colors';
import { Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllPostsScreen, { screenOptions as allPostsScreenOptions } from '../screens/post/AllPostsScreen';
import EditPostScreen, { screenOptions as editPostScreenOptions } from '../screens/post/EditPostScreen';
import CommentsScreen, { screenOptions as commentsScreenOptions } from '../screens/post/CommentsScreen';
import AddPostScreen, { screenOptions as addPostScreenOptions } from '../screens/post/AddPostScreen';
import UserProfileScreen, { screenOptions as userProfileScreenOptions } from '../screens/user/UserProfileScreen';
import FindPeopleScreen from '../screens/user/FindPeopleScreen';
import UserStatsScreen, { screenOptions as userStatsScreenOptions } from '../screens/user/UserStatsScreen';
import UserPostsScreen, { screenOptions as userPostsScreenOptions } from '../screens/user/UserPostsScreen';
import EditProfileScreen, { screenOptions as editProfileScreenOptions } from '../screens/user/EditProfileScreen';

import ChatListScreen, { screenOptions as chatListScreenOptions } from '../screens/chat/ChatListScreen';
import ChatScreen, { screenOptions as chatScreenOptions } from '../screens/chat/ChatScreen';

import AuthScreen from '../screens/auth/AuthScreen';
import ForgotPasswordScreen, { screenOptions as forgotPasswordScreenOptions } from '../screens/auth/ForgotPasswordScreen';
import Styles from '../constants/Styles';
import { PageTitle } from '../components/UI/PageTitle';
import { TabBarButton } from '../components/UI/TabBarButton';
import { Header } from '../components/UI/Header';
import MenuItem from '../components/UI/MenuItem';

const defaultNavOptions = {
    headerTitle: (props) => (<Header title={props.children} />),
    headerBackTitle: ' ',
    headerBackTitleStyle: {
        fontFamily: 'MuseoModerno-Light',
        fontSize: 14,
    },
    headerShown: true,
};


const getTabBarVisibility = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

    if (routeName === 'Chat') {
        return false;
    }

    return true;
}


const PostStackNavigator = createStackNavigator();

const PostNavigator = () => {
    return (
        <PostStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <PostStackNavigator.Screen
                name="AllPosts"
                component={AllPostsScreen}
                options={allPostsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}

            />
            <PostStackNavigator.Screen
                name="EditPost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
            <PostStackNavigator.Screen
                name="ChatList"
                component={ChatListScreen}
                options={chatListScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}
            />
        </PostStackNavigator.Navigator>
    );
};



const FindPeopleStackNavigator = createStackNavigator();

const FindPeopleNavigator = () => {
    return (
        <FindPeopleStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <FindPeopleStackNavigator.Screen
                name="Find"
                component={FindPeopleScreen}
                options={{ headerShown: false }}
            />
            <FindPeopleStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}
            />

        </FindPeopleStackNavigator.Navigator>
    );
};


const CreatePostStackNavigator = createStackNavigator();

const CreatePostNavigator = () => {
    return (
        <CreatePostStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <CreatePostStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
        </CreatePostStackNavigator.Navigator>
    );
};



const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <UserStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <UserStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={editProfileScreenOptions}
            />
        </UserStackNavigator.Navigator>
    );
};


const BottomTabNavigator = createBottomTabNavigator();

export const BottomNavigator = () => {
    return (
        <BottomTabNavigator.Navigator
            screenOptions={{
                tabBarButton: (props) => <TabBarButton {...props} />,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#000",
                tabBarLabelStyle: { fontFamily: "MuseoModerno-Light" },
                tabBarIconStyle: { marginTop: 8 },
                tabBarStyle: { paddingTop: 4 },
            }}
        >


            <BottomTabNavigator.Screen
                name="Puneri Patya.com"
                component={PostNavigator}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'Home',
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerShadowVisible: false,
                    // headerTitleStyle: { ...Styles.pageTitle },
                    headerTitle: (props) => (<PageTitle title={'Puneri Patya.com'} />),
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'home'}
                            size={20}
                            color={props.color}
                        />
                    ),
                    tabBarIconStyle: { marginTop: 8 },
                })}
            />
            {/* <BottomTabNavigator.Screen
                name="FindPeople"
                component={FindPeopleNavigator}
                options={{
                    tabBarLabel: 'Find People',
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'people'}
                            size={24}
                            color={props.color}
                        />
                    )
                }}
            /> */}

            <BottomTabNavigator.Screen
                name="AddPost"
                component={CreatePostNavigator}
                options={{
                    tabBarLabel: 'New Pati',
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'add-circle-outline'}
                            size={20}
                            color={props.color}
                        />
                    ),
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: { ...Styles.pageTitle },
                    headerTitle: (props) => (<PageTitle title={'New Pati'} />),
                }}
            />

            <BottomTabNavigator.Screen
                name="YourProfile"
                component={UserNavigator}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'Me',
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerShadowVisible: false,
                    // headerTitleStyle: { ...Styles.pageTitle },
                    headerTitle: (props) => (<PageTitle title={'My Profile'} />),
                    tabBarIcon: (props) => (
                        <Ionicons
                            name={'person'}
                            size={20}
                            color={props.color}
                        />
                    ),
                    tabBarIconStyle: { marginTop: 8 },
                    headerRight: () => (
                        <MenuItem />
                    )
                })}
            />

        </BottomTabNavigator.Navigator >
    );
};




const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={forgotPasswordScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};
