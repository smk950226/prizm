import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmailVerification from './presenter';
import Loader from 'react-loader-spinner';
import styles from '../../style/styles.module.scss';


class Container extends Component{
    static propTypes = {
        emailVerification: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        loading: true,
    }

    componentDidMount = async() => {
        const { match : { params : { uuid } }, emailVerification, goHome } = this.props;
        const result = await emailVerification(uuid)
        if(result.status === 'ok'){
            alert(this.context.t("Your email is verified!"))
            goHome()
        }
        else if(result.error){
            alert(result.error)
            goHome()
        }
        else{
            alert(this.context.t("An error has occurred.."))
            goHome()
        }
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <div className={`${styles.heightFull} ${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            )
        }
        else{
            return (
                <EmailVerification 
                {...this.props} 
                {...this.state}
                />
            )
        }
    }
}

export default Container; 