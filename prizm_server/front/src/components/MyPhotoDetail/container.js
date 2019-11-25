import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MyPhotoDetail from './presenter';

class Container extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        getOrderPhotoList: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            order: props.location.state ? props.location.state.order ? props.location.state.order : null : null,
            loading: true,
            error: false,
            errorMsg: "",
            images: [],
            photoIndex: 0,
            isOpen: false
        }
    }

    componentDidMount = async() => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
        else{
            const { getOrderPhotoList, match : { params : { orderId } } } = this.props;
            const result = await getOrderPhotoList(orderId)
            if(result.status === 'ok'){
                console.log(result.images.orderimage_set)
                this.setState({
                    loading: false,
                    error: false,
                    errorMsg: "",
                    images: result.images.orderimage_set
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
    }

    _openPortfolio = (photoIndex) => {
        this.setState({
            photoIndex,
            isOpen: true
        })
    }

    _closePortfolio = () => {
        this.setState({
            photoIndex: 0,
            isOpen: false
        })
    }

    _goPrev = () => {
        this.setState({
            photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length,
        })
    }

    _goNext = () => {
        this.setState({
            photoIndex: (this.state.photoIndex + 1) % this.state.images.length,
        })
    }

    render(){
        console.log(this.state.images)
        return(
            <MyPhotoDetail 
            {...this.props} 
            {...this.state} 
            openPortfolio={this._openPortfolio}
            closePortfolio={this._closePortfolio}
            goPrev={this._goPrev}
            goNext={this._goNext}
            />
        )
    }
}

export default Container;