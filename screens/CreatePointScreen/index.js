import React    from 'react'
import styled from 'styled-components'
import Container from 'components/Container'
import { MapView, Marker }  from 'expo'
import Button from '../../components/Button';

const center = {
    latitude: 55.75370903771494,
    longitude: 37.61981338262558
}

class CreatePointScreen extends React.Component {
    static navigationOptions = ({
        title: 'Create point'
    })

    state = {
        name: '',
        question: '',
        answer: '',
        coordinate: center
    }

    static getDerivedStateFromProps (props) {
        return {
            context: props.navigation.getParam('context')
        }
    }

    render() {
        const { name, question, answer, coordinate } = this.state

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
                    <Title>Question</Title>
                    <InputML
                        value={question} 
                        multiline={true} 
                        underlineColorAndroid={'transparent'}
                        onChangeText={question => this.setState({ question })}
                    />
                </Field>
                <Field>
                    <Title>Answer</Title>
                    <Input 
                        value={answer}
                        underlineColorAndroid={'transparent'}
                        onChangeText={answer => this.setState({ answer })}
                    />
                </Field>
                <Map
                    initialRegion={{
                        ...center,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker 
                        draggable={true}
                        pinColor={'#FF7F50'}
                        coordinate={coordinate}
                        onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
                    />
                </Map>
                <Button 
                    title={'Save'}
                    style={{
                        marginTop: 20,
                    }}
                    onPress={() => {
                        const { name, question, answer, coordinate, context } = this.state
                        this.props.navigation.replace('CreateEvent', {
                            ...context,
                            points: [...context.points, {
                                key: context.points.length + 1 + '',
                                name, 
                                question,
                                answer,
                                coordinate,
                                token: new Date().getTime().toString()
                            }]
                        })
                    }}
                />
            </Container>
        )
    }
}


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

const Map = styled(MapView)`
    width: 100%;
    flex: 1;
    margin: 10px 0;
`

const Image = styled.Image`
    width: 30px;
    height: 40px;
`

export default CreatePointScreen