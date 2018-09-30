import React    from 'react'
import styled from 'styled-components'
import Container from 'components/Container'
import Button from 'components/Button'
import { connect } from 'react-redux'

import { createEvent }  from 'actions/events'

class CreateEventScreen extends React.Component {
    static navigationOptions = {
        title: 'Create event'
    }

    state = {
        name: '',
        description: '',
        points: []
    }

    static getDerivedStateFromProps(props) {
        const { navigation } = props
        return {
            name: navigation.getParam("name", ''),
            description: navigation.getParam("description", ''),
            points: navigation.getParam("points", '')
        }
    }

    _renderItem = ({item}) => {
        return ( 
            <Point> 
                <PointName>{ item.name } </PointName>
            </Point>
        )
    }

    _addPoint = () => {
        console.log('add')
        this.props.navigation.navigate('CreatePoint', {
            context: this.state
        })
    }

    _createEvent = () => {
        this.props.createEvent(this.state)
            .then(() => this.props.navigation.replace('Home'))
    }

    render () {
        const { name, description, points } = this.state

        return (
            <Container>
                <Field>
                    <Title>Name</Title>
                    <Input 
                        value={name}
                        underlineColorAndroid={'transparent'}
                        onChangeText={name => this.setState({ name })}
                    />
                </Field>
                <Field>
                    <Title>Description</Title>
                    <InputML
                        value={description} 
                        multiline={true} 
                        underlineColorAndroid={'transparent'}
                        onChangeText={description => this.setState({ description })}
                    />
                </Field>
                <Field>
                    <Title>Points</Title>
                    <FlatList 
                        data={points}
                        renderItem={this._renderItem}
                    />
                    <Button 
                        title={'Add'}
                        style={{
                            width: 80,
                            marginTop: 10,
                            padding: 5
                        }}
                        textStyle={{
                            fontSize: 14
                        }}
                        onPress={this._addPoint}
                    />
                </Field>
                <Button 
                    title={'Save'}
                    onPress={this._createEvent}
                />
            </Container>
        )
    }
}

const FlatList = styled.FlatList`
`

const Field = styled.View`
    display: flex;
    width: 100%;
`

const Title = styled.Text`
    font-size: 18px;
    margin-top: 10px;
    color: ${props => props.theme.colors.title};
`

const Input = styled.TextInput`
    padding: 5px 0;
    border-color: black;
    border-bottom-width: 1px;
`

const InputML = styled.TextInput`
    padding: 5px 0;
    border-bottom-width: 1px;
    border-bottom-color: black;
`

const Point = styled.View`
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.title};
    padding: 10px;
    margin: 10px 0;
    width: 100%;
`

const PointName = styled.Text`
    font-size: 14px;
`

const mapDispatchToProps = dispatch => ({
    createEvent: (event) => dispatch(createEvent(event))
})

export default connect(null, mapDispatchToProps)(CreateEventScreen)