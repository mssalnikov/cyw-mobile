import React    from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components'
import SortableList from 'react-native-sortable-list'
import Row from './Row'

const data = {
    0: { text: 'Who killed Lincoln?' },
    1: { text: 'How much meters are there in one km?' },
    2: { text: 'Number of days Jesus was dead' },
    3: { text: 'The best pub on the block' },
}

class CreateEventScreen extends React.Component {
    static navigationOptions = {
        title: 'Create event'
    }

    _renderRow = ({data, active}) => {
        return <Row data={data} active={active} />
    }

    render () {
        return (
            <Container>
                <Field>
                    <Title>Name</Title>
                    <Input 
                        value={'Bachelor party quest'}
                        underlineColorAndroid={'transparent'}
                    />
                </Field>
                <Field>
                    <Title>Description</Title>
                    <InputML
                        value={"Who's up for an epic send off for our brother?\nCocktails wait for you at each point, just get the riddle right!"} 
                        multiline={true} 
                        underlineColorAndroid={'transparent'}
                    />
                </Field>
                <Field>
                    <Title>Points</Title>
                    <SortableList data={data} renderRow={this._renderRow}/>
                </Field>
                <Button>
                    <ButtonText>Save</ButtonText>
                </Button>
            </Container>
        )
    }
}

const Container = styled.View`
    display: flex;
    padding: 20px;
    align-items: center;
    height: 100%;
`

const Field = styled.View`
    display: flex;
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

const Title = styled.Text`
    font-size: 18px;
    margin-top: 10px;
    color: ${props => props.theme.colors.title};
`

const Input = styled.TextInput`
    padding: 5px 0;
    border-color: black;
    border-bottom-width: 1px;

    &:focus {
        border-color: ${props => props.theme.colors.title};
    }
`

const InputML = styled.TextInput`
    padding: 5px 0;
    border-bottom-width: 1px;
    border-bottom-color: black;

    &:focus {
        border-bottom-color: ${props => props.theme.colors.title};
    }
`

export default CreateEventScreen