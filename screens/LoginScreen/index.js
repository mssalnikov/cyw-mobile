import React from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { connect }  from 'react-redux'
import Container from 'components/Container'

import styled from 'styled-components/native'
import { createLogin } from 'actions/user'

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    }

    state = {

    }

    static getDerivedStateFromProps(props) {
        if (props.user.success || props.user.auth_token) {
            props.navigation.replace('Home')
            return {}
        }
        return {
            peinding: props.user.pending,
        }
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

            this.props.login(user.id, result.token)
            // this.props.navigation.push('Home', { name: user.name, avatar })

        } catch (err) {
            console.log('err', err)
        }
    }
}

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

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    login: (fbid, fbtoken) => dispatch(createLogin(fbid, fbtoken))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)