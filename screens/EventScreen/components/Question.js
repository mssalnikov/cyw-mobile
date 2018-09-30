import React    from 'react'
import Container from 'components/Container'
import Button from 'components/Button'

import styled from 'styled-components'
import { url }  from 'config'
import { createHeaders }    from 'utils'
import { AsyncStorage } from 'react-native'

class Question extends React.Component {
    static navigationOptions = {
        title: 'Question'
    }

    state = {
        answer: ''
    }

    render() {
        return (
            <Container>
                <Q>
                    {this.props.question}
                </Q>
                <Wrapper>
                    <Answer>
                        Answer
                    </Answer>
                    <Input onTextChange={answer => this.setState({ answer })} value={this.state.answer}/>
                </Wrapper>
                <Button
                    title={"Submit"}
                    onPress={this._onAnswer}
                />
            </Container>
        )
    }

    _onAnswer = async () => {
        const res = await fetch(`${url}/answer_question`, {
            method: 'POST',
            headers: createHeaders(await AsyncStorage.getItem('token')),
            body: JSON.stringify({
                pointId: this.props.id,
                answer: this.state.answer
            })
        })
        const json = await res.json()
        
    }
}


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

const Input = styled.TextInput`
    padding: 5px 0;
    border-color: black;
    border-bottom-width: 1px;
`

export default Question