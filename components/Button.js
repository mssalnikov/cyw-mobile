import React    from 'react'
import styled   from 'styled-components/native'

export default Button = ({ title, onPress, style, textStyle }) => (
    <ButtonContainer onPress={onPress} style={style}>
        <ButtonText style={textStyle}>{ title }</ButtonText>
    </ButtonContainer>
)


const ButtonContainer = styled.TouchableOpacity`
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