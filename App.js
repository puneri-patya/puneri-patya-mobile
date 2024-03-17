import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from 'react-native-popup-menu';
// import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './store/reducers/auth';
import postsReducer from './store/reducers/posts';
import usersReducer from './store/reducers/users';
import chatReducer from './store/reducers/chat';
import AppNavigator from './navigation/AppNavigator';
import { NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';


const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  chat: chatReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  // composeWithDevTools()
);



export default function App() {

  const [fontsLoaded] = useFonts({
    // 'Gluten-Black': require('./assets/fonts/Gluten-Black.ttf'),
    // 'Gluten-Bold': require('./assets/fonts/Gluten-Bold.ttf'),
    // 'Gluten-ExtraBold': require('./assets/fonts/Gluten-ExtraBold.ttf'),
    // 'Gluten-ExtraLight': require('./assets/fonts/Gluten-ExtraLight.ttf'),
    // 'Gluten-Light': require('./assets/fonts/Gluten-Light.ttf'),
    // 'Gluten-Medium': require('./assets/fonts/Gluten-Medium.ttf'),
    // 'Gluten-Regular': require('./assets/fonts/Gluten-Regular.ttf'),
    // 'Gluten-SemiBold': require('./assets/fonts/Gluten-SemiBold.ttf'),
    // 'Gluten-Thin': require('./assets/fonts/Gluten-Thin.ttf'),
    'Matarani-Regular': require('./assets/fonts/Matarani-Regular.ttf'),
    'MuseoModerno-Black': require('./assets/fonts/MuseoModerno/MuseoModerno-Black.ttf'),
    'MuseoModerno-Bold': require('./assets/fonts/MuseoModerno/MuseoModerno-Bold.ttf'),
    'MuseoModerno-ExtraBold': require('./assets/fonts/MuseoModerno/MuseoModerno-ExtraBold.ttf'),
    'MuseoModerno-ExtraLight': require('./assets/fonts/MuseoModerno/MuseoModerno-ExtraLight.ttf'),
    'MuseoModerno-Light': require('./assets/fonts/MuseoModerno/MuseoModerno-Light.ttf'),
    'MuseoModerno-Medium': require('./assets/fonts/MuseoModerno/MuseoModerno-Medium.ttf'),
    'MuseoModerno-Regular': require('./assets/fonts/MuseoModerno/MuseoModerno-Regular.ttf'),
    'MuseoModerno-SemiBold': require('./assets/fonts/MuseoModerno/MuseoModerno-SemiBold.ttf'),
    'MuseoModerno-Thin': require('./assets/fonts/MuseoModerno/MuseoModerno-Thin.ttf'),

  });

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <MenuProvider style={{ flex: 1 }}>
          <AppNavigator />
        </MenuProvider>
        <FlashMessage position="top" />
      </Provider>
    </NativeBaseProvider>
  );
}

