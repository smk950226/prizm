import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './redux/configureStore';
import AppContainer from './components/AppContainer';
// import SplashScreen from 'react-native-splash-screen'

const { persistor, store } = configureStore();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class App extends React.Component {
  // componentDidMount = async() => {
  //   await sleep(2000)
  //   SplashScreen.hide()
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;