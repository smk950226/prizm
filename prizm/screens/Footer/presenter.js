import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const Footer = (props, context) => (
    <Fragment>
        <div className={`${styles.mobileNone}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.widthFull} ${styles.bgBlack} ${styles.px3} ${styles.py4} ${styles.alignItemsCenter}`}>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                    <p className={`${styles.font12} ${styles.white} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Terms of Use")}>{context.t("Terms of Use")}</p>
                    <div className={`${styles.mx3} ${styles.borderStick4} ${styles.heightFullPercent}`} />
                    <p className={`${styles.font12} ${styles.white} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Privacy Policy")}>{context.t("Privacy Policy")}</p>
                </div>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("EXPLABS")}</p>
                    <div className={`${styles.mx3} ${styles.borderStick4} ${styles.heightFullPercent}`} />
                    <p className={`${styles.font12} ${styles.white}`}>{context.t("Registration No. : 161-60-00371")}</p>
                    <div className={`${styles.mx3} ${styles.borderStick4} ${styles.heightFullPercent}`} />
                    <p className={`${styles.font12} ${styles.white}`}>{context.t("Jungwoo Lee")}</p>
                </div>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                    <p className={`${styles.font12} ${styles.white}`}>{context.t("128, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea (06234)")}</p>
                    <div className={`${styles.mx3} ${styles.borderStick4} ${styles.heightFullPercent}`} />
                    <p className={`${styles.font12} ${styles.white}`}>{context.t("+82-2-1670-0506")}</p>
                    <div className={`${styles.mx3} ${styles.borderStick4} ${styles.heightFullPercent}`} />
                    <p className={`${styles.font12} ${styles.white}`}>{context.t("contact@prizm.cloud")}</p>
                </div>
            </div>
        </div>
        <div className={`${styles.mobileOnly}`}>
            <div className={`${styles.row} ${styles.mx0} ${styles.widthFull} ${styles.bgBlack} ${styles.px3} ${styles.py3} ${styles.alignItemsCenter}`}>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.px0} ${styles.alignItemsCenter}`}>
                    <p className={`${styles.font10} ${styles.white} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Terms of Use")}>{context.t("Terms of Use")}</p>
                    <div className={`${styles.mx3} ${styles.borderStick4} ${styles.heightFullPercent}`} />
                    <p className={`${styles.font10} ${styles.white} ${styles.cursorPointer}`} onClick={() => this.props.goTerms("Privacy Policy")}>{context.t("Privacy Policy")}</p>
                </div>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.px0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                    <p className={`${styles.font10} ${styles.white}`}>
                        <span className={`${styles.fontBold}`}>{context.t("EXPLABS")}</span>{context.t(" | Jungwoo Lee | Registration No. : 161-60-00371")}
                    </p>
                </div>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.px0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                    <p className={`${styles.font10} ${styles.white}`}>
                        {context.t("128, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea (06234)")}
                    </p>
                </div>
                <div className={`${styles.col12} ${styles.row} ${styles.mx0} ${styles.px0} ${styles.alignItemsCenter} ${styles.mt2}`}>
                    <p className={`${styles.font10} ${styles.white}`}>
                        {context.t("contact@prizm.cloud | +82-2-1670-0506")}
                    </p>
                </div>
            </div>
        </div>
    </Fragment>
)

Footer.propTypes = {
    goTerms: PropTypes.func.isRequired
}

Footer.contextTypes = {
    t: PropTypes.func
}

export default Footer;