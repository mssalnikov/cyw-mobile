import { createStackNavigator } from 'react-navigation'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen  from '../screens/HomeScreen'
import EventScreen  from '../screens/EventScreen'
import CreateEventScreen from '../screens/CreateEventScreen'
import QuestionScreen from '../screens/QuestionScreen'
import QRCodeScreen from '../screens/QRCodeScreen'

// export const AppNavigator = createStackNavigator({
//     Home: {
//         screen: HomeScreen,
//         navigationOptions: {
//             title: 'Events'
//         }
//     },
//     Login: LoginScreen,
//     Event: EventScreen
// },
// {
//     initialRouteName: 'Login'
// })

export const AppNavigator = createStackNavigator({
    Home: QRCodeScreen
})