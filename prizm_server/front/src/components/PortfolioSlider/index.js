import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class PortfolioSlider extends Component{
    static propTypes = {
        portfolio: PropTypes.array.isRequired,
        nickname: PropTypes.string,
        lg: PropTypes.bool.isRequired,
        afterRender: PropTypes.func,
        photographerId: PropTypes.number
    }

    constructor(props){
        super(props)
        const { portfolio } = props;
        this.state = {
            portfolio,
            isOpen: false,
            photoIndex: 0
        }
    }

    componentDidMount = async() => {
        const { afterRender, photographerId } = this.props;
        if(afterRender && photographerId){
            console.log('?!!?!?')
            const portfolios = await afterRender(photographerId)
            if(portfolios.length > 0){
                this.setState({
                    portfolio: [...this.state.portfolio, ...portfolios]
                })
            }
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.portfolio !== this.props.portfolio){
            this.setState({
                portfolio: this.props.portfolio
            })
        }
    }

    _openPortfolio = (photoIndex) => {
        this.setState({
            photoIndex,
            isOpen: true
        })
    }

    _closePortfolio = () => {
        this.setState({
            photoIndex: 0,
            isOpen: false
        })
    }

    render(){
        const { nickname, lg } = this.props;
        const { portfolio, isOpen, photoIndex } = this.state;
        const images = []
        portfolio.map(port => {
            images.push(port.image)
            return null;
        })
        return(
            <div className={`${lg ? styles.containerPortfolioLg : styles.containerPortfolio} ${styles.row} ${styles.mx0} ${styles.alignItemsEnd} ${styles.mb4} ${styles.flexNowrap}`}>
                <Fragment>
                    {lg ? (
                        <Fragment>
                            {portfolio.map((port, index) => (
                                <img key={port.image} src={port.image} alt={port.photographer} className={`${index === portfolio.length - 1 ? null : styles.mr2} ${styles.cursorPointer} ${styles.portfolioImage} ${styles.mobileOnly}`} style={{width: port.width > port.height ? 100 : port.width*100/port.height, height: port.height > port.width ? 100 : port.height*100/port.width}} onClick={() => this._openPortfolio(index)} />
                            ))}
                            {portfolio.map((port, index) => (
                                <img key={port.image} src={port.image} alt={port.photographer} className={`${index === portfolio.length - 1 ? null : styles.mr2} ${styles.cursorPointer} ${styles.portfolioImage} ${styles.mobileNone}`} style={{width: port.width > port.height ? 300 : port.width*300/port.height, height: port.height > port.width ? 300 : port.height*300/port.width}} onClick={() => this._openPortfolio(index)} />
                            ))}
                        </Fragment>
                    ) : (
                        portfolio.map((port, index) => (
                            <img key={port.image} src={port.image} alt={port.photographer} className={`${index === portfolio.length - 1 ? null : styles.mr2} ${styles.cursorPointer} ${styles.portfolioImage}`} style={{width: port.width > port.height ? 100 : port.width*100/port.height, height: port.height > port.width ? 100 : port.height*100/port.width}} onClick={() => this._openPortfolio(index)} />
                        ))
                    )}
                
                {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={this._closePortfolio}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                    }
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % images.length,
                    })
                    }
                    discourageDownloads={false}
                    imageTitle={<p className={`${styles.font12} ${styles.fontBold}`}>{`Photo by ${nickname}`}</p>}
                />
                )}
                </Fragment>
            </div>
        )
    }
}

export default PortfolioSlider;