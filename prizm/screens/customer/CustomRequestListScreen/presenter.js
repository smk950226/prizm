import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class RequestOrderList extends Component{
    static propTypes = {
        orderListMore: PropTypes.func.isRequired,
        refreshComp: PropTypes.func.isRequired,
        orders: PropTypes.array,
        isLoadingMore: PropTypes.bool.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        refresh: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { loading, orders, refreshing, isLoadingMore, hasNextPage } = this.props;
        return(
            <View style={[styles.container, styles.bgWhite]}>
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.py10, styles.px15, styles.bgGrayF8]}>
                    <Text style={[styles.font10]}>
                        {this.context.t("Please select your most preferred photographer.")}
                    </Text>
                </View>
                {loading ? (
                    <ActivityIndicator size={'small'} color={'#000'} />
                ) : (
                    
                    (orders && orders.length > 0) ? (
                        <FlatList 
                        showsVerticalScrollIndicator={false}
                        alwaysBounceVertical={false}
                        data={orders}
                        renderItem={({item, index}) => {
                            const location = JSON.parse(item.location.replace(/'/gi, '"'))
                            return(
                            <TouchableWithoutFeedback key={item.id} onPress={() => this.props.goRequestOrderDetail(item)}>
                                <View style={[styles.py15, index % 2 === 0 ? styles.bgWhite : styles.bgGrayF8, styles.px15]}>
                                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                                        <View style={[styles.flex8, styles.row, styles.alignItemsCenter]}>
                                            {item.photographer.profile_image ? (
                                                <Image source={{uri: item.photographer.profile_image}} style={[styles.circle50]} />
                                            ) : (
                                                <View style={[styles.circle50, styles.bgGray97]} />
                                            )}
                                            <View style={[styles.ml15]}>
                                                <Text style={[styles.fontBold, styles.font14]}>
                                                    {item.photographer.nickname}
                                                </Text>
                                                <Text style={[styles.font13, styles.mt5]}>
                                                    {item.photographer.career}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[styles.flex2]}>
                                            <Text style={[styles.font12, styles.pink, styles.textRight]}>
                                                {this.context.t("Details >")}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <Text style={[styles.font12]}>
                                            <Text style={[styles.fontBold]}>
                                                {this.context.t("Photography Location")}
                                            </Text>
                                            {` : ${location.name}`}
                                        </Text>
                                        <View style={[styles.bgBlack, styles.mx10, { width: 2, height: 14 }]} />
                                        <Text style={[styles.font12]}>
                                            <Text style={[styles.fontBold]}>
                                                {this.context.t("Price")}
                                            </Text>
                                            {` : $${numberWithCommas(item.price)}`}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}} 
                        numColumns={1} 
                        keyExtractor={item => String(item.id)} 
                        refreshing={refreshing} 
                        onRefresh={this.props.refresh} 
                        onEndReached={hasNextPage ? this.props.orderListMore : null} 
                        onEndReachedThreshold={0.5} 
                        bounces={true} 
                        ListFooterComponent={isLoadingMore ? (
                            <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                                <ActivityIndicator size={'small'} color={'#000000'} />
                            </View>
                        ): null} />
                    ) : (
                        <View>
                            <Image source={require('../../../assets/images/main.png')} style={[styles.alignSelfCenter, { maxWidth: 400, width: width*0.8, maxHeight: 1668*400/2388, height: 1668*width*0.8/2388 }]} resizeMode={'contain'} />
                            <Text style={[styles.font12, styles.mt15]}>
                                {this.context.t("You haven't made any reservations yet.\n")}
                                {this.context.t("A new schedule will appear when you submit a request to a photographer.")}
                            </Text>
                        </View>
                    )
                )}
            </View>
        )
    }
}

export default RequestOrderList