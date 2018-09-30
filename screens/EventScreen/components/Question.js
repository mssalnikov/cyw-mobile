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
                    <Input 
                        onChangeText={answer => this.setState({ answer })} 
                        underlineColorAndroid={'transparent'}
                        value={this.state.answer}
                    />
                </Wrapper>
                <Button
                    title={"Submit"}
                    onPress={this._onAnswer}
                />
            </Container>
        )
    }

    _onAnswer = async () => {
        console.log({
            point_id: this.props.id,
            answer: this.state.answer
        })
        const res = await fetch(`${url}/answer_question`, {
            method: 'POST',
            headers: createHeaders(await AsyncStorage.getItem('token')),
            body: JSON.stringify({
                point_id: this.props.id,
                answer: this.state.answer
            })
        })
        console.log(res.status)
        if (res.status == 200) {
            this.props.onSuccess(this.props.id)
        }
        
    }
}


const Wrapper = styled.View`
    width: 100%;
`

const Q = styled.Text`
    font-size: 16px;
    width: 100%;
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