import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewList from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        getReviewList: PropTypes.func.isRequired,
        getReviewListMore: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            photographerId: props.location.state ? props.location.state.photographerId ? props.location.state.photographerId : null : null,
            reviews: [],
            totalRating: 0,
            reviewCount: 0,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false
        }
    }

    componentDidMount = async() => {
        const { photographerId } = this.state;
        const { getReviewList } = this.props;
        if(photographerId){
            const result = await getReviewList(photographerId);
            if(result.status === 'ok'){
                this.setState({
                    reviews: result.reviews,
                    totalRating: result.total_rating,
                    reviewCount: result.review_count,
                    loading: false
                })
            }
            else{
                alert(this.context.t("Invalid request!"))
                this.props.history.goBack()
            }
        }
        else{
            this.props.history.goBack()
        }
    }

    _goBack = () => {
        this.props.history.goBack()
    }

    _reviewListMore = async() => {
        const { page, isLoadingMore, hasNextPage, photographerId } = this.state;
        const { getReviewListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getReviewListMore(photographerId, page+1)
                if(result.status === 'ok'){
                    this.setState({
                        page: page+1,
                        reviews: [...this.state.reviews, ...result.reviews]
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
                else{
                    this.setState({
                        hasNextPage: false
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
            }
        }
    }

    render(){
        return(
            <ReviewList 
            {...this.props} 
            {...this.state} 
            goBack={this._goBack}
            reviewListMore={this._reviewListMore}
            />
        )
    }
}

export default Container;