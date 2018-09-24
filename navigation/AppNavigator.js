import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen  from '../screens/HomeScreen'
import EventScreen  from '../screens/EventScreen'

export const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Event: EventScreen
},
{
    initialRouteName: 'Login'
})