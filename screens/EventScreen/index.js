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
        // console.log(props.event)
        if (props.event.success) {
            const points = props.event.data.points || []
            const step = points.reduce((acc, el, i) => el.is_found ? i + 1: acc , -1)
            return { pending: false, event: props.event, step: step }
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
        const { points } = this.state.event.data
        const { step} = this.state

        console.log('t', step)

        if (step < 0)
            return (
                <Container>
                    <Title>{name}</Title>
                    <Description>
                        { description }
                    </Description>
                    <Button title={'Join'} onPress={this._joinEvent}/>
                </Container>
            )
        else if (step >= points.length ) {
            return (
                <Container>
                    <Title>You've completed the event!</Title>
                </Container>
            )
        }
        else {
            // console.log('ste', step, points)
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
                    url={`https://staging.naviaddress.com/${point.container}/${point.naviaddress}`}
                    onSuccess={this._qrSuccess}
                />
            }
        }
    }

    _joinEvent = async () => {
        // console.log('s', this.state.event.data, 'p', this.props.event.data)
        await fetch(`${url}/join_event?id=${this.state.event.data.id}`, { method: 'POST', headers: createHeaders(await AsyncStorage.getItem('token')) })
        await this.props.getEvent(this.state.event.data.id)
        this.setState({ step: 0 })
    }

    _questionSuccess = async (id) => {
        const res = await fetch(`${url}/point?id=${id}`, { headers: createHeaders(await AsyncStorage.getItem('token')) })
        const json = await res.json() 
        console.log('j', json, this.state.event)
        this.setState(prev => ({
            event: {
                ...prev.event,
                data: {
                    ...prev.event.data,
                    points: prev.event.data.points.map(el => {
                        if (el.id == id)
                            return json.data
                        return el
                    })
                }
            }
        }))
    }

    _qrSuccess = () => {
        console.log('success qr')
        this.setState(prev => {
            const step = prev.step + 1
            // if (step >= prev.event.points.length) {
            //     this.setState({ finish: true })
            //     return
            // }
           return { step: step }
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