import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminCustomerImage from './presenter';

const opacityList = [1, 0.8, 0.6, 0.4, 0.2]

class Container extends Component{
    static propTypes = {
        getOrderImage: PropTypes.func.isRequired,
        order: PropTypes.object.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        loading: true,
        error: false,
        errorMsg: "",
        images: []
    }

    componentDidMount = async() => {
        const { getOrderImage, order } = this.props;
        const result = await getOrderImage(order.id)
        if(result.status === 'ok'){
            let images = []
            if(result.images.orderimage_set.length > 5){
                images = result.images.orderimage_set.slice(0,5)
            }
            else if(result.images.orderimage_set === 5){
                images = result.images.orderimage_set
            }
            else{
                images = result.images.orderimage_set
                for(var i = images.length + 1; i <= 5; i++){
                    images.push({
                        id: -1,
                        opacity: opacityList[i-1]
                    })
                }
            }
            this.setState({
                loading: false,
                error: false,
                errorMsg: "",
                images
            })
        }
        else if(result.error){
            this.setState({
                loading: false,
                error: true,
                errorMsg: result.error
            })
        }
        else{
            this.setState({
                loading: false,
                error: true,
                errorMsg: this.context.t("오류가 발생하였습니다.")
            })
        }
    }

    render(){
        return(
            <AdminCustomerImage 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;