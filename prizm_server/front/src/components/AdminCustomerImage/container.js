import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminCustomerImage from './presenter';

const opacityList = [1, 0.8, 0.6, 0.4, 0.2]

class Container extends Component{
    static propTypes = {
        getOrderImage: PropTypes.func.isRequired,
        order: PropTypes.object.isRequired,
        uploadOrderImage: PropTypes.func.isRequired,
        orderComplete: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        loading: true,
        error: false,
        errorMsg: "",
        images: [],
        isSubmitting: false,
        showCancel: false
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
                errorMsg: this.context.t("An error has occurred..")
            })
        }
    }

    _submit = async(e) => {
        const files = e.target.files;
        let error = false
        for(var i = 0; i < files.length; i++){
            if((files[i].type === 'image/jpg') || (files[i].type === 'image/jpeg') || (files[i].type === 'image/png')){
            }
            else{
                error = true
            }
        }
        if(error){
            alert(this.context.t('File formates are limited to jpg, jpeg, and png.'))
        }
        else{
            const { isSubmitting } = this.state;
            const { uploadOrderImage, order, getOrderImage } = this.props;
            if(!isSubmitting){
                this.setState({
                    isSubmitting: true
                })
                const result = await uploadOrderImage(files, order.id);
                if(result.status === 'ok'){
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
                            error: false,
                            errorMsg: "",
                            images,
                            isSubmitting: false
                        })
                    }
                    else if(result.error){
                        this.setState({
                            error: true,
                            errorMsg: result.error,
                            isSubmitting: false
                        })
                    }
                    else{
                        this.setState({
                            error: true,
                            errorMsg: this.context.t("An error has occurred.."),
                            isSubmitting: false
                        })
                    }
                }
                else if(result.error){
                    this.setState({
                        isSubmitting: false
                    })
                    alert(result.error)
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                    alert(this.context.t("An error has occurred.."))
                }
            }
        }
    }

    _openCancel = () => {
        this.setState({
            showCancel: true
        })
    }

    _closeCancel = () => {
        this.setState({
            showCancel: false,
        })
    }

    _complete = async() => {
        const { order, orderComplete, refresh } = this.props;
        const { isSubmitting } = this.state;
        if(!isSubmitting){
            this.setState({
                isSubmitting: true
            })
            const result = await orderComplete(order.id)
            if(result.status === 'ok'){
                await refresh()
                this.setState({
                    isSubmitting: false,
                    showCancel: false
                })
            }
            else if(result.error){
                this.setState({
                    isSubmitting: false
                })
                alert(result.error)
            }
            else{
                this.setState({
                    isSubmitting: false
                })
                alert(this.context.t("An error has occurred.."))
            }
        }
    }

    render(){
        return(
            <AdminCustomerImage 
            {...this.props}
            {...this.state}
            submit={this._submit}
            openCancel={this._openCancel}
            closeCancel={this._closeCancel}
            complete={this._complete}
            />
        )
    }
}

export default Container;