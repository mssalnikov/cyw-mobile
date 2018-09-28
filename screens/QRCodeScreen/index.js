import React    from 'react'
import styled   from 'styled-components'
import { BarCodeScanner, Permissions } from 'expo'
import { Text, StyleSheet } from 'react-native'


class QRCodeScreen extends React.Component {
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
            <BarCodeScanner
                onBarCodeScanned={t => console.log(t)}
                style={styles.barCode}
            />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    barCode: {
        width: '100%',
        height: '100%'
    }
})

const Container = styled.View`
    display: flex;
    padding: 20px;
    align-items: center;
    height: 100%;
`

export default QRCodeScreen