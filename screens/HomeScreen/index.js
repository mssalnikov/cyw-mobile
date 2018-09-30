import React    from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import styled from 'styled-components'

import MyEvents from './components/MyEvents'
import AllEvents from './components/AllEvents'

const My = MyEvents
const All = AllEvents


export default createBottomTabNavigator({
    My: {
        screen: My,
        navigationOptions: {
            tabBarIcon: () => <Icon source={require('../../assets/images/tabs/my.png')} />
        }
    },
    All: {
        screen: All,
        navigationOptions: {
            tabBarIcon: () => <Icon source={require('../../assets/images/tabs/near.png')} />
        }
    },
}, {
    initialRouteName: 'My',
    tabBarOptions: {
    activeTintColor: '#FF7F50',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'white',

        },
    }
})

const Icon = styled.Image`
    width: 15px;
    height: 15px;
`