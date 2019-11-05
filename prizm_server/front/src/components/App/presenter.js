import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import Welcome from '../Welcome';
import Navigation from '../Navigation';
import BottomNavigation from '../BottomNavigation';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import styles from '../../style/styles.module.scss';

const App = (props) => {
    return(
        <div className={`${styles.widthFull} ${styles.minHeightFull}`}>
            <Navigation />
            <GeneralRouteContainer />
            <BottomNavigation showBtmNav={props.showBtmNav} />
        </div>
    )
}

export default App; 

App.propTypes = {
    showBtmNav: PropTypes.bool.isRequired
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
        <Route exact path='/welcome/' component={Welcome} key={2} />
        <Route exact path='/signup/' component={SignUp} key={3} />
        <Route exact path='/signin/' component={SignIn} key={4} />
    </Switch>
)

const LoggedOutRoute = props => (
    <Switch>
        <Route exact path='/' component={Home} key={1} />
        <Route exact path='/welcome/' component={Welcome} key={2} />
    </Switch>
)