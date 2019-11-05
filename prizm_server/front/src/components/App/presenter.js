import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from '../../style/styles.module.scss'

const App = props => (
    <div className={`${styles.col6} ${styles.offset3}`}>hi</div>
)

App.propTypes = {
    isLoggedIn: PropTypes.bool
}

export default App; 