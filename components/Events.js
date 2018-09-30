import React    from 'react'
import { View, Text, Image, TouchableOpacity }    from 'react-native'
import { withNavigation }   from 'react-navigation'
import styled       from 'styled-components'

const Events = ({ events, navigation }) => (
    <Container>
        {
            events.map((el, i) => (
                <Event key={i} onPress={() => navigation.push('Event', { event: el })}>
                    <Title>{el.name}</Title>  
                </Event>
            ))
        }
    </Container>
)

const Container = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Event = styled.TouchableOpacity`
    margin: 2px 0;
    border: 1px solid ${props => props.theme.colors.title};
    padding: 10px;
    width: 100%;
    background: white;
    border-radius: 10px;
`

const Title = styled.Text`
    font-size: 14px;
`

export default withNavigation(Events)