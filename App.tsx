import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { HomeScreen } from './src/screens/HomeScreen';
import { LandingScreen } from './src/screens/LadingScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Image, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/redux'
const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen
    },{
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },
  homeStack: createBottomTabNavigator({
    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={style.tabIcon} />
        }
      }
   },
   offer: {
    screen: createStackNavigator({
      OfferPage: HomeScreen
    }),
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        let icon = focused ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
        return <Image source={icon} style={style.tabIcon} />
      }
    }
    },
    Cart: {
      screen: createStackNavigator({
        CartPage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={style.tabIcon} />
        }
    }
    },
    Account: {
      screen: createStackNavigator({
        AccountPage: HomeScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={style.tabIcon} />
        }
    }
    }
 })
})
const AppNavigation = createAppContainer(switchNavigator);
export default function App() {
  return (
    <Provider store={store}>
    <AppNavigation />
    </Provider>
  );
}

const style = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
})

