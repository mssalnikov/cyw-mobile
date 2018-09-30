import React    from 'react'
import styled   from 'styled-components'
import { BarCodeScanner, Permissions } from 'expo'
import { Text, StyleSheet, Linking } from 'react-native'

import { url }  from 'config'
import { createHeaders }    from 'utils'
import { AsyncStorage } from 'react-native'
import Container from 'components/Container'

class QRCode extends React.Component {
    static navigationOptions = {
        title: 'Scan the code'
    }

    state = {
        hasCameraPermission: null,
      }
    
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }

        return (
            <Container>
                <Header>
                    <Title>Visit this naviaddress for directions</Title>
                    <Naviaddress onPress={this._goToNavi}>
                        <Navi>{this.props.url}</Navi>
                    </Naviaddress>
                </Header>
                <BarCodeScanner
                    onBarCodeScanned={this._checkCode}
                    style={styles.barCode}
                />
            </Container>
        )
    }

    _goToNavi = () => {
        Linking.openURL(this.props.url)
    }

    _checkCode = async (code) => {
        console.log('code', code)
        const result = await fetch(`${url}/enter_token`, {
            method: 'POST',
            headers: createHeaders(await AsyncStorage.getItem('token')),
            body: JSON.stringify({
                point_id: this.props.id,
                token: code.data
            })
        })
        console.log('code s', result.status)
        if (result.status == 200) {
            this.props.onSuccess()
        }
    }
}

const styles = StyleSheet.create({
    barCode: {
        width: '100%',
        height: '100%'
    }
})

const Header = styled.View`
    display: flex;
    width: 100%;
`
const Title = styled.Text`
    color: ${props => props.theme.colors.title};
    font-size: 18px;
    width: 100%;
    margin: 10px 0;
`

const Naviaddress = styled.TouchableOpacity`
    margin-bottom: 10px;
`

const Navi = styled.Text`
    font-size: 16px;
`

export default QRCode