import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import Review from '../Review';

class ReviewList extends Component{

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        reviews: PropTypes.array.isRequired,
        goBack: PropTypes.func.isRequired,
        totalRating: PropTypes.number,
        reviewCount: PropTypes.number,
        reviewListMore: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    _handleScroll = async() => {
        const wrappedElement = this.refs.reviewContainer
        if (this._isBottom(wrappedElement)) {
            if(!this.props.isLoadingMore){
                this.props.reviewListMore()
            }
        }
    }

    render(){
        const { loading, reviews, totalRating, reviewCount } = this.props;
        return(
            <div className={`${styles.widthFull} ${styles.containerCustomer} ${styles.bgWhite} ${styles.minHeightFull}`}>
                <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.px3}`} style={{zIndex: 2, position: 'fixed', top: 0, left: 0, right: 0}}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py4} ${styles.px3} ${styles.bgWhite} ${styles.widthFull} ${styles.containerCustomer}`}>
                        <div className={`${styles.col1} ${styles.px0}`}>
                            <img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Go back")} className={`${styles.iconArrowRight} ${styles.cursorPointer}`} onClick={this.props.goBack} />
                        </div>
                        <div className={`${styles.col10} ${styles.px0} ${styles.textCenter}`}>
                            <p className={`${styles.fontBold} ${styles.font1618}`}>{this.context.t("Reviews")}</p>
                        </div>
                        <div className={`${styles.col1} ${styles.px0}`}></div>
                    </div>
                </div>
                {loading ? (
                    <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.pt5} ${styles.pb3} ${styles.mt5}`}>
                        <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                    </div>
                ) : (
                    <div className={`${styles.safearea}`} ref={"reviewContainer"}>
                        <div className={`${styles.borderBtmGrayDc} ${styles.pb3}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.px3}`}>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mr1}`}>{totalRating.toFixed(1)}</p>
                                <Rating 
                                initialRating={totalRating} 
                                emptySymbol={<MdStar fontSize={"20px"} color={"#f4f4f4"} />}
                                fullSymbol={<MdStar fontSize={"20px"} color={"#fffb64"} />}
                                fractions={2}
                                readonly
                                />
                            </div>
                            <p className={`${styles.font10} ${styles.grayA6} ${styles.mt1} ${styles.px3}`}>
                                {`${reviewCount} ${this.context.t("client reviews")}`}
                            </p>
                        </div>
                        {reviews && reviews.length > 0 && (
                            reviews.map((review, index) => (
                                <Review key={index} review={review} index={index} totalLength={reviews.length} />
                            ))
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default ReviewList;
