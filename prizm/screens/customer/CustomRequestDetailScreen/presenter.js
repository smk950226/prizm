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

class CustomRequestDetailScreen extends Component{
    static propTypes = {
        order: PropTypes.object,
        doTruncate: PropTypes.func.isRequired,
        undoTruncate: PropTypes.func.isRequired,
        isTruncated: PropTypes.bool.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        open1: PropTypes.func.isRequired,
        close1: PropTypes.func.isRequired,
        open2: PropTypes.func.isRequired,
        close2: PropTypes.func.isRequired,
        open3: PropTypes.func.isRequired,
        close3: PropTypes.func.isRequired,
        show1: PropTypes.bool.isRequired,
        show2: PropTypes.bool.isRequired,
        show3: PropTypes.bool.isRequired,
        submit: PropTypes.func.isRequired,
        requestSubmitted: PropTypes.bool.isRequired,
        dayList: PropTypes.array.isRequired,
        timeList: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        selectTime: PropTypes.func.isRequired,
        removeTime: PropTypes.func.isRequired,
        selectedTime: PropTypes.array,
        handleShowMap: PropTypes.func.isRequired,
        showMap: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const { order } = props;
        const location = JSON.parse(order.location.replace(/'/gi, '"'))
        const availableTime = order.available_time ? JSON.parse(order.available_time.replace(/'/gi, '"')) : []
        const photographer = order.photographer
        this.state = {
            region: {
                latitude: location ? location.lat : 37.579617,
                longitude: location ? location.lng : 126.977041,
                latitudeDelta: 0.01,
                longitudeDelta: height*0.01/width,
            },
            mapReady: false,
            location,
            availableTime,
            photographer
        }
    }

    _mapReady = () => {
        if(this.props.order.location){
            const { order } = this.props;
            const location = JSON.parse(order.location.replace(/'/gi, '"'))
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
        const { order, isTruncated, isSubmitting, show1, show2, show3, requestSubmitted, dayList, timeList, loading, selectedTime, showMap } = this.props;
        const { region, location, availableTime, photographer } = this.state;
        return(
            <View style={[styles.container, styles.bgWhite]}>
                {loading ? (
                    <ActivityIndicator size={'small'} color={'#000'} />
                ) : (
                    !requestSubmitted ? (
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
                            <View style={[styles.mt10]}>
                                <TouchableWithoutFeedback onPress={show1 ? this.props.close1 : this.props.open1}>
                                    <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                            <Text style={[styles.fontBold, styles.font14]}>
                                                {this.context.t("1. Photography Location")}
                                            </Text>
                                        </View>
                                        <View>
                                            <Image source={show1 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Collapsible collapsed={!show1}>
                                    <View style={[styles.mt10, styles.px15]}>
                                        <View style={[styles.row]}>
                                            <TouchableWithoutFeedback onPress={this.props.handleShowMap}>
                                                <View style={[styles.borderPink3, styles.px10, styles.py5]}>
                                                    <Text style={[styles.font10]}>
                                                        {this.context.t(`Location 1`)}
                                                    </Text>
                                                    <Text style={[styles.fontBold, styles.font12]}>
                                                        {location.name}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        {showMap && (
                                            location.name ? (
                                                <View style={[styles.mt10]}>
                                                    <MapView 
                                                    ref={ref => (this.selectedMap = ref)}
                                                    style={[styles.widthFull, {height: 300}]}
                                                    initialRegion={region}
                                                    region={region}
                                                    onMapReady={this._mapReady}
                                                    >
                                                        <Marker
                                                        ref={ref => (this.selectedMarker = ref)}
                                                        key={location.name}
                                                        coordinate={region}
                                                        />
                                                    </MapView>
                                                </View>
                                            ) : null
                                        )}
                                    </View>
                                </Collapsible>
                                <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                                <TouchableWithoutFeedback onPress={show2 ? this.props.close2 : this.props.open2}>
                                    <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                            <Text style={[styles.fontBold, styles.font14]}>
                                                {this.context.t("2. Price")}
                                            </Text>
                                        </View>
                                        <View>
                                            <Image source={show2 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Collapsible collapsed={!show2}>
                                    <View style={[styles.row, styles.mt20, styles.px15]}>
                                        <Text style={[styles.fontBold, styles.font13]}>
                                            {`$${numberWithCommas(order.price)}`}
                                        </Text>
                                        <Text style={[styles.pink, styles.font13]}>
                                            {`(${order.custom_request.person} ${order.custom_request.person > 1 ? `people` : `person`}, ${order.custom_request.hour} ${order.custom_request.hour > 1 ? `hours` : `hour`})`}
                                        </Text>
                                    </View>
                                </Collapsible>
                                <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                                <TouchableWithoutFeedback onPress={show3 ?  this.props.close3 : this.props.open3}>
                                    <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                            <Text style={[styles.fontBold, styles.font14]}>
                                                {this.context.t("3. Date&Time")}
                                            </Text>
                                        </View>
                                        <View>
                                            <Image source={show3 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Collapsible collapsed={!show3}>
                                    <View style={[styles.mt10, styles.px15]}>
                                        {order.custom_request.date_option === 'Specific' ? (
                                            <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                                <View style={[styles.flex1, styles.pr5, { height: 40 }, styles.justifyContentCenter]}>
                                                    <TouchableWithoutFeedback>
                                                        <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                            <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                                {`${order.custom_request.specific_date.slice(0,4)}/${order.custom_request.specific_date.slice(5,7)}/${order.custom_request.specific_date.slice(8,10)}`}
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View style={[styles.flex1, styles.pl5, { height: 40 }, styles.justifyContentCenter]}>
                                                    <TouchableWithoutFeedback>
                                                        <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                            <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                                {`${order.custom_request.specific_date.slice(11,13)}:${order.custom_request.specific_date.slice(14,16)}`}
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={[styles.py15, styles.bgGray33]}>
                                                <Text style={[styles.font12, styles.white, styles.px15]}>
                                                    {this.context.t("Please select your desired time(s).")}
                                                </Text>
                                                <View 
                                                style={[{height: (dayList.length*32) + 45}, styles.widthFull, styles.mt15, styles.bgGray33, styles.px15]}
                                                >
                                                    <ScrollView
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    >
                                                        <View>
                                                            {dayList.map((day, index) => (
                                                                <Fragment key={index}>
                                                                    {(index === 0) && (
                                                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                                                            <Text style={[styles.fontBold, styles.font11, styles.white, styles.hidden, { width: 70 }]}>
                                                                                {`${String(day.getFullYear()).slice(2,4)}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}`}
                                                                            </Text>
                                                                            {timeList.map((time, index) => (
                                                                                <Text key={index} style={[styles.fontBold, styles.font9, styles.white, { width: 31, marginLeft: -5 }]}>
                                                                                    {time}
                                                                                </Text>
                                                                            ))}
                                                                        </View>
                                                                    )}
                                                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                                                        <Text style={[styles.fontBold, styles.font11, styles.white, { width: 70 }]}>
                                                                            {`${String(day.getFullYear()).slice(2,4)}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}`}
                                                                        </Text>
                                                                        {timeList.map((time, idx) => {
                                                                            const isAvailable = availableTime.find(se => se === `${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) ? true : false
                                                                            const isSelected = selectedTime.find(se => se.time === `${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) ? true : false
                                                                            return(
                                                                                <TouchableWithoutFeedback key={idx} onPress={isAvailable ? isSelected ? () => this.props.removeTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`) :() => this.props.selectTime(`${String(day.getFullYear())}/${String(day.getMonth() + 1).length === 1 ? '0'.concat(String(day.getMonth() + 1)) : String(day.getMonth() + 1)}/${String(day.getDate()).length === 1 ? '0'.concat(String(day.getDate())) : String(day.getDate())}T${time}`, idx, index) : null}>
                                                                                    <View key={idx} style={[isAvailable ? isSelected ? styles.bgPink : styles.bgConfirmed :styles.bgWhite, { width: 26, height: 36, borderWidth: 1, borderColor: '#333333' }]}>
                                                                                    </View>
                                                                                </TouchableWithoutFeedback>
                                                                            )
                                                                        })}
                                                                    </View>
                                                                </Fragment>
                                                            ))}
                                                        </View>
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </Collapsible>
                                <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                                <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt30, styles.px15]}>
                                    <View style={[styles.flex1, styles.pr5, { height: 40 }, styles.justifyContentCenter]}>
                                        <TouchableWithoutFeedback onPress={this.props.submit}>
                                            <View style={[styles.flex1, styles.bgGray33, styles.center]}>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                    {this.context.t("Select this proposal")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.flex1, styles.pl5, { height: 40 }, styles.justifyContentCenter]}>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                                            <View style={[styles.flex1, styles.bgGray97, styles.center]}>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                    {this.context.t("Back")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                    </ScrollView>
                    ) : (
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
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
                                    <View style={[styles.bgGray33, styles.mt20, styles.px20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("Go to the main page")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    )
                )}  
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
            </View>
        )
    }
}

export default CustomRequestDetailScreen;
