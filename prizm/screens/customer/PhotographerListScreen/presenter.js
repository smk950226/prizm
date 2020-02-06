import React, { Fragment } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Linking, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import PhotoSlider from '../../../components/PhotoSlider';

const PhotographerListScreen = (props, context) => (
    <View style={[styles.container, styles.bgWhite]}>
        {props.loading ? (
            <ActivityIndicator size={'small'} color={'#000'} />
        ) : (
            
            (props.photographerList && props.photographerList.length > 0) ? (
                <FlatList 
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                data={props.photographerList} 
                ListHeaderComponent={
                    <Image source={require('../../../assets/images/seoul.png')} style={[styles.widthFull, { height: 70 }]} resizeMode={'cover'} />
                }
                renderItem={({item}) => (
                        <View key={item.id} style={[styles.mb10]}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px15, styles.py10]}>
                            <View style={[styles.row, styles.alignItemsCenter]}>
                                <Image source={item.profile_image ? {uri: item.profile_image} : require('../../../assets/images/icon_profile.png')} style={[styles.circle40]} />
                                <Text style={[styles.font14, styles.fontBold, styles.ml10]}>
                                    {item.nickname}
                                </Text>
                            </View>
                            <TouchableWithoutFeedback onPress={item.instagram_account ? Linking.openURL(`instagram://user?username=${item.instagram_account}`) : null}>
                                <View style={[styles.row, styles.justifyContentCenter, styles.alignItemsCenter, styles.px10, styles.py5, styles.bgGray33]}>
                                    <Image source={require('../../../assets/images/icon_instagram.png')} style={[styles.icon10]} />
                                    <Text style={[styles.font12, styles.white, styles.ml5]}>
                                        {context.t("Instagram")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.mt10, { height: 100 }]}>
                            <PhotoSlider images={item.portfolio_set} name={item.nickname} />
                        </View>
                    </View>
                )} 
                numColumns={1} 
                keyExtractor={item => String(item.id)} 
                refreshing={props.refreshing} 
                onRefresh={props.refresh} 
                onEndReached={props.hasNextPage ? props.photographerListMore : null} 
                onEndReachedThreshold={0.5} 
                bounces={true} 
                ListFooterComponent={props.isLoadingMore ? (
                    <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                        <ActivityIndicator size={'small'} color={'#000000'} />
                    </View>
                ): null} />
            ) : (
                null
            )
        )}
    </View>
)

PhotographerListScreen.propTypes = {
    photographerList: PropTypes.array,
    photographerListMore: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired
}

PhotographerListScreen.contextTypes = {
    t: PropTypes.func
}

export default PhotographerListScreen;
