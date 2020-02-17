import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminStudioSetting from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const opacityList = [0.8, 0.6, 0.4, 0.2]

const ampm = [
    'AM',
    'PM'
]

const hourList = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
]

const minList = [
    '00',
    '30'
]

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
        locationDetail: PropTypes.func.isRequired,
        openOptionModal: PropTypes.func.isRequired,
        closeOptionModal: PropTypes.func.isRequired,
        showOptionModal: PropTypes.bool.isRequired,
        updateStudio: PropTypes.func.isRequired,
        getPhotographer: PropTypes.func.isRequired,
        goClear: PropTypes.func.isRequired,
        displayBtmNav: PropTypes.func.isRequired,
        hideBtmNav: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const { photographer } = props;
        let submitImages = []
        let images = []
        if(photographer){
            if(photographer.nickname){
                photographer.portfolio_set.map((image, index) => {
                    submitImages.push({
                        idx: index,
                        image: image
                    })
                    images.push({
                        idx: index,
                        image: image
                    })
                })
            }
        }
        this.state = {
            update: photographer ? photographer.nickname ? true : false : false,
            images: photographer ? photographer.nickname ? images : [] : [],
            submitImages: photographer ? photographer.nickname ? submitImages : [] : [],
            opacityList,
            nickname: photographer ? photographer.nickname ? photographer.nickname : "" : "",
            mainLocation: photographer ? photographer.nickname ? photographer.main_location : "" : "",
            equipment: photographer ? photographer.nickname ? photographer.equipment : "" : "",
            career: photographer ? photographer.nickname ? photographer.career : "" : "",
            portfolio: photographer ? photographer.nickname ? photographer.portfolio_url : "" : "",
            portfolioForm: photographer ? photographer.nickname ? true : false : false,
            description: photographer ? photographer.nickname ? photographer.description : "" : "",
            tempImage: "",
            tempHeight: 0,
            tempWidth: 0,
            profileImage: photographer ? photographer.nickname ? photographer.profile_image : "" : "",
            submitProfileImage: photographer ? photographer.nickname ? photographer.profile_image : "" : "",
            tempProfileImage: "",
            tempProfileHeight: 0,
            tempProfileWidth: 0,
            isTruncated: true,
            locations: photographer ? photographer.nickname ? photographer.location_set : [] : [],
            options: photographer ? photographer.nickname ? photographer.option_set : [] : [],
            locationSearch: "",
            locationSearched: false,
            searchedLocations: [],
            selectedLocation: {},
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            showCalendar1: false,
            showCalendar2: false,
            customerSelectedLocation: {},
            optionTitle: "",
            optionType: "",
            optionDescription: "",
            optionPerson: "",
            optionHour: "",
            optionPrice: "",
            showOptionPlus: false,
            dateConfirm: false,
            selectDateStep: 1,
            selectedHour: "02",
            selectedMin: "00",
            selectedAmPm: "PM",
            dateOption: 0,
            selectedDate: "",
            selectedStartDate: "",
            selectedEndDate: "",
            dateRange: [],
            customerSelectedOption: {},
            comment: "",
            studioId: photographer ? photographer.nickname ? photographer.studio_id : "" : "",
            studioId2: photographer ? photographer.nickname ? photographer.studio_id : "" : "",
            studioIdConfirm: photographer ? photographer.nickname ? true : false : false,
            isSubmitting: false,
            valueGroups: {
                ampm: 'PM',
                hour: '02',
                min: '00'
            }, 
            optionGroups: {
                ampm: ampm,
                hour: hourList,
                min: minList
            },
            loop: true
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
                    idx: this.state.images.length,
                    image: {
                        image: this.state.tempImage,
                        width: this.state.tempWidth,
                        height: this.state.tempHeight,
                        new: true
                    }
                }],
                tempImage: "",
                tempHeight: 0,
                tempWidth: 0,
                loop: false
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
        if(prevProps.photographer !== this.props.photographer){
            if(this.state.update){
                this.setState({
                    isSubmitting: false
                })
                alert(this.context.t("Your studio information has been changed successfully."))
            }
            else{
                this.setState({
                    isSubmitting: false
                })
                let replacedStudioId = ""
                const { studioId } = this.state;
                if(studioId.startsWith('prizm.cloud/')){
                    replacedStudioId = studioId.slice(12)
                }
                else{
                    replacedStudioId = studioId
                }
                this.props.goClear(replacedStudioId)
            }
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
            alert(this.context.t('File formates are limited to jpg, jpeg, and png.'))
        }
        else{
            
            for(var i = 0; i < files.length; i++){
                let file = files[i]
                var img = new Image();
                var reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({
                        tempImage: reader.result
                    });
                }
                img.onload = () => {
                    this.setState({
                        tempWidth: img.width,
                        tempHeight: img.height
                    })
                };
                img.src = await _URL.createObjectURL(file);
                await reader.readAsDataURL(file)
                await this.setState({
                    submitImages: [...this.state.submitImages, {
                        idx: this.state.submitImages.length,
                        image: file
                    }]
                })
                while(true){
                    if(this.state.loop){
                        await sleep(500)
                    }
                    else{
                        this.setState({
                            loop: true
                        })
                        break;
                    }
                }
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
            alert(this.context.t('File formates are limited to jpg, jpeg, and png.'))
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
        if((name === 'optionPerson') || (name === 'optionHour') || (name === 'optionPrice')){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value
                });
            }
        }
        else if(name === 'portfolio'){
            let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
            if(reg.test(value)){
                this.setState({
                    [name]: value,
                    portfolioForm: true
                })
            }
            else{
                this.setState({
                    [name]: value,
                    portfolioForm: false
                })
            }
        }
        else if(name === 'studioId'){
            if(this.state.studioId2){
                if(this.state.studioId2 === value){
                    this.setState({
                        [name]: value,
                        studioIdConfirm: true
                    })
                }
                else{
                    this.setState({
                        [name]: value,
                        studioIdConfirm: false
                    })
                }
            }
            else{
                this.setState({
                    [name]: value,
                    studioIdConfirm: false
                })
            }
        }
        else if(name === 'studioId2'){
            if(this.state.studioId){
                if(this.state.studioId === value){
                    this.setState({
                        [name]: value,
                        studioIdConfirm: true
                    })
                }
                else{
                    this.setState({
                        [name]: value,
                        studioIdConfirm: false
                    })
                }
            }
            else{
                this.setState({
                    [name]: value,
                    studioIdConfirm: false
                })
            }
        }
        else{
            this.setState({
                [name]: value
            })
        }
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

    _searchLocation = async(searchedLocations) => {
        this.setState({
            searchedLocations,
            locationSearched: true,
            selectedLocation: {}
        })
    }

    _selectLocation = (selectedLocation) => {
        const { locations } = this.state;
        const find = locations.find(lo => (lo.lat === selectedLocation.geometry.location.lat()) && lo.lng === selectedLocation.geometry.location.lng())
        if(find){
            let newLocation = []
            locations.map(location => {
                if((location.lat === selectedLocation.geometry.location.lat()) && (location.lng === selectedLocation.geometry.location.lng())){
                    return null
                }
                else{
                    newLocation.push(location)
                    return null
                }
            })
            this.setState({
                locations: newLocation
            })
        }
        else{
            this.setState({
                locations: [...this.state.locations, {
                    id: 0 - this.state.locations.length - 1,
                    name: selectedLocation.name,
                    lat: selectedLocation.geometry.location.lat(),
                    lng: selectedLocation.geometry.location.lng()
                }],
                selectedLocation
            })
        }
    }

    _completeLocationSearch = () => {
        const { closeLocationModal } = this.props;
        this.setState({
            searchedLocations: [],
            locationSearch: "",
            locationSearched: false,
            selectedLocation: {}
        })

        closeLocationModal()
    }

    _removeLocation = (selected) => {
        const { locations } = this.state;
        let newLocation = []
        locations.map(location => {
            if(location.id === selected.id){
                return null
            }
            else{
                newLocation.push(location)
                return null
            }
        })
        this.setState({
            locations: newLocation
        })
    }

    _open1 = () => {
        this.setState({
            show1: true
        })
    }

    _close1 = () => {
        this.setState({
            show1: false
        })
    }

    _open2 = () => {
        this.setState({
            show2: true
        })
    }

    _close2 = () => {
        this.setState({
            show2: false
        })
    }

    _open3 = () => {
        this.setState({
            show3: true
        })
    }

    _close3 = () => {
        this.setState({
            show3: false
        })
    }

    _open4 = () => {
        this.setState({
            show4: true
        })
    }

    _close4 = () => {
        this.setState({
            show4: false
        })
    }

    _openCalendar1 = (selectDateStep) => {
        if(selectDateStep === 1){
            this.setState({
                showCalendar1: true,
                selectDateStep: 1
            })
        }
        else{
            this.setState({
                showCalendar1: true
            })
        }
    }

    _closeCalendar1 = () => {
        this.setState({
            showCalendar1: false
        })
    }

    _openCalendar2 = () => {
        this.setState({
            showCalendar2: true
        })
    }

    _closeCalendar2 = () => {
        this.setState({
            showCalendar2: false
        })
    }

    _selectCustomerLocation = (customerSelectedLocation) => {
        this.setState({
            customerSelectedLocation,
            show2: true
        })
    }

    _blankCustomerLocation = () => {
        this.setState({
            customerSelectedLocation: {}
        })
    }

    _completeAddOption = () => {
        const { closeOptionModal } = this.props;
        const { optionTitle, optionType, optionDescription, optionPerson, optionHour, optionPrice } = this.state;
        if(optionTitle && optionTitle && optionDescription && optionPerson && optionHour && optionPrice){
            this.setState({
                options: [...this.state.options, {
                    id: 0 - this.state.options.length - 1,
                    title: optionTitle,
                    photograpy_type: optionType,
                    description: optionDescription,
                    person: optionPerson,
                    hour: optionHour,
                    price: optionPrice
                }],
                optionTitle: "",
                optionType: "",
                optionDescription: "",
                optionPerson: "",
                optionHour: "",
                optionPrice: ""
            })
    
            closeOptionModal()
        }
        
    }

    _removeOption = (selected) => {
        const { options } = this.state;
        let newOption = []
        options.map(option => {
            if(option.id === selected.id){
                return null
            }
            else{
                newOption.push(option)
                return null
            }
        })
        this.setState({
            options: newOption
        })
    }

    _openOptionPlus = () => {
        this.setState({
            showOptionPlus: true
        })
    }

    _closeOptionPlus = () => {
        this.setState({
            showOptionPlus: false
        })
    }

    _changeDateStep = (selectDateStep) => {
        if(selectDateStep === 2){
            if(this.state.selectedDate){
                this.setState({
                    selectDateStep
                })
            }
            else{
                alert(this.context.t("Please select date."))
            }
        }
        else{
            this.setState({
                selectDateStep
            })
        }
    }

    _handleChangeDateOption = (dateOption) => {
        if(dateOption === 1){
            this.setState({
                dateOption,
                showCalendar1: true,
                showCalendar2: false,
                selectedDate: "",
                dateConfirm: false,
                selectedHour: "02",
                selectedMin: "00",
                selectedAmPm: 'PM',
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: "",
                show3: false,
                valueGroups: {
                    ampm: 'PM',
                    hour: '02',
                    min: '00'
                }, 
                optionGroups: {
                    ampm: ampm,
                    hour: hourList,
                    min: minList
                }
            })
        }
        else{
            this.setState({
                dateOption,
                showCalendar1: false,
                showCalendar2: true,
                selectedDate: "",
                dateConfirm: false,
                selectedHour: "",
                selectedMin: "",
                selectedAmPm: "",
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: "",
                show3: false,
                valueGroups: {
                    ampm: 'PM',
                    hour: '02',
                    min: '00'
                }, 
                optionGroups: {
                    ampm: ampm,
                    hour: hourList,
                    min: minList
                }
            })
        }
    }

    _blankDateOption = () => {
        this.setState({
            dateOption: 0,
            selectedDate: "",
            dateConfirm: false,
            selectedHour: "",
            selectedMin: "",
            selectedAmPm: "",
            selectDateStep: 1,
            selectedStartDate: "",
            selectedEndDate: "",
            show3: false,
            valueGroups: {
                ampm: 'PM',
                hour: '02',
                min: '00'
            }, 
            optionGroups: {
                ampm: ampm,
                hour: hourList,
                min: minList
            }
        })
    }

    _selectDate = (selectedDate) => {
        this.setState({
            selectedDate
        })
    }

    _selectDateRange = (range) => {
        this.setState({
            selectedStartDate: range[0],
            selectedEndDate: range[1],
            dateRange: range
        })
    }

    _confirmDate = () => {
        const { valueGroups : { ampm, hour, min }, dateOption, selectedStartDate, selectedEndDate } = this.state;
        if(dateOption === 1){
            if(ampm && hour && min){
                this.setState({
                    dateConfirm: true,
                    showCalendar1: false,
                    show3: true,
                    selectedAmPm: ampm,
                    selectedHour: hour,
                    selectedMin: min
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                alert(this.context.t("Please select time."))
            }
        }
        else{
            if(selectedStartDate && selectedEndDate){
                this.setState({
                    dateConfirm: true,
                    showCalendar2: false,
                    show3: true
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                alert(this.context.t("Please select your date range."))
            }
        }
    }

    _selectOption = (customerSelectedOption) => {
        this.setState({
            customerSelectedOption,
            show4: true
        })
    }

    _blankOption = () => {
        this.setState({
            customerSelectedOption: {}
        })
    }

    _handleChangeTimes = (name, value) => {
        this.setState(({valueGroups}) => ({
            valueGroups: {
              ...valueGroups,
              [name]: value,
            }
        }));
    };

    _confirm = async() => {
        const { submitImages, nickname, mainLocation, equipment, career, portfolio, description, submitProfileImage, locations, options, studioId, studioId2, studioIdConfirm, portfolioForm, isSubmitting, update } = this.state;
        const { updateStudio, getPhotographer, goClear } = this.props;
        if(!isSubmitting){
            if(submitImages.length > 0){
                if(nickname && mainLocation && career && description && submitProfileImage && studioId && studioId2){
                    if(portfolio){
                        if(portfolioForm){
                            if(locations.length > 0){
                                if(options.length > 0){
                                    if((studioId === studioId2) && studioIdConfirm){
                                        this.setState({
                                            isSubmitting: true
                                        })
                                        let replacedStudioId = ""
                                        if(studioId.startsWith('prizm.cloud/')){
                                            replacedStudioId = studioId.slice(12)
                                        }
                                        else{
                                            replacedStudioId = studioId
                                        }
                                        const result = await updateStudio(submitImages.reverse(), nickname, mainLocation, equipment, career, portfolio, description, submitProfileImage, locations, options, replacedStudioId, update)
                                        if(result.status === 'ok'){
                                            await getPhotographer()
                                            // if(update){
                                            //     this.setState({
                                            //         isSubmitting: false
                                            //     })
                                            //     alert(this.context.t("Your studio information has been changed successfully."))
                                            // }
                                            // else{
                                            //     this.setState({
                                            //         isSubmitting: false
                                            //     })
                                            //     goClear(studioId)
                                            // }
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
                                    else{
                                        alert(this.context.t("Please check the studio URL again."))
                                    }
                                }
                                else{
                                    alert(this.context.t("Please enter at least one service & pricing option."))
                                }
                            }
                            else{
                                alert(this.context.t("Please enter at least one photography location."))
                            }
                        }
                        else{
                            alert(this.context.t("Please enter a valid URL for the portfolio."))
                        }
                    }
                    else{
                        if(locations.length > 0){
                            if(options.length > 0){
                                if((studioId === studioId2) && studioIdConfirm){
                                    this.setState({
                                        isSubmitting: true
                                    })
                                    let replacedStudioId = ""
                                    if(studioId.startsWith('prizm.cloud/')){
                                        replacedStudioId = studioId.slice(12)
                                    }
                                    else{
                                        replacedStudioId = studioId
                                    }
                                    const result = await updateStudio(submitImages.reverse(), nickname, mainLocation, equipment, career, portfolio, description, submitProfileImage, locations, options, replacedStudioId, update)
                                    if(result.status === 'ok'){
                                        await getPhotographer()
                                        // if(update){
                                        //     this.setState({
                                        //         isSubmitting: false
                                        //     })
                                        //     alert(this.context.t("Your studio information has been changed successfully."))
                                        // }
                                        // else{
                                        //     this.setState({
                                        //         isSubmitting: false
                                        //     })
                                        //     goClear(studioId)
                                        // }
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
                                else{
                                    alert(this.context.t("Please check the studio URL again."))
                                }
                            }
                            else{
                                alert(this.context.t("Please enter at least one service & pricing option."))
                            }
                        }
                        else{
                            alert(this.context.t("Please enter at least one photography location."))
                        }
                    }
                }
                else{
                    alert(this.context.t("Please fill in all the information above to create and save this option"))
                }
            }
            else{
                alert(this.context.t("Please upload at least one photograph."))
            }
        }
    }

    _onSort = (sortedList) => {
        let newImages = []
        let newSubmitImages = []
        sortedList.map(image => {
            newImages.push(image.image)
            this.state.submitImages.map((sub) => {
                if(sub.idx === image.image.idx){
                    newSubmitImages.push(sub)
                }
            })
        })
        this.setState({
            images: newImages,
            submitImages: newSubmitImages
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
            completeLocationSearch={this._completeLocationSearch}
            removeLocation={this._removeLocation}
            open1={this._open1}
            close1={this._close1}
            open2={this._open2}
            close2={this._close2}
            open3={this._open3}
            close3={this._close3}
            open4={this._open4}
            close4={this._close4}
            openCalendar1={this._openCalendar1}
            closeCalendar1={this._closeCalendar1}
            openCalendar2={this._openCalendar2}
            closeCalendar2={this._closeCalendar2}
            selectCustomerLocation={this._selectCustomerLocation}
            blankCustomerLocation={this._blankCustomerLocation}
            completeAddOption={this._completeAddOption}
            removeOption={this._removeOption}
            openOptionPlus={this._openOptionPlus}
            closeOptionPlus={this._closeOptionPlus}
            changeDateStep={this._changeDateStep}
            handleChangeDateOption={this._handleChangeDateOption}
            blankDateOption={this._blankDateOption}
            selectDate={this._selectDate}
            selectDateRange={this._selectDateRange}
            confirmDate={this._confirmDate}
            selectOption={this._selectOption}
            blankOption={this._blankOption}
            confirm={this._confirm}
            onSort={this._onSort}
            handleChangeTimes={this._handleChangeTimes}
            />
        )
    }
}

export default Container;