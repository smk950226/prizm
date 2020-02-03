import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import styled from 'styled-components';
import PortfolioSlider from '../PortfolioSlider';
import { Link } from 'react-router-dom';

const ProfileDiv = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
    background-position: center center;
    background-attachment: scroll;
`

class Home extends Component{
    static propTypes = {
        photographerList: PropTypes.array,
        isLoadingMore: PropTypes.bool.isRequired
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
        const wrappedElement = this.refs.photographerContainer
        if (this._isBottom(wrappedElement)) {
            if(!this.props.isLoadingMore){
                this.props.photographerListMore()
            }
        }
    }

    render(){
        const { photographerList } = this.props;
        return(
            <div className={`${styles.containerCustomer} ${styles.minHeightFullBtmNav} ${styles.safearea}`}>
                {/* <div className={`${styles.bgNewyork} ${styles.widthFull} ${styles.banner} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <p className={`${styles.font16} ${styles.fontBold} ${styles.white}`}>{this.context.t("NEWYORK")}</p>
                </div> */}
                <div className={`${styles.widthFull} ${styles.bannerImg}`}>
                    
                </div>
                <div className={`${styles.mt4} ${styles.px3}`} ref={"photographerContainer"}>
                    {photographerList && photographerList.length > 0 ? (
                        photographerList.map(photographer => (
                            <Fragment key={photographer.id}>
                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mb4}`}>
                                    <div>
                                        <Link to={`/${photographer.studio_id}/`} style={{textDecoration: 'none', color: 'black'}}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <ProfileDiv image={photographer.profile_image} />
                                            <p className={`${styles.fontBold} ${styles.font13} ${styles.ml3}`}>{photographer.nickname}</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <a target={'_blank'} href={`https://instagram.com/${photographer.user.instagram_account}/`} className={`${styles.bgGray33} ${styles.px2} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer} ${styles.textDecorationNone}`} style={{height: 25}}>
                                        <img src={require('../../assets/images/icon_instagram.png')} alt={"Instagram"} className={`${styles.iconInstagram}`} />
                                        <p className={`${styles.fontBold} ${styles.font11} ${styles.white} ${styles.ml1}`}>Instagram</p>
                                    </a>
                                </div>
                                {photographer.portfolio_set.length > 0 ? (
                                    <PortfolioSlider portfolio={photographer.portfolio_set} nickname={photographer.nickname} lg={true} />
                                ) : (
                                    null
                                )}
                            </Fragment>
                        ))
                    ) : (
                        null
                    )}
                </div>
            </div>
        )
    }
}
export default Home; 