import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotographerDetail from './presenter';

class Container extends Component{
    static propTypes = {
        getPhotographerDetail: PropTypes.func.isRequired,
    }

    state = {
        loading: true,
        photographer: {},
        isTruncated: true,
        selectedLocation: {},
        dateOption: 0,
        selectedOption: {},
        comment: "",
        isSubmitting: false
    }

    componentDidMount = async() => {
        const { getPhotographerDetail, match : { params : { photographerId } } } = this.props;
        const result = await getPhotographerDetail(photographerId)
        if(result.status === 'ok'){
            this.setState({
                photographer: result.photographer,
                loading: false
            })
        }
        else if(result.error){
            alert(result.error)
        }
        else{
            alert('오류가 발생하였습니다.')
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        });
    }

    _doTruncate = () => {
        this.setState({
            isTruncated: true
        })
    }

    _undoTruncate = () => {
        this.setState({
            isTruncated: false
        })
    }

    _selectLocation = (selectedLocation) => {
        this.setState({
            selectedLocation
        })
    }

    _blankLocation = () => {
        this.setState({
            selectedLocation: {}
        })
    }

    _handleChangeDateOption = (dateOption) => {
        this.setState({
            dateOption
        })
    }

    _blankDateOption = () => {
        this.setState({
            dateOption: 0
        })
    }

    _selectOption = (selectedOption) => {
        this.setState({
            selectedOption
        })
    }

    _blankOption = () => {
        this.setState({
            selectedOption: {}
        })
    }

    render(){
        return (
            <PhotographerDetail 
            {...this.props} 
            {...this.state}
            doTruncate={this._doTruncate}
            undoTruncate={this._undoTruncate}
            selectLocation={this._selectLocation}
            blankLocation={this._blankLocation}
            handleChangeDateOption={this._handleChangeDateOption}
            blankDateOption={this._blankDateOption}
            selectOption={this._selectOption}
            blankOption={this._blankOption}
            handleInputChange={this._handleInputChange}
            />
        )
    }
}

export default Container; 