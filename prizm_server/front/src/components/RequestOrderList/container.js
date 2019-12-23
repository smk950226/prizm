import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequestOrderList from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getRequestOrderList: PropTypes.func.isRequired,
        getRequestOrderListMore: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            requestId: props.location.state ? props.location.state.requestId ? props.location.state.requestId : null : null,
            orders: [],
            page: 1,
            hasNextPage: true,
            isLoadingMore: false
        }
    }

    componentDidMount = async() => {
        const { getRequestOrderList, profile, goHome } = this.props;
        const { requestId } = this.state;
        if(profile && requestId){
            const result = await getRequestOrderList(requestId)
            if(result.status === 'ok'){
                this.setState({
                    loading: false,
                    orders: result.orders
                })
            }
            else if(result.error){
                this.setState({
                    loading: false
                })
                alert(result.error)
                goHome()
            }
            else{
                this.setState({
                    loading: false
                })
                alert(this.context.t("An error has ocurred.."))
                goHome()
            }
        }
        else{   
            goHome()
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.profile && !this.props.profile){
            this.props.goHome()
        }
    }

    _orderListMore = async() => {
        const { page, isLoadingMore, hasNextPage, requestId } = this.state;
        const { getRequestOrderListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getRequestOrderListMore(requestId, page+1)
                if(result.status === 'ok'){
                    this.setState({
                        page: page+1,
                        orders: [...this.state.orders, ...result.orders]
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
                else{
                    this.setState({
                        hasNextPage: false
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
            }
        }
    }

    _refresh = async(obj) => {
        const { getRequestOrderList, profile, goHome } = this.props;
        const { requestId } = this.state;
        if(profile && requestId){
            let newOrderList = []
            this.state.ordres.map(order => {
                if(order.id === obj.id){
                    newOrderList.push(obj)
                    return null
                }
                else{
                    newOrderList.push(order)
                }
                this.setState({
                    ordres: newOrderList,
                    loading: false
                })
            })
        }
        else{
            goHome()
        }
    }

    render(){
        return (
            <RequestOrderList 
            {...this.props} 
            {...this.state}
            orderListMore={this._orderListMore}
            refresh={this._refresh}
            />
        )
    }
}

export default Container; 