import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminStudioSetting from './presenter';

const opacityList = [0.8, 0.6, 0.4, 0.2]

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        profile: PropTypes.object,
        photographer: PropTypes.object,
        showMobile: PropTypes.bool.isRequired,
        openMobile: PropTypes.func.isRequired,
        closeMobile: PropTypes.func.isRequired,
        openLocationModal: PropTypes.func.isRequired,
        closeLocationModal: PropTypes.func.isRequired,
        showLocationModal: PropTypes.bool.isRequired,
        geocoding: PropTypes.func.isRequired,
        locationDetail: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            images: [],
            submitImages: [],
            opacityList,
            nickname: "",
            mainLocation: "",
            education: "",
            career: "",
            portfolio: "",
            description: "",
            tempImage: "",
            tempHeight: 0,
            tempWidth: 0,
            profileImage: {},
            submitProfileImage: "",
            tempProfileImage: "",
            tempProfileHeight: 0,
            tempProfileWidth: 0,
            isTruncated: true,
            locations: [],
            options: [],
            locationSearch: "",
            locationSearched: false,
            searchedLocations: [],
            selectedLocation: {}
        }
    }

    componentDidMount = async() => {
        const { isLoggedIn, profile, goHome } = this.props;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                this.setState({
                    loading: false
                })
            }
            else{
                goHome()
            }
        }
        else{
            goHome()
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if((this.state.tempImage !== "") && (this.state.tempHeight > 0) && (this.state.tempWidth > 0)){
            this.setState({
                images: [...this.state.images, {
                    image: this.state.tempImage,
                    width: this.state.tempWidth,
                    height: this.state.tempHeight,
                    new: true
                }],
                tempImage: "",
                tempHeight: 0,
                tempWidth: 0
            })
        }
        if((this.state.tempProfileImage !== "") && (this.state.tempProfileHeight > 0) && (this.state.tempProfileWidth > 0)){
            this.setState({
                profileImage: {
                    image: this.state.tempProfileImage,
                    width: this.state.tempProfileWidth,
                    height: this.state.tempProfileHeight,
                    new: true
                },
                tempProfileImage: "",
                tempProfileHeight: 0,
                tempProfileWidth: 0
            })
        }
    }

    _submit = async(e) => {
        const files = e.target.files;
        var _URL = window.URL || window.webkitURL;
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
            var reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    tempImage: reader.result
                });
            }
            for(var i = 0; i < files.length; i++){
                let file = files[i]
                var img = new Image();
                img.onload = () => {
                    this.setState({
                        tempWidth: img.width,
                        tempHeight: img.height
                    })
                };
                img.src = _URL.createObjectURL(file);
                await reader.readAsDataURL(file)
                this.setState({
                    submitImages: [...this.state.submitImages, file]
                })
            }
        }
    }

    _removeImage = (idx) => {
        const { submitImages, images } = this.state;
        let newImages = []
        let newSubmitImages = []
        images.map((image, index) => {
            if(index === idx){
                return null;
            }
            else{
                newImages.push(images[index])
                newSubmitImages.push(submitImages[index])
            }
        })
        this.setState({
            images: newImages,
            submitImages: newSubmitImages
        })
    }

    _submitProfile = async(e) => {
        const file = e.target.files[0];
        var _URL = window.URL || window.webkitURL;
        let error = false
        if((file.type === 'image/jpg') || (file.type === 'image/jpeg') || (file.type === 'image/png')){
        }
        else{
            error = true
        }
        if(error){
            alert(this.context.t('jpg, jpeg, png 파일만 업로드하실 수 있습니다.'))
        }
        else{
            var reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    tempProfileImage: reader.result
                });
            }
            var img = new Image();
            img.onload = () => {
                this.setState({
                    tempProfileWidth: img.width,
                    tempProfileHeight: img.height
                })
            };
            img.src = _URL.createObjectURL(file);
            await reader.readAsDataURL(file)
            this.setState({
                submitProfileImage: file
            })
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        })
    }

    _doTruncate = () => {
        this.setState({
            isTruncated: true
        })
    }

    _undoTruncate = () => {
        this.setState({
            isTruncated: false
        })
    }

    _searchLocation = async() => {
        const { locationSearch } = this.state;
        const { geocoding, locationDetail } = this.props;
        const q = locationSearch.replace(/ /gi, "+"); 
        const result = await geocoding(q)
        if(result.status === 'OK'){
            let searchedLocations = []
            result.results.map(async(location) => {
                console.log(location.place_id)
                const detail = await locationDetail(location.place_id)
                console.log(detail)
                searchedLocations.push({
                    ...location,
                    detail
                })
            })
            this.setState({
                locationSearched: true,
                searchedLocations: result.results,
                selectedLocation: {}
            })
        }
        else{
            alert(this.context.t("검색결과가 없습니다."))
        }
    }

    _selectLocation = (selectedLocation) => {
        this.setState({
            selectedLocation
        })
    }

    render(){
        return(
            <AdminStudioSetting 
            {...this.props} 
            {...this.state} 
            submit={this._submit}
            removeImage={this._removeImage}
            submitProfile={this._submitProfile}
            handleInputChange={this._handleInputChange}
            doTruncate={this._doTruncate}
            undoTruncate={this._undoTruncate}
            searchLocation={this._searchLocation}
            selectLocation={this._selectLocation}
            />
        )
    }
}

export default Container;