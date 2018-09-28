import React    from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Image }    from 'react-native'
import Events   from 'components/Events'
import styled from 'styled-components';

const My = () => <Events events={[
    { title: 'Moscow Mule quest'},
    { title: 'Run through forrest'},
    { title: 'Jason\'s birthday'},
]}/>

const Near = () => <Events events={[
    { title: 'Easy girl looking for a man, can you find me?'},
    { title: '5g pineapple express in two hops'},
    { title: 'Easter scavenger hunt 18+'},
    { 
        title: 'Speak easy bar only for physicists',
        image: 'http://1.bp.blogspot.com/-EIqqVOCuIcE/T5HfIXEk05I/AAAAAAAAARk/NzQrgFJ5itI/s1600/einstein.jpg',
        description: 'Reimagining of Schrödinger\'s Cat Breaks Quantum Mechanics—and Stumps Physicists. Pulsar Discoverer Jocelyn Bell Burnell Wins $3-Million Breakthrough Prize. The award recognizes not only the astrophysicist’s transformative discovery, but also her subsequent work to promote equality and diversity in science.'
    },
    { title: 'Quest in reality starts here!'},
]} />

const Active = () => <Events events={[
    { title: 'Easy girl looking for a man, can you find me?'},
    { title: '5g pineapple express in two hops'},
    { title: 'Easter scavenger hunt 18+'},
    { 
        title: 'Speak easy bar only for physicists',
        image: 'http://1.bp.blogspot.com/-EIqqVOCuIcE/T5HfIXEk05I/AAAAAAAAARk/NzQrgFJ5itI/s1600/einstein.jpg',
        description: 'Reimagining of Schrödinger\'s Cat Breaks Quantum Mechanics—and Stumps Physicists. Pulsar Discoverer Jocelyn Bell Burnell Wins $3-Million Breakthrough Prize. The award recognizes not only the astrophysicist’s transformative discovery, but also her subsequent work to promote equality and diversity in science.'
    },
    { title: 'Quest in reality starts here!'},
]} />

export default createBottomTabNavigator({
    My: {
        screen: My,
        navigationOptions: {
            tabBarIcon: () => <Icon source={require('../../assets/images/tabs/my.png')} />
        }
    },
    Near: {
        screen: Near,
        navigationOptions: {
            tabBarIcon: () => <Icon source={require('../../assets/images/tabs/near.png')} />
        }
    },
    InProgress: {
        screen: Active,
        navigationOptions: {
            title: 'In progress',
            tabBarIcon: () => <Icon source={require('../../assets/images/tabs/in-progress.png')} />
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