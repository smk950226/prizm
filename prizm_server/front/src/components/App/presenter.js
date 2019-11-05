import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import styles from '../../style/styles.module.scss';

const App = (props) => {
    return(
        <div className={`${styles.widthFull} ${styles.heightFull}`}>
            <GeneralRouteContainer />
        </div>
    )
}

export default App; 

App.propTypes = {

}

class GeneralRouteContainer extends Component{
    static propTypes = {
        
    }

    state = {
        
    }

    render(){
        return(
            <GeneralRoute />
        )
    }
}

class LoggedOutRouteContainer extends Component{
    static propTypes = {

    }

    state = {
        
    }

    render(){
        return(
            <LoggedOutRoute />
        )
    }
}

const GeneralRoute = props => (
    <Switch>
        <Route exact path='/' component={Home} key={1} />
    </Switch>
)

const LoggedOutRoute = props => (
    <Switch>
        <Route exact path='/' component={Home} key={1} />
    </Switch>
)