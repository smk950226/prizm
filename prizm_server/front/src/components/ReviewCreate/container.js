import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewCreate from './presenter';

class Container extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired,
        createReview: PropTypes.func.isRequired,
        goReviewCreateComplete: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            order: props.location.state ? props.location.state.order ? props.location.state.order : null : null,
            comment: "",
            rate: 0,
            isSubmitting: false
        }
    }

    componentDidMount = () => {
        const { order } = this.state;
        const { goHome } = this.props;
        if(order){
            if(order.status === 'completed'){
                if(order.is_reviews){
                    goHome()
                }
            }
            else{
                goHome()
            }
        }
        else{
            goHome()
        }
    }

    _goBack = () => {
        this.props.history.goBack()
    }

    _handleRateChange = (rate) => {
        this.setState({
            rate
        })
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        });
    }

    _submit = async() => {
        const { isSubmitting, rate, comment, order } = this.state;
        const { createReview, goReviewCreateComplete } = this.props;
        if(!isSubmitting){
            if(order &&rate && comment){
                this.setState({
                    isSubmitting: true
                })
                const result = await createReview(order.photographer.id, order.id, rate, comment)
                if(result.status === 'ok'){
                    this.setState({
                        isSubmitting: false
                    })
                    goReviewCreateComplete()
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                    alert(this.context.t("Invalid request!"))
                }
            }
            else{
                alert(this.context.t("Please fill out all informations."))
            }
        }
    }

    render(){
        return(
            <ReviewCreate 
            {...this.props} 
            {...this.state} 
            goBack={this._goBack}
            handleRateChange={this._handleRateChange}
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            />
        )
    }
}

export default Container;