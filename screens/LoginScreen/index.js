import React from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'


import styled from 'styled-components/native'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    }

    render() {
        return (
            <Container>
                <Link onPress={this.handlePress}>
                    <Icon source={require('../../assets/images/facebook.png')} />
                    <LoginText>
                        LOGIN WITH FACEBOOK
                    </LoginText>
                </Link>
            </Container>
        )
    }

    handlePress = async () => {
        try {
            const result = await Expo.Facebook.logInWithReadPermissionsAsync('165722150506689', {
                permissions: ['public_profile', 'email']
            })

            const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`)
            const user = await response.json()
            const avatar = `https://graph.facebook.com/${user.id}/picture?height=300`

            console.log(user)

            this.props.navigation.push('Home', { name: user.name, avatar })

        } catch (err) {
            console.log('err', err)
        }
    }
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Link = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
`

const LoginText = styled.Text`
    font-size: 18px;
    color: #3a5998;
`

