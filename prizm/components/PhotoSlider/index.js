import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import Modal from 'react-native-modal';
import Swiper from '../Swiper';

class PhotoSlider extends Component{
    static propTypes = {
        images: PropTypes.array.isRequired,
        name: PropTypes.string
    }
    
    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        showSlider: false,
        showIndex: 0
    }

    _openSlider = (showIndex) => {
        if(showIndex){
            this.setState({
                showIndex,
                showSlider: true
            })
        }
        else{
            this.setState({
                showIndex: 0,
                showSlider: true
            })
        }
    }

    _closeSlider = () => {
        this.setState({
            showSlider: false
        })
    }

    render(){
        const { images, name } = this.props;
        const { showSlider, showIndex } = this.state;
        return(
            <View style={[styles.container]}>
                <ScrollView
                horizontal={true}
                alwaysBounceHorizontal={false}
                showsHorizontalScrollIndicator={false}
                >
                    {images && images.length > 0 ? (
                        images.map((image, index) => (
                            <TouchableWithoutFeedback key={index} onPress={() => this._openSlider(index)}>
                                <View>
                                    <Image source={{uri: image.image}} style={[{height: 100, width: image.width*100/image.height}, index === images.length - 1 ? null : styles.mr5, styles.imageShadow]} resizeMode={'contain'} />
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    ) : (
                        <Text>
                            hi
                        </Text>
                    )}
                </ScrollView>
                <Modal
                isVisible={showSlider}
                onBackButtonPress={this._closeSlider}
                onBackdropPress={this._closeSlider}
                style={[styles.widthFull, styles.heightFull, { margin: 0, padding: 0 }]}
                >
                    <View style={[styles.widthFull, styles.heightFull, styles.bgBlack, styles.center]}>
                        
                        <View style={[styles.widthFull, styles.heightFull, styles.center]}>
                        <Swiper 
                            showsButtons={false}
                            autoplay={false}
                            showsPagination={false}
                            styles={[styles.flex1]}
                            index={showIndex}
                            loop={false}
                            >

                            {images.map((image, index) => (
                                <Image key={index} source={{uri: image.image}} style={[styles.widthFull, styles.heightFull]} resizeMode={'contain'} />
                            ))}
                        </Swiper>
                        </View>
                        <View style={[{position: 'absolute', top: 40}, styles.row, styles.widthFull, styles.justifyContentBetween, styles.alignItemsCenter, styles.px30]}>
                            <Text style={[styles.font12, styles.fontBold, styles.white]}>
                                {`Photo by ${name}`}
                            </Text>
                            <TouchableWithoutFeedback onPress={this._closeSlider}>
                                <View>
                                    <Image source={require('../../assets/images/icon_close_white.png')} style={[styles.icon15]} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default PhotoSlider