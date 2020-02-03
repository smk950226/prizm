import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import TextareaAutosize from 'react-textarea-autosize';

const ReviewCreate = (props, context) => (
    <div className={`${styles.widthFull} ${styles.containerCustomer} ${styles.bgWhite} ${styles.minHeightFull}`}>
        <div className={`${styles.bgWhite} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.px3}`} style={{zIndex: 2, position: 'fixed', top: 0, left: 0, right: 0}}>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py4} ${styles.px3} ${styles.bgWhite} ${styles.widthFull} ${styles.containerCustomer}`}>
                <div className={`${styles.col1} ${styles.px0}`}>
                    <img src={require('../../assets/images/icon_left.png')} alt={context.t("Go back")} className={`${styles.iconArrowRight} ${styles.cursorPointer}`} onClick={props.goBack} />
                </div>
                <div className={`${styles.col10} ${styles.px0} ${styles.textCenter}`}>
                    <p className={`${styles.fontBold} ${styles.font1618}`}>{context.t("Rate & Review")}</p>
                </div>
                <div className={`${styles.col1} ${styles.px0}`}></div>
            </div>
        </div>
        <div className={`${styles.safearea} ${styles.px3}`}>
            <p className={`${styles.font1416}`}>{context.t("How was your overall experiance?")}</p>
            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py2}`}>
                <Rating 
                initialRating={props.rate}
                emptySymbol={<MdStar fontSize={"50px"} color={"#f4f4f4"} />}
                fullSymbol={<MdStar fontSize={"50px"} color={"#fffb64"} />}
                fractions={2}
                onClick={props.handleRateChange}
                />
            </div>
            <p className={`${styles.font1416}`}>{context.t("Share details of your experience with the photographer here:")}</p>
            <TextareaAutosize maxRows={15} className={`${styles.textArea3} ${styles.mt3} ${styles.py3} ${styles.px2}`} type={"text"} name={"comment"} value={props.comment} placeholder={context.t("Review")} onChange={props.handleInputChange} />
            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${props.isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={props.submit}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Submit Review")}</p>
            </div>
        </div>
    </div>
)

ReviewCreate.propTypes = {
    goBack: PropTypes.func.isRequired,
    handleRateChange: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    comment: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired
}

ReviewCreate.contextTypes = {
    t: PropTypes.func
}

export default ReviewCreate;
