import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import MdDownload from 'react-ionicons/lib/MdDownload';
import { FETCH_URL } from '../../config/urls';

const MyPhotos = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{`${props.order.location.name}, ${props.order.confirmed_date.slice(0,4)}/${props.order.confirmed_date.slice(5,7)}/${props.order.confirmed_date.slice(8,10)}`}</p>
        {props.loading ? (
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            <Fragment>
            {props.error && props.errorMsg ? (
                <p className={`${styles.mt3} ${styles.font1416}`}>{props.errorMsg}</p>
            ) : (
                <p className={`${styles.mt3} ${styles.font1316} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{context.t("Download Original File")}</p>
            )}
            {props.images && props.images.length > 0 && (
                <div className={`${styles.mt3} ${styles.row} ${styles.mx0}`}>
                    {props.images.map((image, index) => (
                        <div key={index} className={`${styles.containerMyPhoto} ${index % 3 === 1 ? styles.mx3 : null} ${styles.mb3}`}>
                            <img src={image.processed_image_url} alt={props.order.location.name} className={`${styles.widthFull}`} onClick={() => props.openPortfolio(index)} />
                        </div>
                    ))}
                </div>
            )}
            {props.isOpen && (
                <Lightbox
                    mainSrc={props.images[props.photoIndex].processed_image_url}
                    nextSrc={props.images[(props.photoIndex + 1) % props.images.length].processed_image_url}
                    prevSrc={props.images[(props.photoIndex + props.images.length - 1) % props.images.length].processed_image_url}
                    onCloseRequest={props.closePortfolio}
                    onMovePrevRequest={props.goPrev}
                    onMoveNextRequest={props.goNext}
                    discourageDownloads={false}
                    imageTitle={<p className={`${styles.font12} ${styles.fontBold}`}>{`Photo by ${props.order.photographer.nickname}`}</p>}
                    imageCaption={
                        <a target={'_blank'} href={`${FETCH_URL}/api/studio/download/${props.images[props.photoIndex].id}/`} className={`${styles.white} ${styles.textDecorationNone} ${styles.font1316}`}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py2}`}>
                                <MdDownload fontSize={"16px"} color={'#ffffff'} />
                                <p className={`${styles.white} ${styles.textDecorationNone} ${styles.font1316} ${styles.ml2}`}>
                                {context.t("Download")}
                                </p>
                            </div>
                        </a>
                    }
                />
            )}
            </Fragment>
        )}
    </div>
)

MyPhotos.propTypes = {
    loading: PropTypes.bool.isRequired,
    images: PropTypes.array,
    error: PropTypes.bool,
    errorMsg: PropTypes.string,
    order: PropTypes.object.isRequired,
    openPortfolio: PropTypes.func.isRequired,
    closePortfolio: PropTypes.func.isRequired,
    photoIndex: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    goPrev: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired,
}

MyPhotos.contextTypes = {
    t: PropTypes.func
}

export default MyPhotos