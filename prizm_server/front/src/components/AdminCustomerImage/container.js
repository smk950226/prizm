import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminCustomerImage from './presenter';

const opacityList = [1, 0.8, 0.6, 0.4, 0.2]

class Container extends Component{
    static propTypes = {
        getOrderImage: PropTypes.func.isRequired,
        order: PropTypes.object.isRequired,
        uploadOrderImage: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        loading: true,
        error: false,
        errorMsg: "",
        images: [],
        isSubmitting: false
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
            alert(this.context.t('jpg, jpeg, png 파일만 업로드하실 수 있습니다.'))
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
                            errorMsg: this.context.t("오류가 발생하였습니다."),
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
                    alert(this.context.t("오류가 발생하였습니다."))
                }
            }
        }
        // if(file){
        //     if((file.type !== "video/avi") && (file.type !== "video/mpg") && (file.type !== "video/mpeg") && (file.type !== "video/mpe") && (file.type !== "video/wmv") && (file.type !== "video/flv") && (file.type !== "video/mov") && (file.type !== "video/mp4")){
        //         alert('AVI, MPG, MPEG, MPE, WMV, FLV, MOV, MP4 파일만 사용하실 수 있습니다.')
        //     }
        //     else{
        //         this.setState({
        //             introVideo: file
        //         })
        //     }
        // }
        // const { isSubmittingIntro } = this.state;
        // const { createCenterIntro, getCenterIntro } = this.props;
        // if(!isSubmittingIntro){
        //     this.setState({
        //         isSubmittingIntro: true
        //     })
        //     const result = await createCenterIntro(file);
        //     if(result.status === 'ok'){
        //         const centerIntro = await getCenterIntro();
        //         this.setState({
        //             introVideo: "",
        //             centerIntro,
        //             loading: false,
        //             isSubmittingIntro: false,
        //             showCreate: false,
        //             video: ""
        //         })
        //         alert("센터 소개를 추가하였습니다.")
        //     }
        //     else if(result.error){
        //         this.setState({
        //             isSubmittingIntro: false,
        //             introVideo: ""
        //         })
        //         alert(result.error)
        //     }
        //     else{
        //         this.setState({
        //             isSubmittingIntro: false,
        //             introVideo: ""
        //         })
        //         alert("오류가 발생하였습니다.")
        //     }
        // }
    }

    render(){
        return(
            <AdminCustomerImage 
            {...this.props}
            {...this.state}
            submit={this._submit}
            />
        )
    }
}

export default Container;