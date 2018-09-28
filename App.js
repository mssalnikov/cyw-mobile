import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { AppLoading } from 'expo'
import { AppNavigator } from './navigation/AppNavigator'

import styled, { ThemeProvider }  from 'styled-components'
import { Provider } from 'react-redux'

import theme from './theme'
import { store } from './state/store'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Container>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </Container>
          </ThemeProvider>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return new Promise(r => r())
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const Container = styled.View`
  flex: 1;
  background: white;
`
