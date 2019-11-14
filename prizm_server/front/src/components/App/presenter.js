import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Welcome from '../Welcome';
import Navigation from '../Navigation';
import BottomNavigation from '../BottomNavigation';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import MySchedule from '../MySchedule';
import MyScheduleDetail from '../MyScheduleDetail';
import PhotographerDetail from '../PhotographerDetail';
import ProfileMenu from '../ProfileMenu';
import Profile from '../Profile';
import ProfilePassword from '../ProfilePassword';

import AdminHome from '../AdminHome';
import AdminNavigation from '../AdminNavigation';
import AdminSignUp from '../AdminSignUp';
import AdminSignIn from '../AdminSignIn';
import AdminOrderList from '../AdminOrderList';

import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';

const App = (props) => {
    if(props.admin){
        return(
            <AdminRouteContainer initAdmin={props.initAdmin} profile={props.profile} isLoggedIn={props.isLoggedIn} />
        )
    }
    else{
        return(
            <GeneralRouteContainer initApp={props.initApp} profile={props.profile} isLoggedIn={props.isLoggedIn} showBtmNav={props.showBtmNav} notification={props.notification} orderList={props.orderList} />
        )
    }
}

export default App; 

App.propTypes = {
    showBtmNav: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired,
    profile: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired,
    notification: PropTypes.array,
    orderList: PropTypes.array,
    admin: PropTypes.bool.isRequired,
    initAdmin: PropTypes.func.isRequired
}

class GeneralRouteContainer extends Component{
    static propTypes = {
        initApp: PropTypes.func.isRequired,
        profile: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        showBtmNav: PropTypes.bool.isRequired,
        notification: PropTypes.array,
        orderList: PropTypes.array
    }

    state = {
        loading: true,
        fetchedProfile: false,
        fetchedNotification: false,
        fetchedOrderList: false,
        fetchClear: false
    }

    componentDidMount = async() => {
        const { isLoggedIn, initApp, profile } = this.props;
        if(isLoggedIn){
            await initApp()
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile, fetchedNotification, fetchedOrderList } = prevState;
        if((!fetchedProfile) || (!fetchedNotification || (!fetchedOrderList))){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }
            if(nextProps.notification){
                update.fetchedNotification = true
            }
            if(nextProps.orderList){
                update.fetchedOrderList = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && this.state.fetchedNotification && this.state.fetchedOrderList && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    render(){
        const { loading } = this.state;
        const { showBtmNav } = this.props;
        if(loading){
            return(
                <div className={`${styles.widthFull} ${styles.heightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            )
        }
        else{
            return(
                <div className={`${styles.widthFull} ${styles.minHeightFull}`}>
                    <Navigation />
                    <GeneralRoute />
                    <BottomNavigation showBtmNav={showBtmNav} />
                </div>
            )
        }
    }
}

class AdminRouteContainer extends Component{
    static propTypes = {
        initAdmin :PropTypes.func.isRequired,
        profile: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired
    }

    state = {
        loading: true,
        fetchedProfile: false,
        fetchClear: false
    }

    componentDidMount = async() => {
        const { isLoggedIn, initAdmin } = this.props;
        if(isLoggedIn){
            await initAdmin()
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <div className={`${styles.widthFull} ${styles.heightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            )
        }
        else{
            return(
                <div className={`${styles.widthFull} ${styles.minHeightFull}`}>
                    <AdminNavigation />
                    <AdminRoute />
                </div>
            )
        }
    }
}

const GeneralRoute = props => (
    <Switch>
        <Route exact path='/' component={Home} key={1} />
        <Route exact path='/welcome/' component={Welcome} key={2} />
        <Route exact path='/signup/' component={SignUp} key={3} />
        <Route exact path='/signin/' component={SignIn} key={4} />
        <Route exact path='/my/schedule/' component={MySchedule} key={6} />
        <Route exact path='/my/schedule/:orderId' component={MyScheduleDetail} key={7} />
        <Route exact path='/menu/profile/' component={ProfileMenu} key={8} />
        <Route exact path='/profile/' component={Profile} key={9} />
        <Route exact path='/profile/password/' component={ProfilePassword} key={10} />
        <Route exact path='/:photographerId/' component={PhotographerDetail} key={100} />
    </Switch>
)

const AdminRoute = props => (
    <Switch>
        <Route exact path='/' component={AdminHome} key={1} />
        <Route exact path='/signup/' component={AdminSignUp} key={2} />
        <Route exact path='/signin/' component={AdminSignIn} key={3} />
        <Route exact path='/reservation/' component={AdminOrderList} key={4} />
    </Switch>
)