import React    from 'react'
import { Text, View } from 'react-native'

import styled from 'styled-components'

class QuestionScreen extends React.Component {
    static navigationOptions = {
        title: 'Question'
    }

    render() {
        return (
            <Container>
                <Q>
                The blood groups of 200 people is distributed as follows: 50 have type A blood, 65 have B blood type, 70 have O blood type and 15 have type AB blood. If a person from this group is selected at random, what is the probability that this person has O blood type? 
                </Q>
                <Wrapper>
                    <Answer>
                        Answer
                    </Answer>
                    <Input />
                </Wrapper>
                <Button>
                    <ButtonText>Submit</ButtonText>
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

const Wrapper = styled.View`
    width: 100%;
`

const Q = styled.Text`
    font-size: 16px;
`

const Answer = styled.Text`
    font-size: 18px;
    margin-top: 10px;
    color: ${props => props.theme.colors.title};
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

const Input = styled.TextInput`
    padding: 5px 0;
    border-color: black;
    border-bottom-width: 1px;

    &:focus {
        border-color: ${props => props.theme.colors.title};
    }
`

export default QuestionScreen