import React from 'React'
import styled from 'styled-components/native'
import { connect }  from 'react-redux'

import Container from 'components/Container'
import Events from 'components/Events'
import Button from 'components/Button'
import { createGetMyEvents } from '../../../state/actions/events';

class MyEvents extends React.Component {
    state = {
        pending: true
    }

    componentDidMount() {
        this.props.getMyEvents()
    }

    static getDerivedStateFromProps(props) {
        console.log('pev', props.events)
        if (props.events.success) {
            return { pending: false }
        } else {
            return { pending: true }
        }
    }

    render() {
        const { pending } = this.state
        if (pending) return <Container></Container>

        const { events: { data: events }} = this.props 
        console.log('ev', events)
        return (
            <Container>
                {events.length == 0 && 
                    <Text>
                        You don't have events yet
                    </Text>
                }
                {
                    events.length > 0 &&
                    <Events 
                        events={events}
                    />
                }
                <Button title={'Create'} onPress={() => this.props.navigation.navigate("CreateEvent")}/>
            </Container>
        )
    }
}

const Text = styled.Text`
    font-size: 16px;
`

const mapStateToProps = state => ({
    events: state.my_events
})

const mapDispatchToProps = dispatch => ({
    getMyEvents: () => dispatch(createGetMyEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents)


