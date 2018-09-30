import React    from 'react'
import styled    from 'styled-components'
import { connect }  from 'react-redux'

import Container from 'components/Container'
import Button from 'components/Button'
import { createGetEvent } from 'actions/events'

import { url }  from 'config'
import { createHeaders } from 'utils'
import { AsyncStorage } from 'react-native'

import Question from './components/Question'
import QRCode from './components/QRCode'


class EventScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('event').name
    })

    state = {
        pending: true,
        step: -1,
    }

    static getDerivedStateFromProps(props) {
        console.log('pev', props.event)
        if (props.event.success) {
            const points = props.event.points
            const step = points.reduce((acc, el, i) => el.is_found ? i + 1: acc , -1)
            return { pending: false, event: props.event }
        } else {
            return { pending: true }
        }
    }

    componentDidMount() {
        this.props.getEvent(this.props.navigation.getParam('event').id)
    }

    render() {
        if (this.state.pending) return <Container></Container>

        const { name, description, id } = this.props.navigation.state.params.event
        const { points } = this.state.event.points
        const { step, stage } = this.state

        if (step < 0)
            return (
                <Container>
                    <Title>{name}</Title>
                    <Description>
                        { description }
                    </Description>
                    <Button title={'Join'} onPress={async () => {
                        // await fetch()
                        this.setState({ point: 0 })
                    }}/>
                </Container>
            )
        else if (step >= points.length ) {
            return (
                <Container>
                    <Title>You've completed the event</Title>
                </Container>
            )
        }
        else {
            const point = points[step]
            if (!point.is_solved) {
                return <Question
                    id={point.id}
                    question={point.question}  
                    onSuccess={this._questionSuccess}
                />
            } else {
                return <QRCode 
                    id={point.id}
                    onSuccess={this._qrSuccess}
                />
            }
        }
    }

    _questionSuccess = async (id) => {
        const res = await fetch(`${url}/point?id=${id}`, { headers: createHeaders(await AsyncStorage.getItem('token')) })
        const json = res.json()
        this.setState(prev => ({
            event: {
                ...prev.event,
                points: prev.event.points.map(el => {
                    if (el.id == id)
                        return json.data
                    return el
                })
            }
        }))
    }

    _qrSuccess = () => {
        this.setState(prev => {
            const step = prev.step++
            // if (step >= prev.event.points.length) {
            //     this.setState({ finish: true })
            //     return
            // }
            this.setState({ step: step })
        })
    }
}

const Title = styled.Text`
    color: ${props => props.theme.colors.title};
    font-size: 18px;
    width: 100%;
`

const Description = styled.Text`
    font-size: 14px;
    margin: 10px 0;
    width: 100%;
`

const mapStateToProps = state => ({
    event: state.event
})

const mapDispatchToProps = dispatch => ({
    getEvent: id => dispatch(createGetEvent(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)