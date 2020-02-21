import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import ReservationDetailScreen from './presenter';

const { width, height } = Dimensions.get('window');

class Container extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        getOrderDetail: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const orderId = props.navigation.getParam('orderId', null)
        const order = props.navigation.getParam('order', null)
        this.state = {
            loading: true,
            orderId,
            order,
            mapReady: false,
            region: {
                latitude: order ? order.location.lat : 37.579617,
                longitude: order ? order.location.lng : 126.977041,
                latitudeDelta: 0.01,
                longitudeDelta: height*0.01/width,
            }
        }
    }

    componentDidMount = async() => {
        const { isLoggedIn, getOrderDetail } = this.props;
        const { order, orderId } = this.state;
        if(!isLoggedIn){
            this.props.navigation.navigate('Home')
        }
        else{
            if(order){
                this.setState({
                    loading: false
                })
            }
            else{
                const order = await getOrderDetail(orderId)
                if(!order){
                    Alert.alert(null, 
                        this.context.t("Invalid request!"),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                loading: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                    this.props.navigation.navigate('Home')
                }
                else{
                    this.setState({
                        order,
                        loading: false
                    })
                }
            }
        }
    }

    _mapRender = () => {
        if(this.state.order){
            const { order } = this.state;
            this.setState({
                region: {
                    latitude: order.location.lat,
                    longitude: order.location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: height*0.01/width,
                },
                mapReady: true
            })
        }
    }

    render(){
        return(
            <ReservationDetailScreen 
            {...this.props} 
            {...this.state} 
            mapRender={this._mapRender}
            />
        )
    }
}

export default Container;