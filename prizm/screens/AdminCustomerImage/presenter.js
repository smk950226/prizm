import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import { Collapse } from 'react-collapse';

const AdminCustomerImage = (props, context) => (
    <div>
        {props.loading ? (
            <Fragment>
                <p className={`${styles.fontBold} ${styles.font1113}`}>{`${props.order.user.name}, ${props.order.location.name}, ${props.order.confirmed_date.slice(2,4).concat(props.order.confirmed_date.slice(5,7),props.order.confirmed_date.slice(8,10))}`}</p>
                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.mt3}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            </Fragment>
        ) : (
            props.error ? (
                <Fragment>
                    <p className={`${styles.fontBold} ${styles.font1113}`}>{`${props.order.user.name}, ${props.order.location.name}, ${props.order.confirmed_date.slice(2,4).concat(props.order.confirmed_date.slice(5,7),props.order.confirmed_date.slice(8,10))}`}</p>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py3} ${styles.mt3}`}>
                        <p className={`${styles.font1113}`}>{props.errorMsg}</p>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.widthFull}`}>
                        <p className={`${styles.fontBold} ${styles.font1113}`}>{`${props.order.user.name}, ${props.order.location.name}, ${props.order.confirmed_date.slice(2,4).concat(props.order.confirmed_date.slice(5,7),props.order.confirmed_date.slice(8,10))}`}</p>
                        {props.order.status === 'completed' && (
                            <p className={`${styles.font8} ${styles.completed} ${styles.textRight}`}>{context.t("Completed")}</p>
                        )}
                    </div>
                    <div className={`${styles.mt3} ${styles.containerCustomerImageOutside} ${styles.mb2}`}>
                        {props.images.map((image, index) => {
                            if(image.id >-1){
                                return(
                                    <label key={index} htmlFor={`order-${props.order.id}`}>
                                        <img src={image.image} className={`${styles.containerCustomerImage} ${styles.cursorPointer}`} style={{position: 'absolute', transform: `translateX(${index*50}%)`, zIndex: 999 - index}} />
                                    </label>
                                )
                            }
                            else{
                                return(
                                    <label key={index} htmlFor={`order-${props.order.id}`}>
                                        <div className={`${styles.containerCustomerImage} ${styles.cursorPointer} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{backgroundColor: '#333333', opacity: image.opacity, position: 'absolute', transform: `translateX(${index*50}%)`, zIndex: 999 - index}}>
                                            {index === 0 && (
                                                <p className={`${styles.font40} ${styles.white}`}>+</p>
                                            )}
                                        </div>
                                    </label>

                                )
                            }
                        })}
                    </div>
                    {props.order.status !== 'completed' && (
                        props.images.find(img => img.id > -1) && (
                            <Fragment>
                                <p className={`${styles.font1214} ${styles.completed} ${styles.textRight} ${styles.cursorPointer} ${styles.mb2}`} onClick={props.showCancel ? props.closeCancel : props.openCancel}>{context.t("Click here to mark this photo session as Completed")}</p>
                                <Collapse isOpened={props.showCancel} theme={{collapse: styles.collapse}}>
                                    <div className={`${styles.bgGray16} ${styles.py3} ${styles.px3}`}>
                                        <p className={`${styles.font1012} ${styles.white} ${styles.textRight}`}>
                                            {context.t("I have fully uploaded my client's photos as discussed earlier.")}
                                        </p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                            <div className={`${styles.bgCompleted} ${styles.py2} ${styles.px3} ${styles.mt2} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} onClick={props.complete}>
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.white}`}>{context.t("Confirm")}</p>
                                            </div>
                                            <div className={`${styles.bgCompleted} ${styles.py2} ${styles.px3} ${styles.mt2} ${styles.row} ${styles.mr0} ${styles.ml3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} onClick={props.closeCancel}>
                                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.white}`}>{context.t("Cancel")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </Fragment>
                        )
                    )}
                    <input id={`order-${props.order.id}`} className={`${styles.none}`} type={"file"} accept={".jpg,.jpeg,.png"} multiple={true} onChange={props.submit} />
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
    order: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    openCancel: PropTypes.func.isRequired,
    closeCancel: PropTypes.func.isRequired,
    showCancel: PropTypes.bool.isRequired,
    complete: PropTypes.func.isRequired
}

AdminCustomerImage.contextTypes = {
    t: PropTypes.func
}

export default AdminCustomerImage;