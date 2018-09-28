import React    from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import styled   from 'styled-components'
import { connect }  from 'react-redux'

// import Events   from './components/Events'
import Navigation from './Navigation'


class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Events',
    })

    render() {
        return (
            <Container>
                {/* <EventCard>
                    <Title>Your events</Title>
                    <Events events={[
                        { title: 'Moscow Mule quest'},
                        { title: 'Run through forrest'},
                        { title: 'Jason\'s birthday'},
                    ]} />
                </EventCard>
                <EventCard>
                    <Title>Nearby events</Title>
                    <Events events={[
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
                </EventCard> */}
                <Navigation />
            </Container>
        )
    }
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
`

const EventCard = styled.View`
    width: 100%;
`

const Title = styled.Text`
    font-size: 18px;
    margin: 10px 0;
    color: ${props => props.theme.colors.title};
`

const mapStateToProps = state => ({
    user: state.user,
    my_events: state.my_events,
    events: state.events
})

export default connect(mapStateToProps)(HomeScreen)