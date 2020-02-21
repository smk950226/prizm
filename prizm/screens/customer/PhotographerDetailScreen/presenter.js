import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, ActivityIndicator, TextInput, Dimensions, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import PhotoSlider from '../../../components/PhotoSlider';
import Collapsible from 'react-native-collapsible';
import StarRating from 'react-native-star-rating';
import MapView, { Marker } from 'react-native-maps';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import { StackActions, NavigationActions } from 'react-navigation';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get('window');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class PhotographerDetailScreen extends Component{
    static propTypes = {
        photographer: PropTypes.object,
        isTruncated: PropTypes.bool.isRequired,
        doTruncate: PropTypes.func.isRequired,
        undoTruncate: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        show1: PropTypes.bool.isRequired,
        open1: PropTypes.func.isRequired,
        close1: PropTypes.func.isRequired,
        selectedLocation: PropTypes.object,
        selectLocation: PropTypes.func.isRequired,
        blankLocation: PropTypes.func.isRequired,
        dateConfirm: PropTypes.bool.isRequired,
        show2: PropTypes.bool.isRequired,
        open2: PropTypes.func.isRequired,
        close2: PropTypes.func.isRequired,
        dateOption: PropTypes.number.isRequired,
        handleChangeDateOption: PropTypes.func.isRequired,
        showCalendar1: PropTypes.bool.isRequired,
        openCalendar1: PropTypes.func.isRequired,
        closeCalendar1: PropTypes.func.isRequired,
        showCalendar2: PropTypes.bool.isRequired,
        openCalendar2: PropTypes.func.isRequired,
        closeCalendar2: PropTypes.func.isRequired,
        selectDate: PropTypes.func.isRequired,
        selectedDate: PropTypes.any,
        selectDateStep: PropTypes.number.isRequired,
        changeDateStep: PropTypes.func.isRequired,
        selectedHour: PropTypes.any,
        selectedMin: PropTypes.any,
        handleChangeTimes: PropTypes.func.isRequired,
        confirmDate: PropTypes.func.isRequired,
        selectDateRange: PropTypes.func.isRequired,
        selectedStartDate: PropTypes.any,
        selectedEndDate: PropTypes.any,
        selectedOption: PropTypes.object,
        show3: PropTypes.bool.isRequired,
        open3: PropTypes.func.isRequired,
        close3: PropTypes.func.isRequired,
        selectOption: PropTypes.func.isRequired,
        blankOption: PropTypes.func.isRequired,
        comment: PropTypes.string.isRequired,
        handleChangeComment: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        fromAuth: PropTypes.bool.isRequired,
        requestSubmitted: PropTypes.bool.isRequired,
        isConfirmPage: PropTypes.bool.isRequired,
        request: PropTypes.object,
        submit: PropTypes.func.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        send: PropTypes.func.isRequired,
        isSendingEmail: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const { request } = props;
        this.state = {
            select1: null,
            select2: null,
            select3: null,
            select4: null,
            keyboardHeight: 0,
            region: {
                latitude: request.location ? request.location.lat : 37.579617,
                longitude: request.location ? request.location.lng : 126.977041,
                latitudeDelta: 0.01,
                longitudeDelta: height*0.01/width,
            },
            mapReady: false
        }

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    _keyboardDidShow = async(e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
        await sleep(100)
        this.scrollViewRef.scrollTo({y: this.state.select4.y + 300})
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardHeight: 0
        })
    }

    _selectLocation = async(location) => {
        const result = await this.props.selectLocation(location)
        if(result){
            await sleep(500)
            this.scrollViewRef.scrollTo({y: this.state.select2.y + 300})
        }
    }

    _confirmDate = async() => {
        const result = await this.props.confirmDate()
        if(result){
            await sleep(500)
            this.scrollViewRef.scrollTo({y: this.state.select3.y + 300})
        }
    }

    _selectOption = async(selectedOption) => {
        const result = await this.props.selectOption(selectedOption)
        if(result){
            await sleep(500)
            this.scrollViewRef.scrollTo({y: this.state.select4.y + 300})
        }
    }

    _mapReady = () => {
        if(this.props.request.location){
            const { request : { location } } = this.props;
            this.setState({
                region: {
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: height*0.01/width,
                },
                mapReady: true
            })
        }
    }

    render(){
        const { 
            photographer, 
            isTruncated,
            loading,
            show1,
            show2,
            show3,
            show4,
            selectedLocation,
            dateConfirm,
            dateOption,
            selectedDate,
            selectedStartDate,
            selectedEndDate,
            selectedHour,
            selectedMin,
            selectedOption,
            comment,
            showCalendar1,
            showCalendar2,
            selectDateStep,
            isLoggedIn,
            isConfirmPage,
            requestSubmitted,
            fromAuth,
            request,
            isSubmitting,
            profile,
            isSendingEmail
        } = this.props;
        const { keyboardHeight, region } = this.state;
        return(
            <View style={[styles.container, styles.bgWhite]}>
                {!requestSubmitted ? (
                    !isConfirmPage ? (
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        alwaysBounceVertical={false}
                        ref={ref => this.scrollViewRef = ref}
                        >
                            <View style={[{height: 70}]}>
                                {photographer.portfolio_set && photographer.portfolio_set.length > 0 ? (
                                    <PhotoSlider images={photographer.portfolio_set} name={photographer.nickname} height={70} />
                                ) : (
                                    null
                                )}
                            </View>
                            <View style={[styles.mt10, styles.py10, styles.px15, styles.row, styles.alignItemsCenter]}>
                                <Image source={photographer.profile_image ? {uri: photographer.profile_image} : require('../../../assets/images/icon_profile.png')} style={[styles.circle60]} />
                                <View style={[styles.ml10]}>
                                    <Text style={[styles.fontBold, styles.font16]}>
                                        {photographer.nickname}
                                    </Text>
                                    <Text style={[styles.fontRegular, styles.font14]}>
                                        {photographer.main_location}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.px15, styles.mt10]}>
                                <View style={[styles.row, styles.justifyContentBetween]}>
                                    <Text style={[styles.font14, styles.fontBold]}>
                                        {this.context.t("Career")}
                                    </Text>
                                    <Text style={[styles.font14, styles.ml10]}>
                                        {photographer.career}
                                    </Text>
                                </View>
                                {photographer.equipment ? (
                                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt5]}>
                                        <Text style={[styles.font14, styles.fontBold]}>
                                            {this.context.t("Equipment")}
                                        </Text>
                                        <Text style={[styles.font14]}>
                                            {photographer.equipment}
                                        </Text>
                                    </View>
                                ) : (
                                    null
                                )}
                                <TouchableWithoutFeedback onPress={isTruncated ? this.props.undoTruncate : this.props.doTruncate}>
                                    <View>
                                        <Text 
                                        style={[styles.font14, styles.mt10, {lineHeight: 20}]}
                                        ellipsizeMode={isTruncated ? 'tail' : null}
                                        numberOfLines={isTruncated ? 5 : null}
                                        >
                                            {photographer.description}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt10]}>
                                    <Text style={[styles.font14, styles.fontBold]}>
                                        {this.context.t("Review")}
                                    </Text>
                                    <TouchableWithoutFeedback>
                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                            <Text style={[styles.font14, styles.mr5]}>
                                                {photographer.total_rating}
                                            </Text>
                                            <StarRating
                                                disabled={true}
                                                maxStars={5}
                                                rating={photographer.total_rating}
                                                emptyStar={require('../../../assets/images/icon_star_disabled.png')}
                                                fullStar={require('../../../assets/images/icon_star.png')}
                                                halfStar={require('../../../assets/images/icon_star_half.png')}
                                                fullStarColor={'#FFBD07'}
                                                starSize={12}
                                            />
                                            <Text style={[styles.font12, styles.ml5, styles.mr5]}>
                                                {`(${photographer.review_count})`}
                                            </Text>
                                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrowSm]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                            {loading ? (
                                <ActivityIndicator size={'small'} color={'#000'} />
                            ) : (
                                <View style={[styles.mt10]}>
                                    <TouchableWithoutFeedback onPress={show1 ? selectedLocation.id ? this.props.close1 : null : this.props.open1} onLayout={event => this.setState({
                                        select1: event.nativeEvent.layout
                                    })}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                            <View style={[styles.row, styles.alignItemsCenter]}>
                                                <Text style={[styles.fontBold, styles.font14]}>
                                                    {this.context.t("1. Select Location")}
                                                </Text>
                                                <Text style={[styles.fontBold, styles.font14, styles.pink, styles.ml10]}>
                                                    {`(${photographer.location_set.length})`}
                                                </Text>
                                            </View>
                                                <View>
                                                    <Image source={show1 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                                </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Collapsible collapsed={!show1}>
                                        <View style={[styles.mt10, styles.px15]}>
                                            {photographer.location_set && photographer.location_set.length > 0 ? (
                                                <ScrollView
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                alwaysBounceHorizontal={false}
                                                >
                                                    {photographer.location_set.map((location, index) => (
                                                        <TouchableWithoutFeedback key={index} onPress={selectedLocation.id === location.id ? this.props.blankLocation : () => this._selectLocation(location)}>
                                                            <View style={[selectedLocation.id === location.id ? styles.borderPink3 : styles.borderGrayF43, index === photographer.location_set.length - 1 ? null : styles.mr5, styles.px10, styles.py5]}>
                                                                <Text style={[styles.font10]}>
                                                                    {this.context.t(`Location ${index + 1}`)}
                                                                </Text>
                                                                <Text style={[styles.fontBold, styles.font12]}>
                                                                    {location.name}
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    ))}
                                                </ScrollView>

                                            ) : (
                                                <Text style={[styles.font14, styles.textCenter]}>
                                                    {this.context.t("There is no available location.")}
                                                </Text>
                                            )}
                                            {selectedLocation.name ? (
                                                <View style={[styles.mt10]}>
                                                    <MapView 
                                                    ref={ref => (this.selectedMap = ref)}
                                                    style={[styles.widthFull, {height: 300}]}
                                                    initialRegion={{
                                                        latitude: selectedLocation.lat,
                                                        longitude: selectedLocation.lng,
                                                        latitudeDelta: 0.01,
                                                        longitudeDelta: height*0.01/width,
                                                    }}
                                                    region={{
                                                        latitude: selectedLocation.lat,
                                                        longitude: selectedLocation.lng,
                                                        latitudeDelta: 0.01,
                                                        longitudeDelta: height*0.01/width,
                                                    }}
                                                    >
                                                        <Marker
                                                        ref={ref => (this.selectedMarker = ref)}
                                                        key={selectedLocation.name}
                                                        coordinate={{
                                                            latitude: selectedLocation.lat,
                                                            longitude: selectedLocation.lng
                                                        }}
                                                        />
                                                    </MapView>
                                                </View>
                                            ) : null}
                                        </View>
                                    </Collapsible>
                                    <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                                    <TouchableWithoutFeedback onPress={(dateConfirm ) ? show2 ? this.props.close2 : this.props.open2 : null} onLayout={event => this.setState({
                                        select2: event.nativeEvent.layout
                                    })}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                            <View style={[styles.row, styles.alignItemsCenter]}>
                                                <Text style={[styles.fontBold, styles.font14]}>
                                                    {this.context.t("2. Date&Time")}
                                                </Text>
                                            </View>
                                            <View>
                                                <Image source={show2 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Collapsible collapsed={!show2}>
                                        <View style={[styles.mt10, styles.px15]}>
                                            <View style={[styles.row]}>
                                                <TouchableWithoutFeedback onPress={() => this.props.handleChangeDateOption(1)}>
                                                    <View style={[styles.flex1, styles.row]}>
                                                        <View style={[styles.icon15, dateOption === 1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                            {dateOption === 1 && (
                                                                <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                            )}
                                                        </View>
                                                        <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                            {this.context.t("I have a specific date and time in mind.")}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            {dateConfirm && (dateOption === 1) && (
                                                <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                                    <View style={[styles.flex1, styles.pr5, { height: 40 }, styles.justifyContentCenter]}>
                                                        <TouchableWithoutFeedback onPress={() => this.props.openCalendar1(1)}>
                                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                                    {selectedDate && `${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).length === 2 ? (selectedDate.getMonth() + 1) : '0'.concat(String(selectedDate.getMonth() + 1))}/${selectedDate.getDate()}`}
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                    <View style={[styles.flex1, styles.pl5, { height: 40 }, styles.justifyContentCenter]}>
                                                        <TouchableWithoutFeedback onPress={() => this.props.openCalendar1(2)}>
                                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                                {`${selectedHour}:${selectedMin}`}
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                </View>
                                            )}
                                            <View style={[styles.row, styles.mt10]}>
                                                <TouchableWithoutFeedback onPress={() => this.props.handleChangeDateOption(2)}>
                                                    <View style={[styles.flex1, styles.row]}>
                                                        <View style={[styles.icon15, dateOption === 2 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                            {dateOption === 2 && (
                                                                <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                            )}
                                                        </View>
                                                        <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                            {this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            {dateConfirm && (dateOption === 2) && (
                                                <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                                    <View style={[styles.flex1, styles.pr5, { height: 40 }, styles.justifyContentCenter]}>
                                                        <TouchableWithoutFeedback onPress={this.props.openCalendar2}>
                                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                                {selectedStartDate !== "" && `${selectedStartDate.getFullYear()}/${String(selectedStartDate.getMonth() + 1).length === 2 ? (selectedStartDate.getMonth() + 1) : '0'.concat(String(selectedStartDate.getMonth() + 1))}/${selectedStartDate.getDate()}`}
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                    <View style={[styles.flex1, styles.pl5, { height: 40 }, styles.justifyContentCenter]}>
                                                        <TouchableWithoutFeedback onPress={this.props.openCalendar2}>
                                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                                {selectedEndDate !== "" && `${selectedEndDate.getFullYear()}/${String(selectedEndDate.getMonth() + 1).length === 2 ? (selectedEndDate.getMonth() + 1) : '0'.concat(String(selectedEndDate.getMonth() + 1))}/${selectedEndDate.getDate()}`}
                                                                </Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    </Collapsible>
                                    <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                                    <TouchableWithoutFeedback onPress={selectedOption.id ? show3 ?  this.props.close3 : this.props.open3 : null} onLayout={event => this.setState({
                                        select3: event.nativeEvent.layout
                                    })}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                            <View style={[styles.row, styles.alignItemsCenter]}>
                                                <Text style={[styles.fontBold, styles.font14]}>
                                                    {this.context.t("3. Service&Pricing")}
                                                </Text>
                                            </View>
                                            <View>
                                                <Image source={show3 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Collapsible collapsed={!show3}>
                                        <View style={[styles.mt10, styles.px15]}>
                                            {photographer.option_set && photographer.option_set.length > 0 ? (
                                                photographer.option_set.map((option, index) => (
                                                    <TouchableWithoutFeedback key={index} onPress={selectedOption.id === option.id ? this.props.blankOption : () => this._selectOption(option)}>
                                                        <View key={index} style={[styles.py15, styles.px15, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, index === photographer.option_set.length - 1 ? null : styles.mb10, selectedOption.id === option.id ? styles.borderPink : styles.borderGrayD9, selectedOption.id === option.id ? styles.bgPink : styles.bgWhite]}>
                                                            <View>
                                                                <Text style={[styles.fontBold, styles.font14, selectedOption.id === option.id ? styles.white : styles.black]}>{`${option.title} (${option.person > 1 ? `${option.person} people` : `${option.person} person`}, ${option.hour > 1 ? `${option.hour} hrs` : `${option.hour} hr`})`}</Text>
                                                                <Text style={[styles.font10, styles.mt5, selectedOption.id === option.id ? styles.white : styles.black]}>{option.description}</Text>
                                                            </View>
                                                            <View>
                                                                <Text style={[styles.font14, selectedOption.id === option.id ? styles.white : styles.black]}>{`$${numberWithCommas(option.price)}`}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                ))
                                            ) : (
                                                <Text style={[styles.font13, styles.textCenter, styles.mt15]}>
                                                    {this.context.t("There is no available service & pricing option.")}
                                                </Text>
                                            )}
                                        </View>
                                    </Collapsible>
                                    <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                                    <TouchableWithoutFeedback onLayout={event => this.setState({
                                        select4: event.nativeEvent.layout
                                    })}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                            <View style={[styles.row, styles.alignItemsCenter]}>
                                                <Text style={[styles.fontBold, styles.font14]}>
                                                    {this.context.t("4. Comments (Optional)")}
                                                </Text>
                                            </View>
                                            <View>
                                                <Image source={show4 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Collapsible collapsed={!show4}>
                                        <View style={[styles.mt10, styles.px15, { height: 210, marginBottom: keyboardHeight }]}>
                                            <TextInput
                                                style={[styles.font14, styles.widthFull, styles.px25, styles.py10, styles.black, styles.widthFull, styles.borderBlack, {height: 150, minHeight: 150, flex: 1}]}
                                                placeholder={this.context.t("Please leave your message here.")}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={comment} 
                                                onChangeText={this.props.handleChangeComment} 
                                                returnKeyType={'done'} 
                                                placeholderTextColor={'#000000'}
                                                multiline={true}
                                                maxLength={500}
                                                textAlignVertical={'top'}
                                            />
                                            <TouchableWithoutFeedback onPress={this.props.goConfirm}>
                                                <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter, styles.mt10]}>
                                                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                        {isLoggedIn ? this.context.t("Submit the request") : this.context.t("Sign up & Submit the request")}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </Collapsible>
                                </View>
                            )}
                        </ScrollView>   
                    ) : (
                        fromAuth ? (
                            <ScrollView
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            ref={ref => this.confirmScrollView = ref}
                            >
                                <View style={[styles.mt10, styles.px15]}>
                                    <Text style={[styles.font16, styles.fontBold]}>
                                        {this.context.t("Please review your reservation deatils : ")}
                                    </Text>
                                    <Text style={[styles.font14, styles.fontBold, styles.mt10]}>
                                        {this.context.t("Location")}
                                    </Text>
                                    <Text style={[styles.font14, styles.fontBold, styles.mt5]}>
                                        {request.photographer ? request.location.name : ""}
                                    </Text>
                                    {request.location ? (
                                        <View style={[styles.mt10]}>
                                            <MapView 
                                            ref={ref => (this.confirmMap = ref)}
                                            style={[styles.widthFull, {height: 200}]}
                                            initialRegion={{
                                                latitude: request.location.lng,
                                                longitude: request.location.lat,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: height*0.01/width,
                                            }}
                                            region={region}
                                            onMapReady={this._mapReady}
                                            >
                                                <Marker
                                                key={String(region.lat)}
                                                ref={ref => (this.confirmMarker = ref)}
                                                coordinate={region}
                                                />
                                            </MapView>
                                        </View>
                                    ) : (
                                        <View style={[styles.mt10]}>
                                            <View style={[{height: 200}]}>
                                            </View>
                                        </View>
                                    )}
                                    <Text style={[styles.font14, styles.fontBold, styles.mt20]}>
                                        {this.context.t("Date&Time")}
                                    </Text>
                                    {request.dateOption === 1 ? (
                                        <Fragment>
                                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                                {request.photographer ? `${request.date.split('-')[0]}/${String(request.date.split('-')[1]).length === 2 ? (request.date.split('-')[1]) : '0'.concat(String(request.date.split('-')[1]))}/${request.date.split('-')[2]} ${request.hour}:${request.min}` : ""}
                                            </Text>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {this.context.t("I have a specific date in mind")}
                                            </Text>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                                {request.photographer ? `${request.startDate.split('-')[0]}/${String(request.startDate.split('-')[1]).length === 2 ? (request.startDate.split('-')[1]) : '0'.concat(String(request.startDate.split('-')[1]))}/${request.startDate.split('-')[2]} ~ ${request.endDate.split('-')[0]}/${String(request.endDate.split('-')[1]).length === 2 ? (request.endDate.split('-')[1]) : '0'.concat(String(request.endDate.split('-')[1]))}/${request.endDate.split('-')[2]}` : ""}
                                            </Text>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}
                                            </Text>
                                        </Fragment>
                                    )}
                                    <Text style={[styles.font14, styles.fontBold, styles.mt20]}>
                                        {this.context.t("Service&Pricing")}
                                    </Text>
                                    <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                        {request.photographer ? `${request.option.title} (${request.option.person > 1 ? `${request.option.person} people` : `${request.option.person} person`}, ${request.option.hour > 1 ? `${request.option.hour} hrs` : `${request.option.hour} hr`})` : ""}
                                    </Text>
                                    <Text style={[styles.mt5, styles.font10]}>
                                        {request.option.description}
                                    </Text>
                                    {request.comment ? (
                                        <Fragment>
                                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                                {this.context.t("Comment")}
                                            </Text>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {request.comment}
                                            </Text>
                                        </Fragment>
                                    ) : (
                                        null
                                    )}
                                </View>
                                <TouchableWithoutFeedback onPress={this.props.submit}>
                                    <View style={[styles.bgGray33, styles.mt20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("Confirm and Submit Request")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        ) : (
                            <ScrollView
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            ref={ref => this.confirmScrollView = ref}
                            >
                                <View style={[styles.mt10, styles.px15]}>
                                    <Text style={[styles.font16, styles.fontBold]}>
                                        {this.context.t("Submit Request")}
                                    </Text>
                                    <Text style={[styles.font14, styles.fontBold, styles.mt10]}>
                                        {this.context.t("Location")}
                                    </Text>
                                    <Text style={[styles.font14, styles.fontBold, styles.mt5]}>
                                        {request.photographer ? request.location.name : ""}
                                    </Text>
                                    {request.location ? (
                                        <View style={[styles.mt10]}>
                                            <MapView 
                                            ref={ref => (this.confirmMap = ref)}
                                            style={[styles.widthFull, {height: 200}]}
                                            initialRegion={{
                                                latitude: request.location.lng,
                                                longitude: request.location.lat,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: height*0.01/width,
                                            }}
                                            region={region}
                                            onMapReady={this._mapReady}
                                            >
                                                <Marker
                                                key={String(region.lat)}
                                                ref={ref => (this.confirmMarker = ref)}
                                                coordinate={region}
                                                />
                                            </MapView>
                                        </View>
                                    ) : (
                                        <View style={[styles.mt10]}>
                                            <View style={[{height: 200}]}>
                                            </View>
                                        </View>
                                    )}
                                    <Text style={[styles.font14, styles.fontBold, styles.mt20]}>
                                        {this.context.t("Date&Time")}
                                    </Text>
                                    {request.dateOption === 1 ? (
                                        <Fragment>
                                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                                {request.photographer ? `${request.date.split('-')[0]}/${String(request.date.split('-')[1]).length === 2 ? (request.date.split('-')[1]) : '0'.concat(String(request.date.split('-')[1]))}/${request.date.split('-')[2]} ${request.hour}:${request.min}` : ""}
                                            </Text>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {this.context.t("I have a specific date in mind")}
                                            </Text>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                                {request.photographer ? `${request.startDate.split('-')[0]}/${String(request.startDate.split('-')[1]).length === 2 ? (request.startDate.split('-')[1]) : '0'.concat(String(request.startDate.split('-')[1]))}/${request.startDate.split('-')[2]} ~ ${request.endDate.split('-')[0]}/${String(request.endDate.split('-')[1]).length === 2 ? (request.endDate.split('-')[1]) : '0'.concat(String(request.endDate.split('-')[1]))}/${request.endDate.split('-')[2]}` : ""}
                                            </Text>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {this.context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}
                                            </Text>
                                        </Fragment>
                                    )}
                                    <Text style={[styles.font14, styles.fontBold, styles.mt20]}>
                                        {this.context.t("Service&Pricing")}
                                    </Text>
                                    <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                        {request.photographer ? `${request.option.title} (${request.option.person > 1 ? `${request.option.person} people` : `${request.option.person} person`}, ${request.option.hour > 1 ? `${request.option.hour} hrs` : `${request.option.hour} hr`})` : ""}
                                    </Text>
                                    <Text style={[styles.mt5, styles.font10]}>
                                        {request.option.description}
                                    </Text>
                                    {request.comment ? (
                                        <Fragment>
                                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                                {this.context.t("Comment")}
                                            </Text>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {request.comment}
                                            </Text>
                                        </Fragment>
                                    ) : (
                                        null
                                    )}
                                </View>
                                <TouchableWithoutFeedback onPress={this.props.submit}>
                                    <View style={[styles.bgGray33, styles.mt20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("Confirm and Submit Request")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        )
                    )
                ) : (
                    profile.is_verified ? (
                        <View style={[styles.flex1, styles.center, styles.px15, styles.py20]}>
                            <View>
                                <Image source={require('../../../assets/images/request_complete.png')} resizeMode={'contain'} style={[styles.alignSelfCenter, { maxWidth: 400, width: width*0.8, maxHeight: 1668*400/2388, height: 1668*width*0.8/2388 }]} />
                                <Text style={[styles.font14, styles.fontBold, styles.mt30, styles.textCenter]}>
                                    {this.context.t("Your request was submitted successfully")}
                                </Text>
                                <Text style={[styles.font12, styles.mt30, styles.textCenter, { lineHeight: 18 }]}>
                                    {photographer.nickname}{this.context.t(" is now reviewing your request. \n")}
                                    {this.context.t("We will soon send you a confirmation message \n")}
                                    {this.context.t("to your email and mobile number.")}
                                </Text>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({
                                            routeName: 'PhotographerList'
                                        })]
                                    }))}>
                                    <View style={[styles.bgGray33, styles.mt20, styles.px20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("Go to the main page")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.flex1, styles.justifyContentCenter, styles.px15, styles.py20]}>
                            <View style={[styles.widthFull]}>
                                <Text style={[styles.font14, styles.fontBold, styles.textCenter]}>
                                    {this.context.t("Your Reservation Request has been submitted!")}
                                </Text>
                                <Image source={require('../../../assets/images/email_verifing.png')} resizeMode={'contain'} style={[styles.mt15, styles.alignSelfCenter, { maxWidth: 400, width: width*0.8, maxHeight: 1668*400/2388, height: 1668*width*0.8/2388 }]} />
                                <Text style={[styles.font14, styles.mt15, styles.textCenter]}>
                                    {this.context.t("We sent a ")}
                                    <Text style={[styles.pink]}>
                                        {this.context.t("verification email ")}
                                    </Text>
                                    {this.context.t("to the following address :")}
                                </Text>
                                <Text style={[styles.font14, styles.mt10, styles.textCenter]}>
                                    {profile.email}
                                </Text>
                                <Text style={[styles.font14, styles.mt10, styles.textCenter]}>
                                    <Text style={[styles.pink]}>
                                        {this.context.t("Please verify yourself by clicking the link attached in the email.")}
                                    </Text>
                                    {this.context.t(" When you complete the email verification, your request details will be sent to the selected photographer")}
                                </Text>
                                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt20]}>
                                    <View style={[styles.flex1, styles.pr5]}>
                                        <TouchableWithoutFeedback onPress={this.props.send}>
                                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSendingEmail ? { opacity: 0.7 } : null]}>
                                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                    {this.context.t("Resend")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View> 
                                    <View style={[styles.flex1, styles.pl5]}>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({
                                            routeName: 'PhotographerList'
                                        })]
                                    }))}>
                                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                    {this.context.t("Main")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View> 
                                </View>
                            </View>
                        </View>
                    )
                )}
                 
                <Modal
                isVisible={showCalendar1}
                onBackButtonPress={this.props.closeCalendar1}
                onBackdropPress={this.props.closeCalendar1}
                >
                    <View style={[styles.bgWhite, styles.pt20, styles.center]}>
                        {selectDateStep === 1 && (
                            <Fragment>
                                <CalendarPicker
                                onDateChange={this.props.selectDate}
                                selectedStartDate={selectedDate ? selectedDate : null}
                                selectedEndDate={selectedDate ? selectedDate : null}
                                selectedDayColor={'#d66c8b'}
                                selectedDayTextColor={'#ffffff'}
                                dayShape={'square'}
                                disabledDates={(date) => {
                                    if(date < new Date()){
                                        return true
                                    }
                                    else{
                                        return false
                                    }
                                }}
                                previousTitle={'<'}
                                nextTitle={'>'}
                                previousTitleStyle={{
                                    fontFamily: 'NanumSquareOTFB00',
                                    fontSize: 18
                                }}
                                nextTitleStyle={{
                                    fontFamily: 'NanumSquareOTFB00',
                                    fontSize: 18
                                }}
                                textStyle={{
                                    fontFamily: 'NanumSquareOTFB00'
                                }}
                                width={width - 60}
                                />
                                <TouchableWithoutFeedback onPress={() => this.props.changeDateStep(2)}>
                                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("NEXT")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Fragment>
                        )}
                        {selectDateStep === 2 && (
                            <Fragment>
                                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.widthFull, styles.px15]}>
                                    <TouchableWithoutFeedback onPress={() => this.props.changeDateStep(1)}>
                                        <View>
                                            <Image source={require('../../../assets/images/icon_arrow_left.png')} style={[styles.iconArrow]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={[styles.font16, styles.fontBold]}>
                                        {selectedDate !== "" && `${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}
                                    </Text>
                                    <View style={[styles.hidden]}>
                                        <Image source={require('../../../assets/images/icon_arrow_left.png')} style={[styles.iconArrow]} />
                                    </View>
                                </View>
                                <DatePicker
                                    style={[{width: width - 60, borderWidth: 0}, styles.my30]}
                                    date={`${selectedHour}:${selectedMin}`}
                                    mode="time"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    hideText={false}
                                    textColor={'#000'}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            color: '#000'
                                        },
                                        placeholderText: {
                                            color: '#000'
                                        },
                                        dateText: {
                                            fontSize: 20,
                                            fontFamily: 'NanumSquareOTFB00',
                                            color: '#000'
                                        },
                                        confirmBtnText: {
                                            color: '#000'
                                        },
                                        textStyle: {
                                            color: '#000'
                                        }
                                    }}
                                    onDateChange={(date) => this.props.handleChangeTimes(date)}
                                />
                                <TouchableWithoutFeedback onPress={this._confirmDate}>
                                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("DONE")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Fragment>
                        )}
                    </View>
                </Modal>
                <Modal
                isVisible={showCalendar2}
                onBackButtonPress={this.props.closeCalendar2}
                onBackdropPress={this.props.closeCalendar2}
                >
                    <View style={[styles.bgWhite, styles.pt20, styles.center]}>
                        <CalendarPicker
                        allowRangeSelection={true}
                        onDateChange={this.props.selectDateRange}
                        selectedDayColor={'#d66c8b'}
                        selectedDayTextColor={'#ffffff'}
                        dayShape={'square'}
                        disabledDates={(date) => {
                            if(date < new Date()){
                                return true
                            }
                            else{
                                return false
                            }
                        }}
                        previousTitle={'<'}
                        nextTitle={'>'}
                        selectedStartDate={selectedStartDate ? selectedStartDate : null}
                        selectedEndDate={selectedEndDate ? selectedEndDate : null}
                        previousTitleStyle={{
                            fontFamily: 'NanumSquareOTFB00',
                            fontSize: 18
                        }}
                        nextTitleStyle={{
                            fontFamily: 'NanumSquareOTFB00',
                            fontSize: 18
                        }}
                        textStyle={{
                            fontFamily: 'NanumSquareOTFB00'
                        }}
                        width={width - 60}
                        />
                        <TouchableWithoutFeedback onPress={this._confirmDate}>
                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                    {this.context.t("DONE")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>    
                <Modal
                isVisible={isSubmitting}
                onBackButtonPress={null}
                onBackdropPress={null}
                backdropOpacity={0.7}
                backdropColor={'#ffffff'}
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}
                >
                    <View style={[styles.container, styles.center]}>
                        <Loader/>
                    </View>
                </Modal>
                <Modal
                isVisible={isSendingEmail}
                onBackButtonPress={null}
                onBackdropPress={null}
                backdropOpacity={0.7}
                backdropColor={'#ffffff'}
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}
                >
                    <View style={[styles.container, styles.center]}>
                        <Loader/>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default PhotographerDetailScreen;
