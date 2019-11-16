import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';

const AdminCustomerImage = (props, context) => (
    <div>
        {props.loading ? (
            <Fragment>
                <p className={`${styles.fontBold} ${styles.font1214}`}>{`${props.order.user.name}, ${props.order.location.name}, ${props.order.confirmed_date.slice(2,4).concat(props.order.confirmed_date.slice(5,7),props.order.confirmed_date.slice(8,10))}`}</p>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.mt3}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            </Fragment>
        ) : (
            props.error ? (
                <Fragment>
                    <p className={`${styles.fontBold} ${styles.font1214}`}>{`${props.order.user.name}, ${props.order.location.name}, ${props.order.confirmed_date.slice(2,4).concat(props.order.confirmed_date.slice(5,7),props.order.confirmed_date.slice(8,10))}`}</p>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py3} ${styles.mt3}`}>
                        <p className={`${styles.font1214}`}>{props.errorMsg}</p>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p className={`${styles.fontBold} ${styles.font1214}`}>{`${props.order.user.name}, ${props.order.location.name}, ${props.order.confirmed_date.slice(2,4).concat(props.order.confirmed_date.slice(5,7),props.order.confirmed_date.slice(8,10))}`}</p>
                    <div className={`${styles.mt3} ${styles.containerCustomerImageOutside} ${styles.mb4}`}>
                        {props.images.map((image, index) => {
                            if(image.id >-1){
                                return(
                                    <img key={index} src={image.image} className={`${styles.containerCustomerImage} ${styles.cursorPointer}`} style={{position: 'absolute', transform: `translateX(${index*50}%)`, zIndex: 999 - index}} />
                                )
                            }
                            else{
                                return(
                                    <div key={index} className={`${styles.containerCustomerImage} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{backgroundColor: '#333333', opacity: image.opacity, position: 'absolute', transform: `translateX(${index*50}%)`, zIndex: 999 - index}}>
                                        {index === 0 && (
                                            <p className={`${styles.font40} ${styles.white}`}>+</p>
                                        )}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </Fragment>
            )
        )}
    </div>
)

AdminCustomerImage.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    order: PropTypes.object.isRequired
}

AdminCustomerImage.contextTypes = {
    t: PropTypes.func
}

export default AdminCustomerImage;