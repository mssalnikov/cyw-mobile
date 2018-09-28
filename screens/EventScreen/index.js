import React    from 'react'
import { Text, Image, View, TouchableOpacity }    from 'react-native'

import styled    from 'styled-components'

class EventScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('event').title
    })

    render() {
        const { title, image, description, owner } = this.props.navigation.state.params.event
        return (
            <Container>
                <Header>
                    <Pic source={{ uri: image }} />
                    <Title>{title}</Title>
                </Header>
                <Description>
                    { description }
                </Description>
                <Button>
                    <ButtonText>Join</ButtonText>
                </Button>
            </Container>
        )
    }
}

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    flex: 1;
`

const Header = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`

const Pic = styled.Image`
    width: 150px;
    height: 150px;
    margin-right: 20px;
`

const Title = styled.Text`
    color: ${props => props.theme.colors.title};
    flex: 1;
    font-size: 18px;
`

const Description = styled.Text`
    font-size: 14px;
    margin: 10px 0;
    width: 100%;
`

const Button = styled.TouchableOpacity`
    padding: 10px;
    margin: 20px 0;

    border: 2px solid ${props => props.theme.colors.title};
    border-radius: 10px;

    margin-top: auto;
    width: 200px;
    background: white;
`

const ButtonText = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.colors.title};
    text-align: center;
`

export default EventScreen