import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Platform,
  Dimensions
} from 'react-native'
import styled from 'styled-components'


const window = Dimensions.get('window');

class Row extends Component {

    constructor(props) {
      super(props);
  
      this._active = new Animated.Value(0);
  
      this._style = {
        ...Platform.select({
          ios: {
            transform: [{
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            }],
            shadowRadius: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 10],
            }),
          },
  
          android: {
            transform: [{
              scale: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            }],
            elevation: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [2, 6],
            }),
          },
        })
      };
    }
  
    componentWillReceiveProps(nextProps) {
      if (this.props.active !== nextProps.active) {
        Animated.timing(this._active, {
          duration: 300,
          easing: Easing.bounce,
          toValue: Number(nextProps.active),
        }).start();
      }
    }
  
    render() {
     const {data, active} = this.props;
  
      return (
        <Animated.View style={[
          styles.row,
          this._style,
        ]}>
          <Text style={styles.text}>{data.text}</Text>
        </Animated.View>
      );
    }
  }
  
  const styles = StyleSheet.create({  
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      flex: 1,
      marginTop: 7,
      marginBottom: 12,
      borderRadius: 10,
  
  
      ...Platform.select({
        ios: {
          width: window.width - 20 * 2,
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowOpacity: 1,
          shadowOffset: {height: 2, width: 2},
          shadowRadius: 2,
        },
  
        android: {
          width: window.width - 20 * 2,
          elevation: 0,
        },
      })
    },
   
    text: {
      fontSize: 16,
      color: '#222222',
    },
  });

  export default Row